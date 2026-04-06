import toast from "react-hot-toast";
import { XIcon, CopyIcon } from "lucide-react";

const WithdrawalDetail = ({ data, onClose }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const copyToClipboard = ({ name, value }) => {
    navigator.clipboard.writeText(value || "");
    toast.success(`${name} copied to clipboard`);
  };

  const markAsWithdrawn = async () => {};

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-xl h-screen sm:h-[480px] flex flex-col sm:rounded-lg"
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
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-lg truncate"
              style={{ color: "#ffffff" }}
            >
              Withdrawal Request
            </h3>
            <p
              className="text-sm truncate"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Request by{" "}
              <span className="font-medium" style={{ color: "#ffffff" }}>
                {data.user?.name || "—"}
              </span>
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
          className="flex-1 overflow-y-auto p-4"
          style={{ color: "#d1d5db" }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-3 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Amount
              </p>
              <p className="font-semibold text-lg" style={{ color: "#a855f7" }}>
                {currency}
                {data.amount.toLocaleString("en-IN")}
              </p>
            </div>
            <div
              className="p-3 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Requested At
              </p>
              <p className="font-medium" style={{ color: "#e5e7eb" }}>
                {new Date(data.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div
            className="mt-4 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h4 className="font-semibold" style={{ color: "#e5e7eb" }}>
              Account Details
            </h4>
            <div className="mt-2 flex flex-col gap-2">
              {data.account.length > 0 ? (
                data.account.map((field, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center gap-3 group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm" style={{ color: "#9ca3af" }}>
                        {field.name}
                      </p>
                      <p
                        className="font-medium truncate"
                        style={{ color: "#e5e7eb" }}
                      >
                        {field.value}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(field)}
                      className="invisible group-hover:visible p-1 rounded transition-colors"
                      title={`Copy ${field.name}`}
                      style={{ color: "#a855f7" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(168,85,247,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <CopyIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  No account info available.
                </p>
              )}
            </div>
          </div>

          <div
            className="mt-4 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h4 className="font-semibold" style={{ color: "#e5e7eb" }}>
              User Summary
            </h4>
            <div className="mt-2 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={data.user?.image}
                  alt={data.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid rgba(168,85,247,0.4)" }}
                />
                <div className="min-w-0">
                  <p
                    className="font-medium truncate"
                    style={{ color: "#e5e7eb" }}
                  >
                    {data.user?.name || "—"}
                  </p>
                  <p className="truncate text-xs" style={{ color: "#6b7280" }}>
                    {data.user?.email || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {data.isWithdrawn && (
            <div
              className="mt-4 p-3 rounded"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "#4ade80",
              }}
            >
              This withdrawal is already marked as withdrawn.
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!data.isWithdrawn && (
          <div
            className="p-4 flex items-center justify-end gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <button
              onClick={markAsWithdrawn}
              className="text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Mark as withdrawn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalDetail;
