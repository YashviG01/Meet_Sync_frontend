import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogout from "../../auth/hooks/useLogout"
import {
  LayoutDashboard, Video, CalendarPlus, LogIn, History,
  User, Settings, LogOut, ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
// import MeetSyncLogo from "../../../components/ui/MeetSyncLogo";
import SidebarItem from "./SidebarItem";

const NAV_ITEMS = [
  { key: "dashboard",        label: "Dashboard",        icon: <LayoutDashboard size={18} /> },
  { key: "meetings",         label: "Meetings",          icon: <Video size={18} /> },
  { key: "schedule-meeting", label: "Schedule Meeting",  icon: <CalendarPlus size={18} /> },
  { key: "join-meeting",     label: "Join Meeting",      icon: <LogIn size={18} /> },
  { key: "history",          label: "History",           icon: <History size={18} /> },
];

const BOTTOM_ITEMS = [
  { key: "profile",  label: "Profile",  icon: <User size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ activePage = "dashboard", onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

   const navigate = useNavigate();

  const { logout } = useLogout();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <aside
      className={`
        relative flex flex-col bg-white border-r border-gray-100
        h-full flex-shrink-0 transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-56"}
      `}
    >
      <div
        className={`
          flex items-center border-b border-gray-100 flex-shrink-0
          ${collapsed ? "justify-center px-0 py-4" : "px-4 py-4 gap-2"}
        `}
      >
        {/* <MeetSyncLogo size={26} showText={!collapsed} textClass="text-base" /> */}
        {!collapsed && (
          <span className="ml-auto text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
            Pro
          </span>
        )}
      </div>

      <nav className={`flex-1 overflow-y-auto py-3 space-y-0.5 ${collapsed ? "px-2" : "px-2"}`}>
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activePage === item.key}
            collapsed={collapsed}
            onClick={() => navigate(item.key)}
          />
        ))}
      </nav>

      {/* ── Start Meeting CTA ───────────────────────────────────── */}
      {/* <div className={`px-2 pb-3 ${collapsed ? "" : ""}`}>
        {collapsed ? (
          <button
            title="Start Instant Meeting"
            className="w-full flex items-center justify-center py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            onClick={() => navigate("instant")}
          >
            <Zap size={18} />
          </button>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            onClick={() => navigate("instant")}
          >
            <Zap size={15} />
            Start Instant
          </button>
        )}
      </div> */}

      {/* ── Bottom ─────────────────────────────────────────────── */}
      <div className={`border-t border-gray-100 py-3 space-y-0.5 ${collapsed ? "px-2" : "px-2"}`}>
        {BOTTOM_ITEMS.map((item) => (
          <SidebarItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activePage === item.key}
            collapsed={collapsed}
            onClick={() => navigate(item.key)}
          />
        ))}
        <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          collapsed={collapsed}
          danger
          onClick={handleLogout}
        />
      </div>




      {/* ── Collapse toggle ─────────────────────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-[72px] z-10
          w-6 h-6 rounded-full bg-white border border-gray-200
          flex items-center justify-center
          shadow-sm hover:shadow-md hover:border-indigo-300
          text-gray-400 hover:text-indigo-600
          transition-all duration-150
        "
      >
        {collapsed
          ? <ChevronRight size={13} />
          : <ChevronLeft size={13} />
        }
      </button>
    </aside>
  );
}
