import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileLink, platformIcons } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  UsersRound,
  ArrowUpRightFromSquareIcon,
  Calendar,
  CheckCircle2,
  ChevronLeftIcon,
  ChevronRightIcon,
  DollarSign,
  Eye,
  Globe,
  LineChart,
  ShieldCheck,
  Loader2Icon,
  Tags,
  Users,
  Activity,
  MessageSquareCheck,
  ShoppingBagIcon,
  Copyright,
} from "lucide-react";
import { setChat } from "../app/features/chatSlice";
import { useUser } from "@clerk/react";

const ListingDetails = () => {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [listing, setListing] = useState(null);
  const profileLink =
    listing && getProfileLink(listing.platform, listing.username);

  const { listingId } = useParams();

  const { listings } = useSelector((state) => state.listings);

  const [current, setCurrent] = useState(0);
  const images = listing?.images || [];

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const loadChat = () => {
    if (!isLoaded || !user) return toast("Login to chat with seller");
    if (user.id === listing.ownerId) return toast("You can chat with yourself");
    dispatch(setChat({ listing: listing }));
  };

  const PurchaseAcc = async (params) => {};

  useEffect(() => {
    const found = listings.find((listing) => listing.id === listingId);
    if (found) {
      setListing(found);
    }
  }, [listingId, listings]);

  return listing ? (
    <div className="mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 text-white  mt-17">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 ext-slate"
      >
        <ArrowLeft className="size-4" /> Go to Previous Page
      </button>

      <div className="flex items-start max-md:flex-col gap-10">
        {/* left isde listing */}
        <div className="flex-1 max-md:w-full">
          {/* top section */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 mb-5 rounded-xl mt-5">
            {/* displaying user details */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl">
                  {platformIcons[listing.platform]}
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent ">
                    {listing.title}
                    <a target="_blank" href={profileLink}>
                      <ArrowUpRightFromSquareIcon className="size-4 hover:text-indigo-500 text-white" />
                    </a>
                  </h2>
                  <p className="text-purple-300/70 text-sm">
                    @{listing.username} •{" "}
                    {listing.platform?.charAt(0).toUpperCase() +
                      listing.platform?.slice(1)}
                  </p>

                  <div className="flex gap-2 mt-2">
                    {listing.verified && (
                      <span className="flex items-center text-sm text-blue-400 border border-blue-400/50 bg-blue-400/10 px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                    {listing.monetized && (
                      <span className="flex items-center text-sm text-emerald-400 border border-emerald-400/50 bg-emerald-400/10 px-2 py-1 rounded-md">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Monetized
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* displaying the pricing */}

            <div className="text-right">
              <h3 className=" text-2xl text-emerald-400 font-bold">
                {currency}
                {listing.price?.toLocaleString()}
              </h3>
              <p className="text-gray-400 text-sm">USD</p>
            </div>
          </div>

          {/* screenshot Section */}

          {images?.length > 0 && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm mb-5 overflow-hidden rounded-xl">
              <div className="p-4">
                <h4 className="text-gray-400 text-sm font-semibold mb-6">
                  Screenshots and Proof
                </h4>

                {/* slider Container */}

                <div className="relative w-full aspect-video overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {images.map((img, idx) => (
                      <img
                        src={img}
                        alt="lisiting-proof"
                        key={idx}
                        className="w-full shrink-0"
                      />
                    ))}
                  </div>

                  {/* NAvigationnnn buttons */}

                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow "
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-400 " />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow "
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 " />
                  </button>

                  {/* Indicatorss */}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        onClick={() => setCurrent(index)}
                        key={index}
                        className={`rounded-full transition-all duration-300 ${
                          current === index
                            ? "bg-purple-400 w-6 h-2.5"
                            : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Metrics */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl mb-5 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h4 className="font-semibold text-white">Account Metrics</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4">
              {/* Followers */}
              <div className="flex flex-col items-center justify-center p-5 border-r border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors duration-200 group">
                <div className="p-2 rounded-lg bg-purple-500/20 mb-2 group-hover:bg-purple-500/30 transition-colors">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <p className="font-bold text-lg text-white">
                  {listing.followers_count?.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Followers</p>
              </div>

              {/* Engagement */}
              <div className="flex flex-col items-center justify-center p-5 border-r border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors duration-200 group">
                <div className="p-2 rounded-lg bg-emerald-500/20 mb-2 group-hover:bg-emerald-500/30 transition-colors">
                  <LineChart className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="font-bold text-lg text-emerald-400">
                  {listing.engagement_rate}%
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Engagement</p>
              </div>

              {/* Monthly Views */}
              <div className="flex flex-col items-center justify-center p-5 border-r border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors duration-200 group">
                <div className="p-2 rounded-lg bg-blue-500/20 mb-2 group-hover:bg-blue-500/30 transition-colors">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <p className="font-bold text-lg text-white">
                  {listing.monthly_views?.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Monthly Views</p>
              </div>

              {/* Listed Date */}
              <div className="flex flex-col items-center justify-center p-5 hover:bg-white/5 transition-colors duration-200 group">
                <div className="p-2 rounded-lg bg-pink-500/20 mb-2 group-hover:bg-pink-500/30 transition-colors">
                  <Calendar className="w-5 h-5 text-pink-400" />
                </div>
                <p className="font-bold text-lg text-white">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Listed</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm mb-5 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h4 className="text-white font-semibold">Description</h4>
            </div>

            <div className="p-5 text-sm text-gray-300 leading-relaxed">
              {listing.description}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm mb-5 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h4 className="text-white font-semibold">Additional Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Niche */}
              <div className="flex items-center gap-3 p-4 border-b md:border-r border-white/10 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-purple-500/20 shrink-0">
                  <Tags className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Niche</p>
                  <p className="text-white font-medium capitalize mt-0.5">
                    {listing.niche}
                  </p>
                </div>
              </div>

              {/* Primary Country */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-blue-500/20 shrink-0">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Primary Country</p>
                  <p className="text-white font-medium mt-0.5">
                    {listing.country || "Global"}
                  </p>
                </div>
              </div>

              {/* Audience Age */}
              <div className="flex items-center gap-3 p-4 border-b md:border-r border-white/10 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-orange-500/20 shrink-0">
                  <UsersRound className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Audience Age</p>
                  <p className="text-white font-medium mt-0.5">
                    {listing.age_range}
                  </p>
                </div>
              </div>

              {/* Platform Verified */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-blue-500/20 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Platform Verified</p>
                  <p
                    className={`font-medium mt-0.5 ${listing.platformAssured ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {listing.platformAssured ? "✓ Verified" : "✗ Not Verified"}
                  </p>
                </div>
              </div>

              {/* Monetization */}
              <div className="flex items-center gap-3 p-4 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-emerald-500/20 shrink-0">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Monetization</p>
                  <p
                    className={`font-medium mt-0.5 ${listing.monetized ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {listing.monetized ? "✓ Enabled" : "✗ Disabled"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-pink-500/20 shrink-0">
                  <Activity className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-white font-medium capitalize mt-0.5">
                    {listing.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side listing */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm mb-5 rounded-xl overflow-hidden mt-5">
          <div className="p-4 border-b border-white/10">
            <h4 className="text-white font-semibold">Seller Information</h4>
          </div>

          <div className="p-4">
            {/* Seller Profile */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={listing.owner?.image}
                alt="seller_image"
                className="size-12 rounded-full ring-2 ring-purple-500/50 shrink-0"
              />
              <div>
                <p className="text-white font-semibold">
                  {listing.owner?.name}
                </p>
                <p className="text-gray-400 text-sm">{listing.owner?.email}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
              <p className="text-gray-400">Member since</p>
              <p className="text-white font-medium">
                {new Date(listing.owner?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={loadChat}
              className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-3 w-full justify-center hover:scale-110 transition-all duration-200 "
            >
              <MessageSquareCheck className="size-4 text-green-400" />
              <span className="text-green-400">Chat with Seller</span>
            </button>

            {listing.isCredentialChanged && (
              <button
                onClick={PurchaseAcc}
                className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-3 w-full justify-center hover:scale-110 transition-all duration-200 "
              >
                <ShoppingBagIcon className="size-4 text-[#F97316]" />
                <span className="text-[#F97316]">Purchase</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-transparent border-t border-white/10 mt-28 py-5 w-full">
        <p className="text-sm text-gray-400 text-center flex items-center justify-center gap-1">
          <Copyright className="w-3.5 h-3.5" />
          2026 <span className="text-white font-medium">Social Swap</span>. All
          rights reserved.
        </p>
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Loader2Icon className="size-7 animate-spin text-indigo-700" />
    </div>
  );
};

export default ListingDetails;
