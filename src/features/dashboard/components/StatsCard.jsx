export default function StatsCard({
  icon,
  title,
  count,
  secondary,
  accent = "indigo",
  trend,         // "+12%" | "-2" etc.
  trendUp,       // boolean
}) {
  const accentMap = {
    indigo: {
      icon:  "bg-indigo-50 text-indigo-600",
      bar:   "bg-indigo-500",
      badge: trendUp
        ? "bg-green-50 text-green-600"
        : "bg-red-50 text-red-500",
    },
    blue: {
      icon:  "bg-blue-50 text-blue-600",
      bar:   "bg-blue-500",
      badge: "bg-blue-50 text-blue-600",
    },
    green: {
      icon:  "bg-green-50 text-green-600",
      bar:   "bg-green-500",
      badge: "bg-green-50 text-green-600",
    },
    red: {
      icon:  "bg-red-50 text-red-500",
      bar:   "bg-red-400",
      badge: "bg-red-50 text-red-500",
    },
  };

  const c = accentMap[accent] ?? accentMap.indigo;

  return (
    <div className="
      flex-1 min-w-0 bg-white rounded-2xl border border-gray-100
      shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5
      p-5 flex flex-col gap-3 overflow-hidden relative
    ">
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.bar} rounded-t-2xl`} />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
            {trend}
          </span>
        )}
      </div>

      {/* Count */}
      <div>
        <p className="text-3xl font-bold text-gray-900 leading-none tracking-tight">{count}</p>
        <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wide">{title}</p>
      </div>

      {/* Secondary */}
      {secondary && (
        <p className="text-[11px] text-gray-400 leading-tight -mt-1">{secondary}</p>
      )}
    </div>
  );
}
