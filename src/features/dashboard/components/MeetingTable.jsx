import { useState } from "react";
import { ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import MeetingRow from "./MeetingRow";
import EmptyState from "./EmptyState";

const COLUMNS = [
  { key: "title",        label: "Meeting Title" },
  { key: "host",         label: "Host" },
  { key: "date",         label: "Date" },
  { key: "time",         label: "Time" },
  { key: "duration",     label: "Duration" },
  { key: "participants", label: "Participants" },
  { key: "status",       label: "Status" },
  { key: "meetingId",    label: "Meeting ID" },
  { key: "actions",      label: "Actions" },
];

const STATUS_FILTERS = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"];

export default function MeetingsTable({
  meetings = [],
  title = "Upcoming Meetings",
  onJoin,
  onEdit,
  onDelete,
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = meetings.filter((m) => {
    const matchStatus =
      filter === "All" || m.status.toLowerCase() === filter.toLowerCase();
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.host.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Table toolbar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>

        <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-36"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`
                  px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all
                  ${filter === s
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={12} /> Filter
          </button>

          <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View All <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Sticky header */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 border-b border-gray-100">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <EmptyState
                title="No meetings found"
                description="Try adjusting your filter or search query."
              />
            ) : (
              filtered.map((m, idx) => (
                <MeetingRow
                  key={m.id}
                  meeting={m}
                  isOdd={idx % 2 === 0}
                  onJoin={onJoin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      {filtered.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
            <span className="font-semibold text-gray-600">{meetings.length}</span> meetings
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  p === 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
