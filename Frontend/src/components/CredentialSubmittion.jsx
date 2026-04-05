import { CirclePlusIcon, X, Shield, Eye, EyeOff, KeyRound } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CredentialSubmittion = ({ onclose, listing }) => {
  const [newfield, setNewfield] = useState("");
  const [credentials, setCredentials] = useState([
    { type: "email", name: "Email", value: "" },
    { type: "password", name: "Password", value: "" },
  ]);
  const [visibleFields, setVisibleFields] = useState({});

  const toggleVisibility = (index) => {
    setVisibleFields((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handelAddfield = () => {
    const name = newfield.trim();
    if (!name) return toast("Enter a field name.");
    setCredentials((prev) => [...prev, { type: "text", name, value: "" }]);
    setNewfield("");
  };

  const handleSubmittion = async (e) => {
    e.preventDefault();
  };

  const getPlatformColor = (platform) => {
    const map = {
      youtube: "#FF0000",
      instagram: "#E1306C",
      tiktok: "#69C9D0",
      twitch: "#9146FF",
      pinterest: "#E60023",
    };
    return map[(platform || "").toLowerCase()] || "#a78bfa";
  };

  const accentColor = getPlatformColor(listing?.platform);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cs-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'DM Sans', sans-serif;
          animation: cs-fadeIn 0.2s ease;
        }

        @keyframes cs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes cs-slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cs-modal {
          background: linear-gradient(145deg, #1a1025 0%, #120d1e 60%, #0f0a1a 100%);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.08),
            0 32px 80px rgba(0,0,0,0.6),
            0 0 60px rgba(109,40,217,0.12);
          animation: cs-slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
          position: relative;
        }

        /* top glow bar */
        .cs-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cs-accent), #a78bfa, var(--cs-accent), transparent);
          border-radius: 20px 20px 0 0;
        }

        /* ambient glow */
        .cs-modal::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Header ── */
        .cs-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.4rem 1.5rem 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          gap: 1rem;
          flex-shrink: 0;
        }

        .cs-header-left {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          min-width: 0;
        }

        .cs-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(109,40,217,0.2);
          border: 1px solid rgba(167,139,250,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cs-header-text h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #f3f0ff;
          margin: 0 0 3px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cs-header-text p {
          font-size: 0.75rem;
          color: rgba(200,185,255,0.55);
          margin: 0;
          line-height: 1.4;
        }

        .cs-header-text p span {
          color: var(--cs-accent);
          font-weight: 500;
        }

        .cs-close-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,185,255,0.6);
          border-radius: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }
        .cs-close-btn:hover {
          background: rgba(255,80,80,0.15);
          border-color: rgba(255,80,80,0.3);
          color: #ff8080;
          transform: rotate(90deg);
        }

        /* ── Form body ── */
        .cs-form {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(167,139,250,0.2) transparent;
        }

        .cs-section-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.5);
          margin-bottom: 0.2rem;
        }

        /* ── Credential row ── */
        .cs-cred-row {
          display: grid;
          grid-template-columns: 110px 1fr auto auto;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 0.45rem 0.6rem;
          transition: border-color 0.18s;
        }
        .cs-cred-row:hover {
          border-color: rgba(167,139,250,0.2);
        }
        .cs-cred-row:focus-within {
          border-color: rgba(167,139,250,0.45);
          background: rgba(109,40,217,0.08);
        }

        .cs-cred-label {
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(200,185,255,0.7);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 0.25rem;
        }

        .cs-cred-input {
          background: transparent;
          border: none;
          outline: none;
          color: #f0ebff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          width: 100%;
          padding: 0.2rem 0;
        }
        .cs-cred-input::placeholder {
          color: rgba(200,185,255,0.25);
        }

        .cs-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(200,185,255,0.4);
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .cs-icon-btn:hover {
          color: #c4b5fd;
          background: rgba(167,139,250,0.1);
        }
        .cs-icon-btn.danger:hover {
          color: #f87171;
          background: rgba(248,113,113,0.1);
        }

        /* ── Divider ── */
        .cs-divider {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0.4rem 0;
        }
        .cs-divider hr {
          flex: 1;
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .cs-divider span {
          font-size: 0.65rem;
          color: rgba(200,185,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Add field row ── */
        .cs-add-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cs-add-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px dashed rgba(167,139,250,0.25);
          border-radius: 10px;
          outline: none;
          color: #f0ebff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          padding: 0.55rem 0.85rem;
          transition: all 0.18s;
        }
        .cs-add-input::placeholder {
          color: rgba(200,185,255,0.3);
        }
        .cs-add-input:focus {
          border-color: rgba(167,139,250,0.55);
          background: rgba(109,40,217,0.08);
        }

        .cs-add-btn {
          background: rgba(109,40,217,0.2);
          border: 1px solid rgba(167,139,250,0.3);
          color: #c4b5fd;
          border-radius: 10px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s;
          flex-shrink: 0;
        }
        .cs-add-btn:hover {
          background: rgba(109,40,217,0.4);
          border-color: #a78bfa;
          color: #fff;
          transform: scale(1.08);
        }

        /* ── Footer ── */
        .cs-footer {
          padding: 1rem 1.5rem 1.4rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .cs-cancel-btn {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(200,185,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.7rem;
          cursor: pointer;
          transition: all 0.18s;
        }
        .cs-cancel-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #f0ebff;
        }

        .cs-submit-btn {
          flex: 2;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);
          border: 1px solid rgba(167,139,250,0.4);
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.7rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(109,40,217,0.4);
          position: relative;
          overflow: hidden;
        }
        .cs-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
        }
        .cs-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(109,40,217,0.55);
          border-color: rgba(196,181,253,0.6);
        }
        .cs-submit-btn:active {
          transform: translateY(0);
        }

        .cs-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          color: rgba(200,185,255,0.35);
          margin-top: 0.15rem;
        }
      `}</style>

      <div
        className="cs-overlay"
        style={{ "--cs-accent": accentColor }}
        onClick={(e) => e.target === e.currentTarget && onclose?.()}
      >
        <div className="cs-modal">
          {/* Header */}
          <div className="cs-header">
            <div className="cs-header-left">
              <div className="cs-icon-wrap">
                <KeyRound size={18} color="#a78bfa" />
              </div>
              <div className="cs-header-text">
                <h3>{listing?.title || "Submit Credentials"}</h3>
                <p>
                  For <span>@{listing?.username || "username"}</span> ·{" "}
                  {listing?.platform || "Platform"}
                </p>
              </div>
            </div>
            <button className="cs-close-btn" onClick={onclose}>
              <X size={15} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmittion} className="cs-form">
            <div className="cs-section-label">Credentials</div>

            {credentials.map((cred, ind) => {
              const isPassword =
                cred.type === "password" && !visibleFields[ind];
              return (
                <div className="cs-cred-row" key={ind}>
                  <span className="cs-cred-label">{cred.name}</span>
                  <input
                    className="cs-cred-input"
                    type={isPassword ? "password" : "text"}
                    value={cred.value}
                    placeholder={`Enter ${cred.name.toLowerCase()}…`}
                    onChange={(e) =>
                      setCredentials((prev) =>
                        prev.map((c, i) =>
                          i === ind ? { ...c, value: e.target.value } : c,
                        ),
                      )
                    }
                  />
                  {cred.type === "password" && (
                    <button
                      type="button"
                      className="cs-icon-btn"
                      onClick={() => toggleVisibility(ind)}
                    >
                      {visibleFields[ind] ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    className="cs-icon-btn danger"
                    onClick={() =>
                      setCredentials((prev) => prev.filter((_, i) => i !== ind))
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}

            {/* Add field */}
            <div className="cs-divider">
              <hr />
              <span>Add field</span>
              <hr />
            </div>

            <div className="cs-add-row">
              <input
                className="cs-add-input"
                type="text"
                value={newfield}
                onChange={(e) => setNewfield(e.target.value)}
                placeholder="Field name (e.g. Recovery Email)…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handelAddfield();
                  }
                }}
              />
              <button
                type="button"
                className="cs-add-btn"
                onClick={handelAddfield}
              >
                <CirclePlusIcon size={18} />
              </button>
            </div>

            <div className="cs-note">
              <Shield size={11} />
              Credentials are encrypted end-to-end
            </div>
          </form>

          {/* Footer */}
          <div className="cs-footer">
            <button type="button" className="cs-cancel-btn" onClick={onclose}>
              Cancel
            </button>
            <button
              type="submit"
              className="cs-submit-btn"
              onClick={handleSubmittion}
            >
              Submit Credentials
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CredentialSubmittion;
