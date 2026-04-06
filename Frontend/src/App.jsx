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

const App = () => {
  const { pathname } = useLocation();
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