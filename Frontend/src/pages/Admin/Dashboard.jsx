import {
  ChartLineIcon,
  CircleDollarSignIcon,
  ListIcon,
  Loader2Icon,
  UsersIcon,
} from "lucide-react";
import AdminTitle from "../../components/admin/AdminTitle";
import { useState, useEffect } from "react";
import ListingDetailsModal from "../../components/admin/ListingDetailsModal";
import { dummyListings } from "../../assets/assets";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalListings: 0,
    totalRevenue: 0,
    activeListings: 0,
    totalUser: 0,
    recentListings: [],
  });
  const [showModal, setShowModal] = useState(null);

  const dashboardCards = [
    {
      title: "Total Listings",
      value: dashboardData.totalListings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue.toLocaleString(),
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Listings",
      value: dashboardData.activeListings || "0",
      icon: ListIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData({
      totalListings: 5,
      totalRevenue: 2980,
      activeListings: 3,
      totalUser: 7,
      recentListings: dummyListings,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 🔄 Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2Icon
          className="animate-spin size-8"
          style={{ color: "#a855f7" }}
        />
      </div>
    );
  }

  return (
    <>
      <AdminTitle text1="Admin" text2="Dashboard" />

      {/* 🔥 Cards */}
      <div className="flex flex-wrap gap-4 mt-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full max-w-[220px] rounded-2xl p-4 transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(168,85,247,0.15)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {card.title}
              </p>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 4,
                  color: "#ffffff",
                }}
              >
                {card.value}
              </h2>
            </div>

            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.2))",
                border: "1px solid rgba(168,85,247,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <card.icon size={18} style={{ color: "#a855f7" }} />
            </div>
          </div>
        ))}
      </div>

      {/* 📊 Table Title */}
      <p
        style={{
          marginTop: 40,
          fontSize: 16,
          fontWeight: 600,
          color: "#ffffff",
        }}
      >
        Recent <span style={{ color: "#a855f7" }}>Listings</span>
      </p>

      {/* 📊 Table */}
      <div
        className="mt-6 overflow-x-auto w-full max-w-5xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          backdropFilter: "blur(12px)",
        }}
      >
        <table
          className="w-full text-sm text-left"
          style={{ borderCollapse: "collapse", color: "#d1d5db" }}
        >
          {/* Header */}
          <thead>
            <tr
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(168,85,247,0.05)",
              }}
            >
              {["#", "Title", "Niche", "Platform", "Username"].map((col) => (
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

          {/* Body */}
          <tbody>
            {dashboardData.recentListings.map((listing, index) => (
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
                <td style={{ padding: "14px 16px", color: "#6b7280" }}>
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
                      textTransform: "capitalize",
                    }}
                  >
                    {listing.platform}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13 }}>
                  <span style={{ color: "#a78bfa" }}>@</span>
                  <span style={{ color: "#c084fc" }}>{listing.username}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <ListingDetailsModal
            listing={showModal}
            onClose={() => setShowModal(null)}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
