import { useState } from "react";
import { Search, Bell, ChevronDown, Settings } from "lucide-react";

export default function DashboardHeader({ user = { name: "Sarah Johnson", plan: "Premium" } }) {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 flex-shrink-0 z-10">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search meetings, people, topics…"
          className="
            w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl
            text-sm text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
            transition-all
          "
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Settings shortcut */}
        <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <Settings size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* User chip */}
        <button className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors group">
          {/* <Avatar name={user.name} size="lg" /> */}
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-tight">{user.name}</p>
            <p className="text-[10px] text-gray-400 leading-tight">{user.plan}</p>
          </div>
          <ChevronDown size={13} className="text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
