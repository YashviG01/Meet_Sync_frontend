import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// const Logo = () => (
//   <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <linearGradient id="lg-signup" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0%" stopColor="#8B5CF6" />
//         <stop offset="100%" stopColor="#4338CA" />
//       </linearGradient>
//     </defs>
//     <ellipse cx="50" cy="50" rx="38" ry="38" fill="url(#lg-signup)" opacity="0.18"/>
//     <ellipse cx="50" cy="50" rx="28" ry="28" fill="url(#lg-signup)" opacity="0.85"/>
//     <circle cx="50" cy="50" r="12" fill="white" opacity="0.92"/>
//     <path d="M26 26 Q50 12 74 26 Q88 50 74 74 Q50 88 26 74 Q12 50 26 26Z" fill="none" stroke="white" strokeWidth="3.5" opacity="0.65"/>
//   </svg>
// );

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 48 48">
//     <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.7-6.7C35.7 2.3 30.2 0 24 0 14.8 0 7 5.4 3.2 13.2l7.8 6C12.7 13 17.9 9.5 24 9.5z"/>
//     <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
//     <path fill="#FBBC05" d="M11 28.2c-.7-2-1-4.1-1-6.2s.3-4.2 1-6.2l-7.8-6C1.2 13.6 0 18.7 0 24s1.2 10.4 3.2 14.2l7.8-6z"/>
//     <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.3-7.7 2.3-6.1 0-11.3-3.5-13-8.6l-7.8 6C7 43.6 14.8 48 24 48z"/>
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
//     <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
//   </svg>
// );

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-8 py-4">
        <a href="/" className="flex items-center gap-2">
          {/* <Logo /> */}
          <span className="font-bold text-indigo-600 text-lg">MeetSync</span>
        </a>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
          <div className="w-px h-4 bg-gray-300" />
          <a href="/login" className="font-semibold text-indigo-600">Log In</a>
        </div>
      </nav>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Create your account</h1>
            <p className="text-gray-500 text-sm">Join MeetSync for premium video experiences.</p>
          </div>

          {/* OAuth */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {/* <GoogleIcon /> Google */}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {/* <FacebookIcon /> Facebook */}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium tracking-wider">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            {/* Password + Confirm side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-4 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm</label>
                <div className="relative">
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full pl-4 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
              />
              <span className="text-sm text-gray-600 leading-snug">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </span>
            </label>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-sm transition-all hover:shadow-md mt-1">
              Get Started
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Log In
            </a>
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-400 tracking-wider">
          © 2026 MEETSYNC TECHNOLOGIES. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
