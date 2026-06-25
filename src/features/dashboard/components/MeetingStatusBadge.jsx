const CONFIG = {
  UPCOMING:  {
    dot:  "bg-blue-500",
    chip: "bg-blue-50 text-blue-700 border-blue-200",
  },
  ONGOING:   {
    dot:  "bg-green-500 animate-pulse",
    chip: "bg-green-50 text-green-700 border-green-200",
  },
  COMPLETED: {
    dot:  "bg-gray-400",
    chip: "bg-gray-100 text-gray-600 border-gray-200",
  },
  CANCELLED: {
    dot:  "bg-red-400",
    chip: "bg-red-50 text-red-600 border-red-200",
  },
};

export default function MeetingStatusBadge({ status = "UPCOMING" }) {
  const c = CONFIG[status] ?? CONFIG.UPCOMING;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        text-[10px] font-semibold uppercase tracking-wider border
        ${c.chip}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
