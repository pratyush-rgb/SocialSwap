import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import LisitingCard from "./LisitingCard";

const LatestListings = () => {
  const { listings } = useSelector((state) => state.listings);
  return (
    <div className="mt-20 mb-8 bg-transparent">
      <Title
        title="Latest Listings"
        description="Fresh listings just dropped. Discover newly available social media accounts before anyone else."
      />
      <div className="flex flex-col gap-6 px-6">
        {listings.slice(0, 4).map((listing, index) => (
          <div key={index} className="mx-auto w-full max-w-3xl rounded-xl">
            <LisitingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListings;
