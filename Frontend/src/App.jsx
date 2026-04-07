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
import Layout from "./pages/Admin/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Admin/Dashboard";
import CredentialVerify from "./pages/Admin/CredentialVerify";
import CredentialChange from "./pages/Admin/CredentialChange";
import AllListings from "./pages/Admin/AllListings";
import Transactions from "./pages/Admin/Transactions";
import Withdrawal from "./pages/Admin/Withdrawal";
import { useAuth, useUser } from "@clerk/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllPublicListing,
  getAllUserListing,
} from "./app/features/lisitingSlice";

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
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="verify-credentials" element={<CredentialVerify />} />
          <Route path="change-credentials" element={<CredentialChange />} />
          <Route path="list-listings" element={<AllListings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="withdrawal" element={<Withdrawal />} />
        </Route>
      </Routes>

      <ChatBox />
      <AiAssistant /> {/* COMPONENT ADDED HERE */}
    </div>
  );
};

export default App;