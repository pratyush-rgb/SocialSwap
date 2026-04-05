import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {
  BoxIcon,
  GripIcon,
  ListIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  User,
  X,
} from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 z-50 backdrop-blur-md bg-black">
      {/* LOGO */}
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        src={assets.logo}
        alt="logo"
        className="h-10 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link
          to="/"
          className="relative text-gray-200 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>
        <Link
          to="/marketplace"
          className="relative text-gray-200 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          Marketplace
        </Link>
        <Link
          to={user ? "/messages" : "#"}
          onClick={() => (user ? scrollTo(0, 0) : openSignIn())}
          className="relative text-gray-200 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          Messages
        </Link>
        <Link
          to={user ? "/my-listings" : "#"}
          onClick={() => (user ? scrollTo(0, 0) : openSignIn())}
          className="relative text-gray-200 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          My Listings
        </Link>
      </div>
      {!user ? (
        <button
          onClick={() => openSignIn()}
          className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-6 h-10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40"
        >
          Login
        </button>
      ) : (
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action
              label="Marketplace"
              labelIcon={<GripIcon size={16} color="white" />}
              onClick={() => navigate("/marketplace")}
            />

            <UserButton.Action
              label="Messages"
              labelIcon={<MessageCircleMoreIcon size={16} color="white" />}
              onClick={() => navigate("/messages")}
            />

            <UserButton.Action
              label="My Listing"
              labelIcon={<ListIcon size={16} color="white" />}
              onClick={() => navigate("/my-listings")}
            />

            <UserButton.Action
              label="My Orders"
              labelIcon={<BoxIcon size={16} color="white" />}
              onClick={() => navigate("/my-orders")}
            />
          </UserButton.MenuItems>
        </UserButton>
      )}

      <MenuIcon
        className="md:hidden text-white cursor-pointer"
        onClick={() => setMobileOpen(true)}
      />

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex flex-col items-center justify-center gap-8 text-lg z-50">
          <X
            className="absolute top-6 right-6 text-white cursor-pointer"
            size={32}
            onClick={() => setMobileOpen(false)}
          />

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-white"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            onClick={() => setMobileOpen(false)}
            className="text-white"
          >
            Marketplace
          </Link>

          <Link
            to={user ? "/messages" : "#"}
            onClick={() => {
              if (!user) openSignIn();
              setMobileOpen(false);
            }}
            className="text-white"
          >
            Messages
          </Link>

          <Link
            to={user ? "/my-listings" : "#"}
            onClick={() => {
              if (!user) openSignIn();
              setMobileOpen(false);
            }}
            className="text-white"
          >
            My Listings
          </Link>

          <button
            onClick={openSignIn}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 h-10 rounded-full"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
