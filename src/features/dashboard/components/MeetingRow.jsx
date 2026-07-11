import MeetingStatusBadge from "./MeetingStatusBadge";
import MeetingActions from "./MeetingActions";

const formatDate = (date) =>
  new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function MeetingRow({
  meeting,
  onJoin,
  onEdit,
  onDelete,
}) {
  const {
    title,
    organizer,
    startTime,
    status,
    isHost,
    roomId,
  } = meeting;

  return (
    <tr
      className="
        border-b
        border-gray-100
        transition-colors
        hover:bg-indigo-50/30
      "
    >
      {/* Meeting */}

      <td className="px-6 py-5 min-w-[260px]">

        <div className="flex flex-col">

          <span className="text-sm font-semibold text-gray-900">
            {title}
          </span>

        </div>

      </td>

      {/* Host */}

      <td className="px-6 py-5 min-w-[170px]">

        <div className="flex flex-col">

          <span className="text-sm font-medium text-gray-800">
            {organizer?.name}
          </span>

          <span className="mt-1 text-xs text-gray-400">
            {isHost ? "Organizer • You" : "Organizer"}
          </span>

        </div>

      </td>

      {/* Time */}

      <td className="px-6 py-5 min-w-[180px]">

        <div className="flex flex-col">

          <span className="text-sm font-medium text-gray-800">
            {formatTime(startTime)}
          </span>

          <span className="mt-1 text-xs text-gray-500">
            {formatDate(startTime)}
          </span>

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-5 min-w-[140px]">

        <MeetingStatusBadge
          status={status}
        />

      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <MeetingActions
          roomId={roomId}
          status={status}
          isHost={isHost}
          onJoin={onJoin}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
}