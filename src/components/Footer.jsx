import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-2xl font-semibold text-white">About</h2>
          <p className="text-sm leading-relaxed text-gray-400 text-center md:text-left">
            MetaBlog is your trusted platform for insightful articles on
            technology, lifestyle, and current trends. Our mission is to inspire
            learning and creativity through well-researched and engaging
            content.
          </p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>
              Email:{" "}
              <a
                href="mailto:contact@metablog.com"
                className="text-white hover:text-orange-400 transition duration-300"
              >
                contact@metablog.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+911234567890"
                className="text-white hover:text-orange-400 transition duration-300"
              >
                +91-1234567890
              </a>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-2xl font-semibold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-orange-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-orange-400 transition duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-orange-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-orange-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-2xl font-semibold text-white">Categories</h2>
          <ul className="space-y-2">
            <li className="hover:text-orange-400 cursor-pointer transition duration-300">
              Technology
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition duration-300">
              Lifestyle
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition duration-300">
              News
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition duration-300">
              Weather
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <img src={assets.logo} alt="MetaBlog Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-semibold text-white">
            Meta<span className="text-orange-500">Blog</span>
          </span>
        </div>

        <ul className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
          <li className="hover:text-orange-400 transition duration-300 cursor-pointer">
            Privacy Policy
          </li>
          <li className="hover:text-orange-400 transition duration-300 cursor-pointer">
            Terms & Conditions
          </li>
          <li className="text-gray-500">
            © {new Date().getFullYear()} MetaBlog — All Rights Reserved
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
