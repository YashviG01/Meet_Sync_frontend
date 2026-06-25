import { Copy } from "lucide-react";
// import Avatar from "../../../components/ui/Avatar";
// import { AvatarGroup } from "../../../components/ui/Avatar";
import MeetingStatusBadge from "./MeetingStatusBadge";
import MeetingActions from "./MeetingActions";

export default function MeetingRow({ meeting, onJoin, onEdit, onDelete, isOdd }) {
  const {
    id, title, subtitle, host, participants, extra,
    date, time, duration, status, meetingId,
  } = meeting;

  const copyId = () => navigator.clipboard?.writeText(meetingId);

  return (
    <tr
      className={`
        group transition-colors duration-100
        ${isOdd ? "bg-white" : "bg-gray-50/50"}
        hover:bg-indigo-50/30
      `}
    >
      {/* Title */}
      <td className="px-5 py-3.5 min-w-[180px]">
        <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-700 transition-colors">
          {title}
        </p>
        {subtitle && (
          <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{subtitle}</p>
        )}
      </td>

      {/* Host */}
      <td className="px-5 py-3.5 min-w-[140px]">
        <div className="flex items-center gap-2">
          {/* <Avatar name={host.name} size="sm" /> */}
          <span className="text-xs text-gray-700 font-medium truncate max-w-[110px]">{host.name}</span>
        </div>
      </td>

      {/* Date */}
      <td className="px-5 py-3.5 min-w-[110px]">
        <span className="text-xs text-gray-600">{date}</span>
      </td>

      {/* Time */}
      <td className="px-5 py-3.5 min-w-[130px]">
        <span className="text-xs text-gray-600 leading-tight whitespace-nowrap">{time}</span>
      </td>

      {/* Duration */}
      <td className="px-5 py-3.5 min-w-[80px]">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
          {duration}
        </span>
      </td>

      {/* Participants */}
      <td className="px-5 py-3.5 min-w-[100px]">
        <div className="flex items-center gap-2">
          {/* <AvatarGroup
            people={participants}
            max={3}
            size="sm"
          /> */}
          {extra > 0 && (
            <span className="text-[10px] text-gray-400">+{extra}</span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5 min-w-[110px]">
        <MeetingStatusBadge status={status} />
      </td>

      {/* Meeting ID */}
      <td className="px-5 py-3.5 min-w-[130px]">
        <div className="flex items-center gap-1.5 group/id">
          <span className="text-xs text-gray-400 font-mono">{meetingId}</span>
          <button
            onClick={copyId}
            title="Copy ID"
            className="opacity-0 group-hover/id:opacity-100 transition-opacity text-gray-400 hover:text-indigo-500"
          >
            <Copy size={11} />
          </button>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5 min-w-[110px]">
        <MeetingActions
          status={status}
          meetingId={id}
          onJoin={onJoin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
