export default function SidebarItem({
  icon,
  label,
  active = false,
  collapsed = false,
  danger = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`
        w-full flex items-center gap-3 rounded-lg transition-all duration-150 group relative
        ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
        ${
          active
            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
            : danger
            ? "text-red-500 hover:bg-red-50 hover:text-red-600"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {/* Icon */}
      <span className={`flex-shrink-0 ${active ? "text-white" : ""}`}>
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="text-sm font-medium truncate leading-none">{label}</span>
      )}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div className="
          absolute left-full ml-2.5 px-2.5 py-1.5 bg-gray-900 text-white text-xs
          font-medium rounded-lg whitespace-nowrap z-50 pointer-events-none
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          shadow-lg
        ">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </button>
  );
}
