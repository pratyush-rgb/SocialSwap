import { ChevronDown, Filter, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({
  showFilterPhone,
  setshowFilterPhone,
  filters,
  setFilters,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const currency = "$";
  const navigate = useNavigate();
  const onSearchChange = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
      setSearch(e.target.value);
    } else {
      navigate("/marketplace");
      setSearch("");
    }
  };
  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    price: true,
    followers: true,
    niche: true,
    status: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const onFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const onClearFilters = () => {
    if (search) {
      navigate("/marketplace");
    }
    setFilters({
      platform: null,
      maxPrice: 100000,
      minFollowers: 0,
      niche: null,
      verified: false,
      monetized: false,
    });
  };

  const platforms = [
    { value: "youtube", label: "Youtube" },
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "tiktok", label: "Tiktok" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "discord", label: "Discord" },
  ];

  const niches = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fitness", label: "Fitness" },
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "gaming", label: "Gaming" },
    { value: "tech", label: "Tech" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
    { value: "business", label: "Business" }, // also fix spelling
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "health", label: "Health" },
    { value: "finance", label: "Finance" },
  ];
  return (
    <div
      className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll rounded-2xl shadow-sm border border-white/60 bg-black backdrop-blur-xl h-fit sticky top-24 md:min-w-75 `}
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <Filter className="size-4 text-purple-400" />
            <h3 className="text-purple-400 font-bold text-lg">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <X
              className="size-6 text-white/70 hover:text-white p-1 hover:bg-red-400 rounded transition-colors cursor-pointer "
              onClick={onClearFilters}
            />
            <button
              onClick={() => setshowFilterPhone(false)}
              className="sm:hidden text-sm border text-white px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar">
        {/* search bar */}

        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search here.."
            className="w-full text-sm px-3 py-2 border border-white rounded-md outline-purple-500/40"
            onChange={onSearchChange}
            value={search}
          />
        </div>

        {/* platform filter */}

        <div>
          <button
            onClick={() => toggleSection("platform")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-purple-400 font-bold text-lg">
              Platform
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.platform ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.platform && (
            <div className="flex flex-col gap-2">
              {platforms.map((platform) => (
                <label
                  key={platform.value}
                  className="flex flex-center gap-2 text-white/70 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={
                      filters.platform?.includes(platform.value) || false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const current = filters.platform || [];
                      const updated = checked
                        ? [...current, platform.value]
                        : current.filter((p) => p != platform.value);
                      onFilterChange({
                        ...filters,
                        platform: updated.length > 0 ? updated : null,
                      });
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* price range */}

        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-purple-400 font-bold text-lg">
              Price Range
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={filters.maxPrice || 100000}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex items-center justify-between text-sm text-white">
                <span>{currency}0</span>
                <span>
                  {currency}
                  {(filters.maxPrice || 100000).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* followers range */}
        <div>
          <button
            onClick={() => toggleSection("followers")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-purple-400 font-bold text-lg">
              Minimum followers
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.followers ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.followers && (
            <select
              value={filters.minFollowers?.toString() || "0"}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minFollowers: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-white/80 rounded-lg text-white outline-black"
            >
              <option value="0">Any Amount</option>
              <option value="1000">1K+</option>
              <option value="10000">10K+</option>
              <option value="50000">50K+</option>
              <option value="100000">100K+</option>
              <option value="200000">200K+</option>
              <option value="500000">500K+</option>
              <option value="1000000">1M+</option>
            </select>
          )}
        </div>

        {/* niche filter */}
        <div>
          <button
            onClick={() => toggleSection("niche")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-purple-400 font-bold text-lg">Niche</label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.niche ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.niche && (
            <select
              value={filters.niche || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  niche: e.target.value || null,
                })
              }
              className="w-full px-3 py-2 border border-white/80 rounded-lg text-white outline-black"
            >
              <option value="">All Niches</option>
              {niches.map((niche) => (
                <option key={niche.value} value={niche.value}>
                  {niche.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Verificatoin status */}

        <div>
          <button
            onClick={() => toggleSection("status")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-purple-400 font-bold text-lg">
              Account Status
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.status ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.status && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified || false}
                  onChange={(e) =>
                    onFilterChange({ ...filters, verified: e.target.checked })
                  }
                />
                <span className="text-sm">Verified accounts only</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.monetized || false}
                  onChange={(e) =>
                    onFilterChange({ ...filters, monetized: e.target.checked })
                  }
                />
                <span className="text-sm">Monitized Accounts Only</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
