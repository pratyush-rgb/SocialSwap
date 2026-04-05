import React from "react";

const StatCards = ({ title, value, icon, color }) => {
  const colorMap = {
    purple: "bg-purple-500/10 border border-purple-500/20 text-purple-400",
    pink: "bg-pink-500/10 border border-pink-500/20 text-pink-400",
    blue: "bg-blue-500/10 border border-blue-500/20 text-blue-400",
    green: "bg-green-500/10 border border-green-500/20 text-green-400",
    amber: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-gray-400 text-xs mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
      <div
        className={`size-12 shrink-0 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.purple}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCards;
