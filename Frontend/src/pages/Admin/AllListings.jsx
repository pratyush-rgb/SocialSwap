import AdminTitle from "../../components/Admin/AdminTitle";
import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  Loader2Icon,
  MailCheckIcon,
  XIcon,
  FilterIcon,
} from "lucide-react";
import ListingDetailsModal from "../../components/Admin/ListingDetailsModal";
import { dummyListings } from "../../assets/assets";

const AllListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const fetchAllListings = async () => {
    setListings(dummyListings);
    setLoading(false);
  };

  const changeListingStatus = async (status, listing) => {
    setListings((prev) => [
      ...prev.filter((l) => l.id !== listing.id),
      { ...listing, status },
    ]);
  };

  const colorMapCredentials = {
    notSubmit: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
      icon: XIcon,
    },
    submitted: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/20",
      icon: MailCheckIcon,
    },
    verified: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      icon: CheckCircleIcon,
    },
    changed: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      icon: CheckCircleIcon,
    },
  };

  const statusColors = {
    active: "text-green-400",
    inactive: "text-gray-400",
    ban: "text-red-400",
    sold: "text-purple-400",
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-full min-h-[300px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2Icon
          className="animate-spin size-8"
          style={{ color: "#a855f7" }}
        />
        <span className="text-sm" style={{ color: "#9ca3af" }}>
          Loading listings...
        </span>
      </div>
    </div>
  ) : (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #13131f 50%, #0d0d18 100%)",
        padding: "32px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterIcon size={18} color="white" />
          </div>
          <div>
            <h1
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              All <span style={{ color: "#a855f7" }}>Listings</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
              {listings.length} total listings found
            </p>
          </div>
        </div>

        {/* Count badge */}
        <div
          style={{
            background: "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.25)",
            borderRadius: 20,
            padding: "6px 16px",
            color: "#a855f7",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {listings.length} Listings
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(168,85,247,0.05)",
                }}
              >
                {[
                  "#",
                  "Title",
                  "Niche",
                  "Platform",
                  "Username",
                  "Credentials",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontWeight: 600,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((listing, index) => (
                <tr
                  key={index}
                  onClick={() => setShowModal(listing)}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(168,85,247,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* # */}
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#6b7280",
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 12,
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Title */}
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#e5e7eb",
                      fontWeight: 500,
                      maxWidth: 200,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.title}
                    </span>
                  </td>

                  {/* Niche */}
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 6,
                        padding: "3px 10px",
                        color: "#d1d5db",
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.niche}
                    </span>
                  </td>

                  {/* Platform */}
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: "rgba(168,85,247,0.12)",
                        border: "1px solid rgba(168,85,247,0.2)",
                        borderRadius: 6,
                        padding: "3px 10px",
                        color: "#c084fc",
                        fontSize: 12,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.platform}
                    </span>
                  </td>

                  {/* Username */}
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#9ca3af",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#a78bfa" }}>@</span>
                    {listing.username}
                  </td>

                  {/* Credentials */}
                  <td style={{ padding: "14px 16px" }}>
                    {(() => {
                      const credStatus = listing.isCredentialChanged
                        ? "changed"
                        : listing.isCredentialVerified
                          ? "verified"
                          : listing.isCredentialSubmitted
                            ? "submitted"
                            : "notSubmit";
                      const color = colorMapCredentials[credStatus];
                      const label = listing.isCredentialChanged
                        ? "Changed"
                        : listing.isCredentialVerified
                          ? "Verified"
                          : listing.isCredentialSubmitted
                            ? "Submitted"
                            : "Not Submit";
                      return (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            border: `1px solid`,
                          }}
                          className={`${color.bg} ${color.text} ${color.border}`}
                        >
                          <color.icon size={11} />
                          {label}
                        </span>
                      );
                    })()}
                  </td>

                  {/* Status */}
                  <td
                    style={{ padding: "14px 16px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {listing.status !== "deleted" ? (
                      <select
                        value={listing.status}
                        onChange={(e) =>
                          changeListingStatus(e.target.value, listing)
                        }
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                          padding: "6px 10px",
                          color: statusColors[listing.status] || "#d1d5db",
                          fontSize: 12,
                          fontWeight: 500,
                          outline: "none",
                          cursor: "pointer",
                          appearance: "none",
                          paddingRight: 28,
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 8px center",
                        }}
                      >
                        <option
                          value="active"
                          style={{ background: "#1a1a2e", color: "#4ade80" }}
                        >
                          Active
                        </option>
                        <option
                          value="inactive"
                          style={{ background: "#1a1a2e", color: "#9ca3af" }}
                        >
                          Inactive
                        </option>
                        <option
                          value="ban"
                          style={{ background: "#1a1a2e", color: "#f87171" }}
                        >
                          Ban
                        </option>
                        <option
                          value="sold"
                          style={{ background: "#1a1a2e", color: "#c084fc" }}
                        >
                          Sold
                        </option>
                      </select>
                    ) : (
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: "rgba(239,68,68,0.1)",
                          color: "#f87171",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        Deleted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {listings.length === 0 && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#4b5563",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 15, color: "#6b7280" }}>No listings found</p>
          </div>
        )}
      </div>

      {showModal && (
        <ListingDetailsModal
          listing={showModal}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  );
};

export default AllListings;
