import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-opacity-40 backdrop-blur-lg text-white px-6 py-3 rounded-full shadow-lg w-[90%] md:w-auto flex items-center justify-between z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MyBrand
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 ml-6">
        <Link to="/about" className="hover:text-gray-300 transition">About</Link>
        <Link to="/services" className="hover:text-gray-300 transition">Services</Link>
        <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
      </div>

      {/* CTA Button */}
      <div className="hidden md:block ml-6">
        <Link
          to="/signup"
          className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black bg-opacity-80 backdrop-blur-lg rounded-lg p-4 space-y-4 text-center shadow-md md:hidden">
          <Link to="/about" className="block hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/services" className="block hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/contact" className="block hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link
            to="/signup"
            className="block bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;