import AdminTitle from "../../components/admin/AdminTitle";
import { useState } from "react";
import { useEffect } from "react";
import ListingDetailsModal from "../../components/admin/ListingDetailsModal";
import { Loader2Icon, BanknoteIcon } from "lucide-react";
import { dummyOrders } from "../../assets/assets";

const Transactions = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [trasactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);

  const getTransactions = async () => {
    setTransactions(dummyOrders);
    setLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return loading ? (
    <div
      className="flex items-center justify-center h-full"
      style={{ minHeight: 300 }}
    >
      <Loader2Icon
        className="animate-spin size-7"
        style={{ color: "#a855f7" }}
      />
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <BanknoteIcon size={18} color="white" />
          </div>
          <div>
            <h1
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              List <span style={{ color: "#a855f7" }}>Transactions</span>
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 13,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {trasactions.length} transaction
              {trasactions.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
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
          {trasactions.length} Total
        </div>
      </div>

      {/* Table */}
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
                  "Username",
                  "Platform",
                  "Amount",
                  "Purchase Date",
                  "Action",
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
              {trasactions.map((t, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
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
                  <td style={{ padding: "14px 16px", fontSize: 13 }}>
                    <span style={{ color: "#a78bfa" }}>@</span>
                    <span style={{ color: "#c084fc" }}>
                      {t.listing.username}
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
                      }}
                    >
                      {t.listing.platform}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#a855f7",
                      fontWeight: 600,
                    }}
                  >
                    {currency}
                    {t.amount}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#9ca3af",
                      fontSize: 13,
                    }}
                  >
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => setShowModal(t.listing)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "7px 14px",
                        borderRadius: 8,
                        background: "rgba(168,85,247,0.12)",
                        border: "1px solid rgba(168,85,247,0.25)",
                        color: "#a855f7",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(168,85,247,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(168,85,247,0.12)";
                      }}
                    >
                      more details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ListingDetailsModal
          listing={showModal}
          onClose={() => {
            setShowModal(null);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;
