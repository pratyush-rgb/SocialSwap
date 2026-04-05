import { ArrowLeft, Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingCard from "../components/LisitingCard";
import FilterSidebar from "../components/FilterSidebar";

const MarketPlace = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const navigate = useNavigate();

  const [showFilterPhone, setshowFilterPhone] = useState(false);
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  });

  const { listings } = useSelector((state) => state.listings);

  const filteredListings = listings.filter((listing) => {
    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(listing.platform)) return false;
    }
    if (filters.maxPrice) {
      if (listing.price > filters.maxPrice) return false;
    }
    if (filters.minFollowers) {
      if (listing.followers_count < filters.minFollowers) return false;
    }
    if (filters.niche && filters.niche.length > 0) {
      if (listing.niche?.toLowerCase() !== filters.niche.toLowerCase())
        return false;
    }
    if (filters.verified && listing.verified !== filters.verified) {
      return false;
    }
    if (filters.monetized && listing.monetized !== filters.monetized) {
      return false;
    }

    if (search) {
      const trimed = search.trim();
      if (
        !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.niche.toLowerCase().includes(trimed.toLowerCase())
      )
        return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-[#140c28] to-[#3B006E] text-white px-6 md:px-16 lg:px-24 ">
      <div className="flex items-center justify-between text-white mt-15">
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-5"
        >
          {" "}
          <ArrowLeft className="size-4" /> Back to Home
        </button>
        <button
          onClick={() => setshowFilterPhone(true)}
          className="flex sm:hidden items-center gap-2 py-5"
        >
          {" "}
          <Filter className="size-4" /> Filters
        </button>
      </div>
      <div className="relative flex items-start justify-between gap-8 pb-8">
        <FilterSidebar
          setFilters={setFilters}
          filters={filters}
          setshowFilterPhone={setshowFilterPhone}
          showFilterPhone={showFilterPhone}
        />
        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((lisiting, index) => (
              <ListingCard listing={lisiting} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
