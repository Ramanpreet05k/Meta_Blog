import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, logoutUser } = useContext(StoreContext);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-10 w-10 object-contain" />
          <p className="hidden sm:block text-2xl font-semibold text-gray-800">
            Meta<span className="text-orange-500 font-bold">Blog</span>
          </p>
        </Link>

        {/* Center Navigation Links */}
        <ul className="hidden sm:flex items-center gap-6 text-lg font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors duration-300 hover:text-orange-500 ${
                location.pathname === item.path ? "text-orange-500 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-block bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={logoutUser}
                className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
