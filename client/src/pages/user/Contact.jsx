// src/pages/Contact.jsx
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="relative min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#F5F5F5] via-[#F0F8F5] to-[#E9DCC9]">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00FF7C]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#007755]/10 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight m-16">
        <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Info */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-[#00FF7C]/30">
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6">Get in Touch</h2>
          <p className="text-[#2F3E46]/80 mb-6">
            Have questions, feedback, or need support? We’re here to help you. 
            Reach out to us through any of the following ways:
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">support@fynsd.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">+91 62685 41185</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">Indore, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Facebook className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Twitter className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Linkedin className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Instagram className="w-5 h-5 text-[#007755]" />
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-[#00FF7C]/30">
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6">Send Us a Message</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Message</label>
              <textarea 
                rows="5" 
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF7C] to-[#007755] text-white font-bold tracking-wide shadow-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
