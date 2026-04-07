import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  ArrowUpRightFromSquareIcon,
  CopyIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { dummyOrders, getProfileLink } from "../../assets/assets";

const CredentialVerifyModal = ({ listing, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [credential, setCredential] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const profileLink = getProfileLink(listing.platform, listing.username);

  const copyToClipboard = ({ name, value }) => {
    navigator.clipboard.writeText(value);
    toast.success(`${name} copied to clipboard`);
  };

  const fetchCredential = async () => {
    setCredential(dummyOrders[0].credential);
    setLoading(false);
  };

  const verifyCredential = async () => {};

  useEffect(() => {
    fetchCredential();
  }, []);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-xl h-screen sm:h-[400px] flex flex-col sm:rounded-lg"
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
              {listing?.title}
            </h3>
            <p
              className="text-sm truncate"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              verifying Credentials for{" "}
              <span className="font-medium" style={{ color: "#ffffff" }}>
                {listing?.username}
              </span>{" "}
              on {listing?.platform}
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

        {/* preview credentials */}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2Icon
              className="animate-spin size-6"
              style={{ color: "#a855f7" }}
            />
          </div>
        ) : (
          <div
            className="flex flex-col items-start gap-3 p-4 overflow-y-scroll"
            style={{ color: "#d1d5db" }}
          >
            {credential?.originalCredential.map((cred, index) => (
              <div key={index} className="w-full flex items-center gap-2 group">
                <span className="font-medium" style={{ color: "#e5e7eb" }}>
                  {cred.name}
                </span>
                <span style={{ color: "#6b7280" }}>:</span>
                <span style={{ color: "#9ca3af" }}>
                  {cred.name.toLowerCase() === "password"
                    ? "********"
                    : cred?.value}
                </span>
                <CopyIcon
                  onClick={() => copyToClipboard(cred)}
                  size={14}
                  className="group-hover:visible invisible cursor-pointer"
                  style={{ color: "#a855f7" }}
                />
              </div>
            ))}

            <div
              className="text-sm flex gap-1 items-center"
              style={{ color: "#9ca3af" }}
            >
              <p>Open Platform : </p>
              <Link
                to={profileLink}
                target="_blank"
                className="flex gap-1 items-center"
                style={{ color: "#a855f7" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c084fc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a855f7")}
              >
                click here
                <ArrowUpRightFromSquareIcon size={13} />
              </Link>
            </div>

            <div className="flex gap-2 items-start mt-2">
              <input
                type="checkbox"
                onChange={() => setIsVerified((prev) => !prev)}
                className="size-4 mt-0.5"
                style={{ accentColor: "#a855f7" }}
              />
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Please verify the credentials above and click on the button
                below to verify. <br /> If credential are not correct, please
                contact the owner of the listing.
              </p>
            </div>

            <button
              onClick={verifyCredential}
              disabled={!isVerified}
              className="mt-2 text-sm font-medium py-2 px-5 rounded-md transition-all"
              style={{
                background: isVerified
                  ? "linear-gradient(135deg, #a855f7, #7c3aed)"
                  : "rgba(168,85,247,0.2)",
                color: isVerified ? "#ffffff" : "rgba(255,255,255,0.35)",
                border: "1px solid rgba(168,85,247,0.3)",
                cursor: isVerified ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (isVerified) e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                if (isVerified) e.currentTarget.style.opacity = "1";
              }}
            >
              Verify Credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialVerifyModal;
