import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MarketPlace from "./pages/MarketPlace";
import Mylisting from "./pages/Mylisting";
import ListingDetails from "./pages/ListingDetails";
import ManageListing from "./pages/ManageListing";
import Messages from "./pages/Messages";
import MyOrders from "./pages/MyOrders";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import AiAssistant from "./components/AiAssistant"; // IMPORT ADDED HERE
import { Toaster } from "react-hot-toast";
import { useAuth, useUser } from "@clerk/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllPublicListing,
  getAllUserListing,
} from "./app/features/lisitingSlice";
import api from "./configs/axios";

const App = () => {
  const { pathname } = useLocation();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPublicListing());
  }, []);
  useEffect(() => {
    if (isLoaded && user) {
      dispatch(getAllUserListing({ getToken }));
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken();
        if (!token) return;

        await api.post(
          "/api/auth/sync",
          {
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || user.firstName || "User",
            image: user.imageUrl,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (error) {
        console.log("User sync failed", error?.response?.data || error.message);
      }
    };

    syncUser();
  }, [isLoaded, user, getToken]);

  return (
    <div className="min-h-screen">
      <Toaster />
      {!pathname.includes("/admin") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/my-listings" element={<Mylisting />} />
        <Route path="/listing/:listingId" element={<ListingDetails />} />
        <Route path="/create-listing" element={<ManageListing />} />
        <Route path="/edit-listing/:id" element={<ManageListing />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <ChatBox />
      <AiAssistant /> {/* COMPONENT ADDED HERE */}
    </div>
  );
};

export default App;
