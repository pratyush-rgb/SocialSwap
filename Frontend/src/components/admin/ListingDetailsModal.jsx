import {
  XIcon,
  CheckCircleIcon,
  BadgeInfoIcon,
  GlobeIcon,
  UserIcon,
} from "lucide-react";
import { useEffect } from "react";

const ListingDetailsModal = ({ listing, onClose }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-2xl h-screen sm:h-[600px] flex flex-col overflow-hidden sm:rounded-lg"
        style={{
          background: "#13131f",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          className="p-4 sm:rounded-t-lg flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
        >
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg" style={{ color: "#ffffff" }}>
              {listing.title}
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              @{listing.username} on {listing.platform}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-lg transition-colors"
            style={{ color: "#ffffff" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div
          className="p-5 overflow-y-auto space-y-5"
          style={{ color: "#d1d5db" }}
        >
          {/* Image Carousel */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto">
            {listing.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${listing.title}-${i}`}
                className="rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              {
                label: "Followers",
                value: listing.followers_count?.toLocaleString(),
                purple: true,
              },
              {
                label: "Engagement Rate",
                value: `${listing.engagement_rate}%`,
                purple: true,
              },
              {
                label: "Monthly Views",
                value: listing.monthly_views?.toLocaleString(),
                purple: true,
              },
              { label: "Niche", value: listing.niche, purple: false },
              { label: "Country", value: listing.country, purple: false },
              { label: "Age Range", value: listing.age_range, purple: false },
            ].map(({ label, value, purple }) => (
              <div
                key={label}
                className="p-3 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="font-medium" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                <p
                  className="font-semibold capitalize"
                  style={{ color: purple ? "#a855f7" : "#e5e7eb" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4
              className="font-semibold mb-1 flex items-center gap-1"
              style={{ color: "#e5e7eb" }}
            >
              <BadgeInfoIcon className="w-4 h-4" style={{ color: "#a855f7" }} />{" "}
              Description
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
              {listing.description}
            </p>
          </div>

          {/* Status / Verification */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={
                listing.status === "active"
                  ? {
                      background: "rgba(74,222,128,0.1)",
                      color: "#4ade80",
                      border: "1px solid rgba(74,222,128,0.2)",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "#9ca3af",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {listing.status?.toUpperCase()}
            </span>
            {listing.verified && (
              <span
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "rgba(168,85,247,0.12)",
                  color: "#a855f7",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <CheckCircleIcon size={14} /> Verified
              </span>
            )}
            {listing.monetized && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "rgba(234,179,8,0.1)",
                  color: "#facc15",
                  border: "1px solid rgba(234,179,8,0.2)",
                }}
              >
                Monetized
              </span>
            )}
            {listing.featured && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "rgba(168,85,247,0.12)",
                  color: "#c084fc",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                Featured
              </span>
            )}
            {listing.platformAssured && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
              >
                Platform Assured
              </span>
            )}
          </div>

          {/* Owner Info */}
          {listing.owner && (
            <div
              className="pt-3 mt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h4
                className="font-semibold mb-2 flex items-center gap-1"
                style={{ color: "#e5e7eb" }}
              >
                <UserIcon className="w-4 h-4" style={{ color: "#9ca3af" }} />{" "}
                Owner
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={listing.owner.image}
                  alt={listing.owner.name}
                  className="size-8 rounded-full object-cover"
                  style={{ border: "2px solid rgba(168,85,247,0.4)" }}
                />
                <div>
                  <p className="font-medium" style={{ color: "#e5e7eb" }}>
                    {listing.owner.name}
                  </p>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    {listing.owner.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Customer Info */}
          {listing.customer && (
            <div
              className="pt-3 mt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h4
                className="font-semibold mb-2 flex items-center gap-1"
                style={{ color: "#e5e7eb" }}
              >
                <UserIcon className="w-4 h-4" style={{ color: "#9ca3af" }} />{" "}
                Customer
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={listing.customer.image}
                  alt={listing.customer.name}
                  className="size-8 rounded-full object-cover"
                  style={{ border: "2px solid rgba(168,85,247,0.4)" }}
                />
                <div>
                  <p className="font-medium" style={{ color: "#e5e7eb" }}>
                    {listing.customer.name}
                  </p>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    {listing.customer.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Price Section */}
          <div
            className="pt-3 mt-3 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "#6b7280" }}
            >
              <GlobeIcon size={15} /> Listed on{" "}
              {new Date(listing.createdAt).toLocaleDateString()}
            </div>
            <p className="text-lg font-semibold" style={{ color: "#a855f7" }}>
              {currency}
              {listing.price?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsModal;
