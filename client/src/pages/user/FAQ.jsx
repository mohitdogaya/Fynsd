// src/pages/FAQ.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const categories = [
    {
      title: "Platform Related",
      faqs: [
        { q: "What is Fynsd?", a: "Fynsd is a modern finance learning platform designed to simplify complex financial concepts into clear, actionable knowledge for everyone." },
        { q: "Is Fynsd free to use?", a: "Yes, Fynsd offers free access to many courses, blogs, and notes. Some advanced or premium content may require an upgrade." },
        { q: "Who can use Fynsd?", a: "Anyone interested in finance—from beginners, students, professionals, to entrepreneurs—can use Fynsd to gain clarity in finance." },
        { q: "Do I need prior knowledge of finance?", a: "No. Fynsd is structured from the basics to advanced topics so even beginners can learn with ease." },
        { q: "Do I get certificates after completing a course?", a: "Yes, after completing specific courses and quizzes, you’ll receive a verifiable digital certificate." },
        { q: "How can I track my progress?", a: "Your progress is saved in the 'My Activity' section where you can see completed lessons, quizzes, and achievements." },
        { q: "Can I access Fynsd on mobile?", a: "Yes, Fynsd is fully responsive and works seamlessly on desktops, tablets, and mobile devices." },
        { q: "Does Fynsd support offline learning?", a: "Currently, Fynsd is online-only. However, we are working on downloadable notes for offline access." },
        { q: "How can I give feedback?", a: "You can share feedback via the 'Help & Support' section in your profile or through our contact form." }
      ]
    },
    {
      title: "Learning & Courses",
      faqs: [
        { q: "What topics are covered in Fynsd?", a: "We cover personal finance, investing, budgeting, banking, digital payments, stock markets, mutual funds, cryptocurrency, and more." },
        { q: "Are the courses beginner-friendly?", a: "Yes, courses are structured from fundamentals to advanced levels, making them beginner-friendly." },
        { q: "Do you provide video lectures?", a: "Currently, Fynsd is focused on text-based interactive content, notes, and quizzes. Videos may be added later." },
        { q: "Can I suggest a topic for future courses?", a: "Yes! You can suggest new topics via the feedback section and our team will consider them for upcoming modules." },
        { q: "How are quizzes structured?", a: "Quizzes are multiple-choice and designed to reinforce your understanding after each topic." },
        { q: "Do quizzes affect my certification?", a: "Yes, scoring above a certain threshold is required to unlock your course completion certificate." },
        { q: "Are the courses updated regularly?", a: "Yes, we continuously update our content to reflect new financial trends, tools, and regulatory changes." }
      ]
    },
    {
      title: "Community",
      faqs: [
        { q: "Does Fynsd have a community?", a: "Yes, you can engage with peers through comments, discussions, and shared insights on blogs and articles." },
        { q: "Can I write blogs on Fynsd?", a: "Yes, registered users can contribute articles and insights after review by our content team." },
        { q: "Can I collaborate with other learners?", a: "Yes, you can connect with peers, comment on posts, and share resources within the platform." }
      ]
    },
    {
      title: "Security & Account",
      faqs: [
        { q: "Is my data safe with Fynsd?", a: "Yes, we use modern encryption and secure practices to keep your data safe." },
        { q: "Can I reset my password?", a: "Yes, use the 'Forgot Password' option on the login page to reset your password securely." },
        { q: "Can I delete my account?", a: "Yes, you can request account deletion from your profile settings. All your data will be removed permanently." },
        { q: "Can I use Fynsd without signing up?", a: "You can browse some free resources without signing up, but progress tracking and certifications require an account." }
      ]
    },
    {
      title: "Premium",
      faqs: [
        { q: "What are the benefits of premium membership?", a: "Premium users get access to advanced courses, personalized learning paths, early access to new content, and exclusive certifications." },
        { q: "Is there a trial for premium?", a: "Yes, we offer limited-time free trials so you can explore premium features before subscribing." },
        { q: "Can I cancel my premium subscription?", a: "Yes, you can cancel anytime from your profile’s billing section. Your benefits will remain active until the billing cycle ends." },
        { q: "Is there a student discount?", a: "Yes, we offer student discounts. You can apply by verifying your student ID during registration." }
      ]
    },
    {
      title: "Miscellaneous",
      faqs: [
        { q: "How does Fynsd stand out from other finance platforms?", a: "Fynsd focuses on clarity, simplicity, and real-world application with a learner-first approach rather than overwhelming technical jargon." },
        { q: "Can I use Fynsd for exam preparation?", a: "Yes, Fynsd’s structured notes and quizzes are great for preparing for competitive exams and finance certifications." },
        { q: "What’s the vision of Fynsd?", a: "Our vision is simple: 'From Curious Minds to Clear Futures' — making finance knowledge accessible, practical, and inspiring." }
      ]
    }
  ];

  const [openCategory, setOpenCategory] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="relative min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#F5F5F5] via-[#F0F8F5] to-[#E9DCC9]">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00FF7C]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#007755]/10 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight m-14">
        <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
      </h1>

      {/* Categories */}
      <div className="max-w-4xl mx-auto space-y-6">
        {categories.map((cat, i) => {
          const isCatOpen = openCategory === i;
          return (
            <div key={i} className="border border-[#00FF7C]/30 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-[#2F3E46] hover:bg-[#00FF7C]/5 transition"
                onClick={() => {
                  setOpenCategory(isCatOpen ? null : i);
                  setOpenFAQ(null);
                }}
              >
                {cat.title}
                <ChevronDown
                  className={`w-6 h-6 text-[#007755] transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* FAQs inside category */}
              <div className={`transition-all duration-300 overflow-hidden ${isCatOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="divide-y divide-[#00FF7C]/20">
                  {cat.faqs.map((faq, j) => {
                    const isFAQOpen = openFAQ === `${i}-${j}`;
                    return (
                      <div key={j} className="px-6">
                        <button
                          className="w-full flex justify-between items-center py-4 text-left text-[#2F3E46] font-medium"
                          onClick={() => setOpenFAQ(isFAQOpen ? null : `${i}-${j}`)}
                        >
                          {faq.q}
                          <ChevronDown
                            className={`w-5 h-5 text-[#007755] transition-transform duration-300 ${isFAQOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`pl-2 pb-4 text-sm md:text-base text-[#2F3E46]/80 leading-relaxed transition-all duration-300 overflow-hidden ${
                            isFAQOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
