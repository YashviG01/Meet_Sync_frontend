import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Video, Monitor, Calendar, Shield, MessageSquare, BarChart2,
  ArrowRight, Globe, Mail, Menu, X
} from "lucide-react";
// import {woman} from "../assets/woman.jpg"
// const Logo = () => (
//   <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0%" stopColor="#8B5CF6" />
//         <stop offset="100%" stopColor="#4338CA" />
//       </linearGradient>
//     </defs>
//     <ellipse cx="50" cy="50" rx="38" ry="38" fill="url(#lg1)" opacity="0.18"/>
//     <ellipse cx="50" cy="50" rx="28" ry="28" fill="url(#lg1)" opacity="0.85"/>
//     <circle cx="50" cy="50" r="12" fill="white" opacity="0.92"/>
//     <path d="M26 26 Q50 12 74 26 Q88 50 74 74 Q50 88 26 74 Q12 50 26 26Z" fill="none" stroke="white" strokeWidth="3.5" opacity="0.65"/>
//   </svg>
// );

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <Video size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      title: "HD Video",
      desc: "Lossless 4K video quality that automatically adjusts to your bandwidth for zero lag.",
    },
    {
      icon: <Monitor size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      title: "Screen Sharing",
      desc: "Low-latency sharing with multiple participants simultaneously for true collaboration.",
    },
    {
      icon: <Calendar size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      title: "Scheduling",
      desc: "Deep integrations with Google Workspace, Outlook, and Slack for effortless planning.",
    },
    {
      icon: <Shield size={22} className="text-red-400" />,
      bg: "bg-red-50",
      title: "Security",
      desc: "End-to-end encryption with SSO, MFA, and compliance standards built into every call.",
    },
    {
      icon: <MessageSquare size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      title: "Instant Chat",
      desc: "Persistent rooms with file sharing, threads, and emojis to keep the conversation going.",
    },
    {
      icon: <BarChart2 size={22} className="text-indigo-400" />,
      bg: "bg-indigo-50",
      title: "Analytics",
      desc: "Insightful reporting on engagement, meeting health, and team productivity trends.",
    },
  ];

  const trustedBy = ["VELOCITY", "QUANTUM", "NEXUS", "PULSE", "ORBIT"];

  return (
    // parent container
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            {/* <Logo /> */}
            <span className="font-bold text-lg text-gray-900">
              <span className="text-gray-900">Meet</span>
              <span className="text-gray-700">Sync</span>
            </span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            <a href="#" className="text-indigo-500 border-b-2 border-indigo-500 pb-0.5">Features</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Enterprise</a>
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Get Started
            </Link>
          </div>
          <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            <a href="#" className="pt-3 text-indigo-500">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Enterprise</a>
            <a href="#">About</a>
            <a href="/login" className="text-gray-600">Log In</a>
            <a href="/signup" className="bg-indigo-500 text-white text-center py-2 rounded-md">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-5">
            Seamless Meetings for a Connected World
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            Experience crystal-clear video conferencing, real-time collaboration tools, and enterprise-grade security.
            MeetSync brings your global team together in a single, fluid workspace.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/signup"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all hover:shadow-md"
            >
              Get Started
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-5 py-3 rounded-lg text-sm transition-all hover:bg-gray-50"
            >
              Learn More <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-md">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-2xl overflow-hidden p-3">
              {/* Fake laptop top bar */}
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              {/* Video grid mock */}
              <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
                {[
                  { bg: "bg-teal-700", label: "Alex M." },
                  { bg: "bg-slate-600", label: "Sara L." },
                  { bg: "bg-indigo-700", label: "James K." },
                  { bg: "bg-slate-500", label: "Priya R." },
                ].map((p, i) => (
                  <div key={i} className={`${p.bg} aspect-video rounded flex flex-col justify-end p-2`}>
                    <span className="text-white text-[10px] font-medium bg-black/30 rounded px-1.5 py-0.5 w-fit">{p.label}</span>
                  </div>
                ))}
              </div>
              {/* Bottom bar */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-pulse" /> LIVE HD
                </div>
                <div className="bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full">SECURE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-gray-100 py-10 bg-gray-50/60">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 mb-6">
          TRUSTED BY FAST-GROWING TEAMS WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 px-5">
          {trustedBy.map((name) => (
            <span key={name} className="text-gray-300 font-bold tracking-widest text-sm">{name}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <p className="text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-3">
            Performance &amp; Tools
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Everything you need for collaboration
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Built for teams that demand excellence, MeetSync provides the most robust set of tools for modern communication.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-4 md:mx-8 lg:mx-16 mb-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to synchronize your team?</h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-10">
          Join over 10,000 teams building the future of remote work with MeetSync's premium video platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/signup"
            className="bg-white text-slate-900 font-semibold px-7 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="#"
            className="border border-white/40 text-white font-semibold px-7 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              {/* <Logo /> */}
              <span className="font-bold text-indigo-600 text-base">MeetSync</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Connecting the world through high-performance, secure, and beautiful video communication tools.
            </p>
          </div>
          {[
            {
              heading: "PRODUCT",
              links: ["Features", "Integrations", "Enterprise", "Solutions"],
            },
            {
              heading: "COMPANY",
              links: ["About", "Careers", "Blog", "Press"],
            },
            {
              heading: "LEGAL",
              links: ["Privacy", "Terms", "Security", "Cookies"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-widest text-gray-900 mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-gray-400 text-sm hover:text-gray-700 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-xs">© 2024 MeetSync Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors"><Globe size={16} /></a>
              {/* <a href="#" className="hover:text-gray-600 transition-colors"><Twitter size={16} /></a> */}
              {/* <a href="#" className="hover:text-gray-600 transition-colors"><Linkedin size={16} /></a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
