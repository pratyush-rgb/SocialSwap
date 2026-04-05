import React from "react";
import { platformIcons } from "../assets/assets";
import { BadgeCheck, LineChart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
    <div className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-purple-500/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col">
      {/* Featured Badge */}
      {listing.featured && (
        <div className="absolute -top-2.5 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-widest shadow-md">
          ✦ FEATURED
        </div>
      )}

      {/* Top Section */}
      <div className="flex items-start gap-3 mb-4">
        {/* Platform Icon */}
        <div className="shrink-0 mt-0.5">{platformIcons[listing.platform]}</div>

        {/* Title + Username */}
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-purple-300 transition-colors truncate">
            {listing.title}
          </h2>
          <p className="text-purple-300/60 text-xs mt-0.5 truncate">
            @{listing.username} ·{" "}
            <span className="capitalize">{listing.platform}</span>
          </p>
        </div>

        {/* Verified Badge */}
        {listing.verified && (
          <BadgeCheck className="text-green-400 w-5 h-5 shrink-0 mt-0.5" />
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
        {listing.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <div>
            <p className="text-white text-xs font-semibold leading-none">
              {listing.followers_count.toLocaleString()}
            </p>
            <p className="text-gray-500 text-[10px] mt-0.5">Followers</p>
          </div>
        </div>

        {listing.engagement_rate && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <LineChart className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold leading-none">
                {listing.engagement_rate}%
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">Engagement</p>
            </div>
          </div>
        )}

        {listing.country && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold leading-none">
                {listing.country}
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">Country</p>
            </div>
          </div>
        )}

        {listing.monthly_views && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <LineChart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold leading-none">
                {listing.monthly_views.toLocaleString()}
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">Monthly Views</p>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-4" />

      {/* Bottom: Price + CTA */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] text-gray-500 mb-0.5">Asking price</p>
          <span className="text-purple-400 font-bold text-lg">
            {currency}
            {listing.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => {
            navigate(`/listing/${listing.id}`);
            scrollTo(0, 0);
          }}
          className="bg-purple-600/80 hover:bg-purple-500 text-white text-xs font-medium px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
