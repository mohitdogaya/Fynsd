// src/pages/About.jsx
import { motion } from "framer-motion";
import { Users, Target, Award, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const highlights = [
    {
      icon: <Target className="w-12 h-12 text-[#00FF7C] mb-4" />,
      title: "Our Mission",
      desc: "Empowering learners with practical finance skills to make smart money decisions.",
    },
    {
      icon: <Award className="w-12 h-12 text-[#F4FF00] mb-4" />,
      title: "Our Vision",
      desc: "To become the most trusted hub for finance education, tools, and growth worldwide.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#007755] mb-4" />,
      title: "Our Community",
      desc: "A collaborative space where learners, experts, and professionals grow together.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative font-poppins text-[#2F3E46]">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white to-[#E9F9F2]" />

      {/* Wrapper */}
      <div className="relative z-10 p-28 max-w-6xl mx-auto px-6">

        {/* Hero / Tagline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            About <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">Fynsd</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
            <span className="text-[#007755] font-semibold">
              Fynsd – From Curious Minds to Clear Futures
            </span>
          </p>
          <p className="text-sm md:text-base max-w-3xl mx-auto text-[#2F3E46]">
            Fynsd is designed to make finance simple, modern, and accessible. Through clear guides, practical tools, and a supportive community, we help learners gain confidence in managing their money effectively.
          </p>
        </motion.section>

        {/* Mission - Vision - Community */}
        <section className="grid md:grid-cols-3 gap-10 mb-24">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-white rounded-2xl p-8 border border-[#E7E7E3] hover:border-[#00FF7C] shadow-md hover:shadow-[#00FF7C]/30 transition-transform transform hover:-translate-y-2"
            >
              {item.icon}
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-[#2F3E46]">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Creator / Developer Section */}
        {/* About the Creator Section */}
        <section className="p-5">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-[#0d0f10] to-[#1a1c1f] rounded-3xl p-10 md:p-16 border border-[#00FF7C]/20 shadow-2xl max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 text-white">

            {/* Left: Profile Image */}
            <div className="flex-shrink-0 relative">
              <img
                src="https://avatars.githubusercontent.com/u/000000?v=4" // <-- Yaha apni profile image dalna
                alt="Mohit - Creator of Fynsd"
                className="w-44 h-44 md:w-60 md:h-60 rounded-2xl object-cover shadow-lg border-4 border-[#1a1c1f]"
              />

              {/* Floating Quote Mark */}
              <div className="absolute -top-6 -left-6 text-7xl md:text-8xl text-[#00FF7C]/15 font-serif select-none">
                “
              </div>
            </div>

            {/* Right: Text */}
            <div className="text-center md:text-left max-w-2xl">
              {/* Label */}
              <span className="text-sm uppercase tracking-widest text-[#00FF7C] font-semibold">
                About the Creator
              </span>

              {/* Name */}
              <h3 className="text-3xl md:text-4xl font-bold mt-2 text-white">
                Mohit Dogaya
              </h3>

              {/* Role Line */}
              <p className="text-sm text-gray-400 pt-2 mb-4">
                Full-Stack Developer • Curious Learner
              </p>

              {/* About Description */}
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">
                Hi! I’m <span className="font-semibold text-[#00FF7C]">Mohit</span>, the creator of
                <span className="font-semibold"> Fynsd</span>.
                I started this project to make finance education <i>simple, practical, and enjoyable</i>.
                With a background in technology and a passion for financial literacy, my mission is to
                help learners turn curiosity into clarity, and knowledge into prosperity.
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#00FF7C] to-[#007755] mb-6 rounded-full mx-auto md:mx-0"></div>

              {/* Motivation Line */}
              <p className="text-sm md:text-base text-gray-400">
                Every learner has the potential to master finance — all it takes is the
                right guidance and consistency. Fynsd is built to be that companion in
                your journey of learning and growth. 🚀
              </p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
