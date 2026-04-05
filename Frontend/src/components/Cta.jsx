import React from "react";

const Cta = () => {
  return (
    <>
      <div className="max-w-5xl py-16 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center bg-linear-to-b from-[#301469] to-black rounded-2xl p-10 text-white">
        <p className="px-6 py-2 rounded-full text-sm border border-[#54487B] bg-linear-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
          Commnunity & Support
        </p>
        <h1 className="text-4xl md:text-5xl md:leading-15 font-medium max-w-2xl mt-5">
          Grow Your Influence & Monetize
          <span className="bg-linear-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
            Your Audience Effortlessly
          </span>
        </h1>
        <p className="text-white text-sm mt-2">
          Discover, buy, and sell social media accounts. Connect with creators
          and unlock new growth opportunities.
        </p>
        <button className="px-12 py-2.5 mt-6 rounded-full text-sm border border-[#54487B] active:scale-95 transition-all bg-linear-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
          Explore Listings
        </button>
      </div>
    </>
  );
};

export default Cta;
