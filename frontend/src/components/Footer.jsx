import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 text-sm">
          {/* Left */}
          <div>
            <img
              className="mb-5 w-36"
              src={assets.logo}
              alt="Prescripto Logo"
            />
            <p className="text-gray-600 leading-6 max-w-sm mb-4">
              Our mission is to make quality healthcare accessible, reliable,
              and convenient for everyone.
            </p>

            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="https://facebook.com"
                    className="w-9 h-9 flex items-center justify-center
                               rounded-full border border-gray-300
                               text-gray-600 hover:bg-primary hover:text-white
                               transition"
                  >
                    <Icon size={14} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg font-medium mb-4">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <NavLink to="/" className="hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-primary">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="hover:text-primary">
                  Careers
                </NavLink>
              </li>
              
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="text-lg font-medium mb-4">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="text-sm text-gray-600">
                11A/3 MG Road,
                <br />
                Civil Lines, Delhi, India
              </li>

              <li>
                <a href="tel:+917317251295" className="hover:text-primary">
                  +91-7317251295
                </a>
              </li>
              <li>
                <a
                  href="mailto:year22to26@gmail.com"
                  className="hover:text-primary"
                >
                  year22to26@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Subscribe to our newsletter
            </p>

            <div className="flex">
              <input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none"
              />

              <button className="bg-primary text-white px-4 py-2 rounded-r-md text-sm hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>© 2025 Prescripto — All Rights Reserved.</p>

          <div className="flex gap-4">
            <NavLink to="/terms" className="hover:text-primary">
              Terms
            </NavLink>
            <NavLink to="/privacy-policy" className="hover:text-primary">
              Privacy
            </NavLink>
            <NavLink to="/cookies" className="hover:text-primary">
              Cookies
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
