import AdminTitle from "../../components/admin/AdminTitle";
import { useEffect } from "react";
import { useState } from "react";
import { Loader2Icon, KeyRoundIcon, ShieldCheckIcon } from "lucide-react";
import CredentialChangeModal from "../../components/admin/CredentialChangeModal";
import { dummyListings } from "../../assets/assets";

const CredentialChange = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);

  const fetchAllUnchangedListings = async () => {
    setListings(dummyListings);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUnchangedListings();
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
    <div className="h-full">
      {listings.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center h-full"
          style={{ minHeight: 400, gap: 16 }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.2))",
              border: "1px solid rgba(168,85,247,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <ShieldCheckIcon size={32} style={{ color: "#a855f7" }} />
          </div>
          <h3
            className="text-2xl font-bold"
            style={{ color: "#ffffff", margin: 0 }}
          >
            All Credentials Changed
          </h3>
          <p style={{ color: "#6b7280", margin: 0 }}>
            No listings with unchanged credentials found
          </p>
        </div>
      ) : (
        <>
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
                <KeyRoundIcon size={18} color="white" />
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
                  Change <span style={{ color: "#a855f7" }}>Credentials</span>
                </h1>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: 13,
                    marginTop: 2,
                    marginBottom: 0,
                  }}
                >
                  {listings.length} listing{listings.length !== 1 ? "s" : ""}{" "}
                  pending credential update
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
              {listings.length} Pending
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
              width: "100%",
              maxWidth: "72rem",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
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
                  {listings.map((listing, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(168,85,247,0.06)")
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
                          }}
                        >
                          {listing.platform}
                        </span>
                      </td>
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
                      <td style={{ padding: "14px 16px" }}>
                        <button
                          onClick={() => setShowModal(listing)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "7px 16px",
                            borderRadius: 8,
                            background:
                              "linear-gradient(135deg, #a855f7, #7c3aed)",
                            color: "#ffffff",
                            fontSize: 12,
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition:
                              "opacity 0.15s ease, transform 0.1s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.85";
                            e.currentTarget.style.transform = "scale(1.03)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          <KeyRoundIcon size={12} />
                          change
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <CredentialChangeModal
              listing={showModal}
              onClose={() => {
                fetchAllUnchangedListings();
                setShowModal(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CredentialChange;
