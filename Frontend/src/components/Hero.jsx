import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/marketplace?search=${input}`);
  };

  return (
    <section className="flex flex-col items-center  text-white px-4 pb-35 pt-5">
      {/* Avatars + Stars */}
      <div className="flex items-center mt-60 mx-auto lg:mx-0">
        <div className="flex -space-x-3 pr-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
            alt="user3"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
          />
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="user1"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
          />
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            alt="user2"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3"
          />
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
            alt="user3"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4"
          />
        </div>

        <div>
          <div className="flex ">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star text-transparent fill-[#FF8F20]"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              ))}
          </div>
          <p className="text-xs text-gray-200">Used by 10+ users</p>
        </div>
      </div>

      <h1 className="text-[42px]/13 md:text-6xl/19 font-semibold text-center max-w-210 mt-4 bg-linear-to-r from-white to-[#5D009F] text-transparent bg-clip-text">
        Where Creators Trade Their Digital Assets.
      </h1>
      <p className="text-gray-200 text-sm max-md:px-2 text-center max-w-sm mt-3">
        Buy, sell, and trade social media accounts with ease.
      </p>
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="mt-8 flex items-center text-sm bg-white h-13 border pl-3 pr-0.5 rounded-md border-gray-500/30 w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 shrink-0"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-2 w-full h-full outline-none placeholder:text-gray-500 text-gray-500 bg-transparent rounded-lg"
            type="text"
            placeholder="Search for a profile"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-10 h-11 font-medium text-sm rounded-lg"
          >
            Search
          </button>
        </div>
      </form>
      <p className="text-gray-200 mt-4 text-sm">
        2000+ products and updating every day
      </p>
    </section>
  );
};

export default Hero;
