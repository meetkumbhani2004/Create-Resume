import React from "react";
import { Linkedin, Twitter, Youtube, Dribbble } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-50 to-green-100 text-gray-700 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-200 pb-10">
          {/* Brand */}
          <div>
              <img
          src="/meet-logo.png"
          alt="Logo"
          className="w-36 h-36 object-contain"
        />
        <span className="text-xl font-bold text-gray-800">ResumeBuilder</span>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Making every customer feel valued — no matter the size of your
              audience.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Company
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Community
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="/" className="hover:text-green-600 transition">
                  Careers
                </a>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  We’re hiring!
                </span>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-green-600 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          {/* Social icons */}
          <div className="flex items-center gap-5 mb-4 md:mb-0">
            <a href="/" className="hover:text-green-600 transition">
              <Dribbble size={18} />
            </a>
            <a href="/" className="hover:text-green-600 transition">
              <Linkedin size={18} />
            </a>
            <a href="/" className="hover:text-green-600 transition">
              <Twitter size={18} />
            </a>
            <a href="/" className="hover:text-green-600 transition">
              <Youtube size={18} />
            </a>
          </div>

          <p>© {new Date().getFullYear()} Resume Builder</p>
        </div>
      </div>
    </footer>
  );
}
