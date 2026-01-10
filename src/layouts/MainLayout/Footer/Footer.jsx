import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ReadOnRouteLogo from "../../../Components/Logo/ReadOnRouteLogo";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content rounded-sm mt-16 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        
        {/* Brand */}
        <div>
            <ReadOnRouteLogo width={120}></ReadOnRouteLogo>
          <p className="text-sm text-gray-500 inter">
            Discover, order, and track your favorite books with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-primary font-bold inter">Quick Links</h3>
          <ul className="space-y-2 text-sm playfair">
            <li><a className="link link-hover" href="/">Home</a></li>
            <li><a className="link link-hover" href="/allbooks">Books</a></li>
            <li><a className="link link-hover" href="/dashboard">Dashboard</a></li>
            <li><a className="link link-hover" >Contact</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="footer-title text-primary font-bold inter">Contact</h3>
          <ul className="text-sm space-y-2 playfair">
            <li>Email: support@readonroute.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-title text-primary font-bold inter">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              
              className="hover:text-primary cursor-pointer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              
              className="hover:text-primary cursor-pointer"
              aria-label="X"
            >
              <FaXTwitter />
            </a>
            <a
              
              className="hover:text-primary cursor-pointer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              
              className="hover:text-primary cursor-pointer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              
              className="hover:text-primary cursor-pointer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ReadOnRoute. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
