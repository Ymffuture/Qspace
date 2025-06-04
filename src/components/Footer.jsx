import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { MdOutlineWarning } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#23272E] text-gray-300 pt-12 px-6 lg:px-20 pb-6 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 border-b border-gray-600 pb-10">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">About Qspace</h2>
          <p className="text-gray-400 leading-relaxed">
            Qspace is a leading platform by <a href="https://quorvexinstitute.vercel.app" className="text-[#FFD700] hover:underline">Quorvex</a> that delivers quality content, tutorials, and resources to future innovators and coders.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-[#32CD32] transition">Blog</a></li>
            <li><a href="/courses" className="hover:text-[#1E90FF] transition">Courses</a></li>
            <li><a href="/about" className="hover:text-[#FFD700] transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#32CD32] transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#1E90FF]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#1E90FF]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#1E90FF]"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-[#1E90FF]"><FaInstagram /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Stay Updated</h2>
          <p className="text-gray-400 mb-3">Join our newsletter for fresh content weekly.</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 text-sm rounded bg-[#2E333B] text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
            />
            <button
            disabled
              type="submit"
              className="bg-[#FFD700] text-black px-4 py-2 rounded hover:bg-yellow-400 font-semibold transition"
            >
              Subscribe
            </button>
            <p className='flex text-[14px] text-red-500 text-center justify-center'><MdOutlineWarning className='text-[18px]'/> Under maintainance</p>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-xs">
        <p>© 2025 | Qspace powered by <a href="https://quorvexinstitute.vercel.app" className="text-white hover:underline">Quorvex</a></p>
        <div className="mt-2 space-x-4">
          <a href="/terms" className="hover:text-[#32CD32]">Terms</a>
          <a href="/privacy" className="hover:text-[#1E90FF]">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
