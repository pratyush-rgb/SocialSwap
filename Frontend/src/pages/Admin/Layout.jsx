import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useState, useEffect } from "react";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";

const Layout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIsAdmin = async () => {
    setIsAdmin(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  // 🔄 Loader
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#0f0f1a" }}
      >
        <Loader2Icon
          className="size-8 animate-spin"
          style={{ color: "#a855f7" }}
        />
      </div>
    );
  }

  // ✅ Admin Layout
  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div
          className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto text-white"
          style={{
            background:
              "linear-gradient(135deg, #0f0f1a 0%, #13131f 50%, #0d0d18 100%)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    // ❌ No Access Screen
    <div
      className="flex flex-col items-center justify-center h-screen text-center text-white px-4"
      style={{
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #13131f 50%, #0d0d18 100%)",
      }}
    >
      <div
        className="rounded-2xl p-8 max-w-md w-full"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(168,85,247,0.15)",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          You don't have access to this page
        </h2>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #a855f7, #7c3aed)",
            color: "#ffffff",
            boxShadow: "0 4px 20px rgba(168,85,247,0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Go to Home <ArrowRightIcon className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
};

export default Layout;
