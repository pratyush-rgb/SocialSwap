import { NavLink } from "react-router-dom";
import {
  BanknoteIcon,
  CheckIcon,
  LayoutDashboardIcon,
  ListIcon,
  Settings2Icon,
  WalletIcon,
} from "lucide-react";
import { assets } from "../../assets/assets";

const AdminSidebar = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    imageUrl: assets.user_profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Verify", path: "/admin/verify-credentials", icon: CheckIcon },
    { name: "Change", path: "/admin/change-credentials", icon: Settings2Icon },
    { name: "Listings", path: "/admin/list-listings", icon: ListIcon },
    { name: "Transactions", path: "/admin/transactions", icon: BanknoteIcon },
    { name: "Withdrawal", path: "/admin/withdrawal", icon: WalletIcon },
  ];

  return (
    <div
      className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full text-sm"
      style={{
        borderRight: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <img
        className="size-9 md:size-12 rounded-full mx-auto"
        style={{ border: "2px solid rgba(168,85,247,0.4)" }}
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2 text-base max-md:hidden" style={{ color: "#e5e7eb" }}>
        {user.firstName} {user.lastName}
      </p>
      <div className="w-full">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 ${isActive ? "group" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#a855f7" : "#9ca3af",
              background: isActive ? "rgba(168,85,247,0.08)" : "transparent",
              transition: "all 0.15s ease",
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("group")) {
                e.currentTarget.style.color = "#d1d5db";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("group")) {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className="w-1.5 h-10 rounded-l right-0 absolute"
                  style={{ background: isActive ? "#a855f7" : "transparent" }}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
