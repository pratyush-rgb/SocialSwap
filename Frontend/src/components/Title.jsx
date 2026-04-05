import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h3
        className="text-2xl md:text-3xl font-semibold text-center max-w-212.5 mt-4 
      bg-linear-to-r from-purple-400 via-fuchsia-500 to-indigo-500 
      text-transparent bg-clip-text"
      >
        {title}
      </h3>

      <p className="text-gray-300 max-w-200 mt-5 text-center">{description}</p>
    </div>
  );
};

export default Title;
