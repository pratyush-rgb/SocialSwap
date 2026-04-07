import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div
      className="flex items-center justify-between px-6 md:px-10 h-16"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Link to="/">
        <img className="w-30 h-auto" src={assets.logo} alt="logo" />
      </Link>
    </div>
  );
};

export default AdminNavbar;
