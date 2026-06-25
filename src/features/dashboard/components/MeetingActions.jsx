import { LogIn, Pencil, Trash2 } from "lucide-react";

export default function MeetingActions({ status, meetingId, onJoin, onEdit, onDelete }) {
  const canJoin = status === "UPCOMING" || status === "ONGOING";

  return (
    <div className="flex items-center gap-1">
      {/* Join */}
      <button
        onClick={() => onJoin?.(meetingId)}
        disabled={!canJoin}
        title="Join Meeting"
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center transition-all
          ${canJoin
            ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-sm"
            : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        <LogIn size={14} />
      </button>

      {/* Edit */}
      <button
        onClick={() => onEdit?.(meetingId)}
        title="Edit Meeting"
        className="
          w-8 h-8 rounded-lg flex items-center justify-center transition-all
          bg-gray-50 text-gray-400 hover:bg-amber-50 hover:text-amber-600
        "
      >
        <Pencil size={14} />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete?.(meetingId)}
        title="Delete Meeting"
        className="
          w-8 h-8 rounded-lg flex items-center justify-center transition-all
          bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500
        "
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
