import { useEffect, useState } from "react";
import { Loader2Icon, WalletIcon } from "lucide-react";
import AdminTitle from "../../components/admin/AdminTitle";
import WithdrawalDetail from "../../components/admin/WithdrawalDetail";
import { dummyWithdrawalRequests } from "../../assets/assets";

const Withdrawal = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const getRequests = async () => {
    setRequests(dummyWithdrawalRequests);
    setIsLoading(false);
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ minHeight: 300 }}
      >
        <Loader2Icon
          className="size-7 animate-spin"
          style={{ color: "#a855f7" }}
        />
      </div>
    );
  }

  return (
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
            <WalletIcon size={18} color="white" />
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
              All <span style={{ color: "#a855f7" }}>Withdrawals</span>
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 13,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {requests.length} request{requests.length !== 1 ? "s" : ""} found
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
          {requests.length} Total
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
                {["#", "User", "Email", "Amount", "Status", "Action"].map(
                  (col, i) => (
                    <th
                      key={col}
                      style={{
                        padding: "14px 16px",
                        textAlign: i === 5 ? "center" : "left",
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
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "40px 16px",
                      color: "#6b7280",
                    }}
                  >
                    No withdrawal requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr
                    key={req.id}
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
                    <td style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <img
                          src={req.user?.image}
                          alt={req.user?.name}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "2px solid rgba(168,85,247,0.4)",
                            objectFit: "cover",
                          }}
                        />
                        <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
                          {req.user?.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        color: "#9ca3af",
                        fontSize: 13,
                      }}
                    >
                      {req.user?.email}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        color: "#a855f7",
                        fontWeight: 600,
                      }}
                    >
                      {currency}
                      {req.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {req.isWithdrawn ? (
                        <span
                          style={{
                            background: "rgba(74,222,128,0.1)",
                            border: "1px solid rgba(74,222,128,0.2)",
                            color: "#4ade80",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Paid
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#9ca3af",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Pending
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => setSelectedRequest(req)}
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
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(168,85,247,0.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(168,85,247,0.12)")
                        }
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <WithdrawalDetail
          data={selectedRequest}
          onClose={() => {
            getRequests();
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};

export default Withdrawal;
