// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#09332C] text-[#F3F3F2] border-t border-[#00FF7C]/20 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand / About */}
        {/* <div>
          <h3 className="text-2xl font-bold text-[#00FF7C] mb-3">Fynsd</h3>
          <p className="text-sm leading-relaxed">
            Your trusted source to learn and grow financial knowledge in a
            modern way.
          </p>
        </div> */}
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#00FF7C] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#F4FF00] transition">Home</Link></li>
            <li><Link to="/knowledge" className="hover:text-[#F4FF00] transition">Knowledge</Link></li>
            <li><Link to="/roadmap" className="hover:text-[#F4FF00] transition">Roadmaps</Link></li>
            <li><Link to="/calculators" className="hover:text-[#F4FF00] transition">Calculators</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-[#00FF7C] mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[#F4FF00] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#F4FF00] transition">Contact</Link></li>
            <li><Link to="/faqs" className="hover:text-[#F4FF00] transition">FAQs</Link></li>
            <li><Link to="/advertise" className="hover:text-[#F4FF00] transition">Advertise with Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#00FF7C] mb-3">
            Contact
          </h3>
          <p className="text-sm">support@fynsd.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-[#00FF7C] mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full bg-[#00FF7C]/10 hover:bg-[#00FF7C]/20 transition">
              <Facebook className="w-5 h-5 text-[#00FF7C]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full bg-[#00FF7C]/10 hover:bg-[#00FF7C]/20 transition">
              <Instagram className="w-5 h-5 text-[#00FF7C]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full bg-[#00FF7C]/10 hover:bg-[#00FF7C]/20 transition">
              <Twitter className="w-5 h-5 text-[#00FF7C]" />
            </a>
            <a href="https://www.linkedin.com/in/mohitdogaya/" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full bg-[#00FF7C]/10 hover:bg-[#00FF7C]/20 transition">
              <Linkedin className="w-5 h-5 text-[#00FF7C]" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full bg-[#00FF7C]/10 hover:bg-[#00FF7C]/20 transition">
              <Youtube className="w-5 h-5 text-[#00FF7C]" />
            </a>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center mt-10">
        <p className="text-[#F4FF00] text-sm italic font-medium">
          “Fynsd – Learn with Clarity, Live with Prosperity.”
        </p>
      </div>

      {/* Bottom Strip */}
      <div className="max-w-[300px] mx-auto text-center text-xs md:text-sm mt-10 border-t border-[#00FF7C]/20 pt-6 text-[#D4D4D4]">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00FF7C] font-semibold">Fynsd</span>. All rights reserved.
      </div>

      <div className="text-center text-9xl font-extrabold mt-10 fynsd-footer">
        FYNSD
      </div>
    </footer>
  );
}
