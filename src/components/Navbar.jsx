import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left: Logo */}
        <Link
  to={
    user?.role === "admin"
      ? "/admin"
      : user?.role === "superadmin"
      ? "/superadmin"
      : "/"
  }
  className="flex items-center gap-3 no-underline group"
>

          <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <span className="text-xl">🚂</span>
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-gray-900">
            RailCare<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* 👤 Normal User */}
          {user && user.role === "user" && (
            <>
              <Link
                to="/file-complaint"
                className="text-gray-600 hover:text-blue-600 font-semibold transition no-underline"
              >
                {t("fileComplaint")}
              </Link>

              <Link
                to="/track-complaint"
                className="text-gray-600 hover:text-blue-600 font-semibold transition no-underline"
              >
                {t("complaintStatus")}
              </Link>
            </>
          )}

          {/* 🛠 Admin */}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="text-gray-600 hover:text-blue-600 font-semibold transition no-underline"
            >
              {t("dashboard")}
            </Link>
          )}

          {/* 🏛 SuperAdmin */}
          {user && user.role === "superadmin" && (
            <Link
              to="/superadmin"
              className="text-gray-600 hover:text-blue-600 font-semibold transition no-underline"
            >
              {t("superAdminPanel")}
            </Link>
          )}

        </div>
        <select
  onChange={(e) => i18n.changeLanguage(e.target.value)}
  className="border rounded px-2 py-1 text-sm"
>
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>

        {/* Right Side Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 italic">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition border border-red-100"
              >
               {t("logout")}
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition no-underline"
              >
                {t("signIn")}
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition no-underline"
              >
                {t("signUp")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col border-t border-gray-50 pt-4">

          {/* 👤 User Mobile */}
          {user && user.role === "user" && (
            <>
              <Link to="/file-complaint" className="text-gray-600 font-semibold">
                File Complaint
              </Link>
              <Link to="/track-complaint" className="text-gray-600 font-semibold">
                Complaint Status
              </Link>
            </>
          )}

          {/* 🛠 Admin Mobile */}
          {user && user.role === "admin" && (
            <Link to="/admin" className="text-gray-600 font-semibold">
              Dashboard
            </Link>
          )}

          {/* 🏛 SuperAdmin Mobile */}
          {user && user.role === "superadmin" && (
            <Link to="/superadmin" className="text-gray-600 font-semibold">
              Super Admin Panel
            </Link>
          )}

          {user ? (
            <button onClick={logout} className="text-red-600 font-bold text-left">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-600 font-bold">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
