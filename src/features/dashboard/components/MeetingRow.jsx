// MeetingRow.jsx

import { Copy } from "lucide-react";
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

const getDuration = (start, end) => {
  const minutes =
    Math.floor(
      (new Date(end) - new Date(start)) /
        60000
    );

  if (minutes < 60) return `${minutes} min`;

  const hrs = Math.floor(minutes / 60);

  const mins = minutes % 60;

  return mins
    ? `${hrs}h ${mins}m`
    : `${hrs}h`;
};

export default function MeetingRow({
  meeting,
  onJoin,
  onEdit,
  onDelete,
  isOdd,
}) {
  const {
    id,
    roomId,
    title,
    description,
    organizer,
    participantCount,
    startTime,
    endTime,
    status,
    isHost,
  } = meeting;

  const copyMeetingId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr
      className={`
        transition-colors
        ${isOdd ? "bg-white" : "bg-gray-50/50"}
        hover:bg-indigo-50/40
      `}
    >
      {/* Meeting */}

      <td className="px-5 py-4 min-w-[220px]">

        <p className="font-semibold text-gray-900">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {description || "No description"}
        </p>

      </td>

      {/* Organizer */}

      <td className="px-5 py-4">

        <p className="text-sm font-medium text-gray-700">
          {organizer.name}
        </p>

        <p className="text-xs text-gray-400">
          {isHost ? "You" : "Host"}
        </p>

      </td>

      {/* Date */}

      <td className="px-5 py-4 text-sm text-gray-600">
        {formatDate(startTime)}
      </td>

      {/* Time */}

      <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">

        {formatTime(startTime)}

        {" - "}

        {formatTime(endTime)}

      </td>

      {/* Duration */}

      <td className="px-5 py-4">

        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">

          {getDuration(startTime, endTime)}

        </span>

      </td>

      {/* Participants */}

      <td className="px-5 py-4">

        <span className="text-sm text-gray-600">

          {participantCount}

        </span>

      </td>

      {/* Status */}

      <td className="px-5 py-4">

        <MeetingStatusBadge
          status={status}
        />

      </td>

      {/* Meeting ID */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-2">

          <span className="font-mono text-xs text-gray-500">

            {roomId}

          </span>

          <button
            onClick={copyMeetingId}
            className="text-gray-400 hover:text-indigo-600"
          >
            <Copy size={13} />
          </button>

        </div>

      </td>

      {/* Actions */}

      <td className="px-5 py-4">

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




// import { Copy } from "lucide-react";
// // import Avatar from "../../../components/ui/Avatar";
// // import { AvatarGroup } from "../../../components/ui/Avatar";
// import MeetingStatusBadge from "./MeetingStatusBadge";
// import MeetingActions from "./MeetingActions";

// export default function MeetingRow({ meeting, onJoin, onEdit, onDelete, isOdd }) {
//   const {
//     id,
//     title,
//     description,
//     organizer,
//     participants,
//     participantCount,
//     startTime,
//     endTime,
//     status,
//     meetingId,
//     isHost,
//   } = meeting;

//   const copyId = () => navigator.clipboard?.writeText(meetingId);

// const durationInMinutes =
//     Math.floor(
//         (new Date(endTime)-new Date(startTime))
//         /(1000*60)
//     );

//   return (
//     <tr
//       className={`
//         group transition-colors duration-100
//         ${isOdd ? "bg-white" : "bg-gray-50/50"}
//         hover:bg-indigo-50/30
//       `}
//     >
//       {/* Title */}
//       <td className="px-5 py-3.5 min-w-[180px]">
//         <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-700 transition-colors">
//           {title}
//         </p>
//         {description && (
//           <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{description || "No description"}</p>
//         )}
//       </td>

//       {/* Host */}
//       <td className="px-5 py-3.5 min-w-[140px]">
//         <div className="flex items-center gap-2">
//           {/* <Avatar name={organizer.name} size="sm" /> */}
//           <span className="text-xs text-gray-700 font-medium truncate max-w-[110px]">{organizer.name}</span>
//         </div>
//       </td>

//       {/* Date */}
//       <td className="px-5 py-3.5 min-w-[110px]">
//         <span className="text-xs text-gray-600">{new Date(startTime).toLocaleDateString()}</span>
//       </td>

//       {/* Time */}
//       <td className="px-5 py-3.5 min-w-[130px]">
//         <span className="text-xs text-gray-600 leading-tight whitespace-nowrap">{new Date(startTime).toLocaleTimeString([],{
//     hour:"2-digit",
//     minute:"2-digit",
// })}</span>
//       </td>

//       {/* Duration */}
//       <td className="px-5 py-3.5 min-w-[80px]">
//         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
//           {durationInMinutes}
//         </span>
//       </td>

//       {/* Participants */}
//       <td className="px-5 py-3.5 min-w-[100px]">
//         <div className="flex items-center gap-2">
//           {/* <AvatarGroup
//             people={participants}
//             max={3}
//             size="sm"
//           /> */}
//           {participantCount > 0 && (
//             <span className="text-[10px] text-gray-400">+{participantCount}</span>
//           )}
//         </div>
//       </td>

//       {/* Status */}
//       <td className="px-5 py-3.5 min-w-[110px]">
//         <MeetingStatusBadge status={status} />
//       </td>

//       {/* Meeting ID */}
//       <td className="px-5 py-3.5 min-w-[130px]">
//         <div className="flex items-center gap-1.5 group/id">
//           <span className="text-xs text-gray-400 font-mono">{meetingId}</span>
//           <button
//             onClick={copyId}
//             title="Copy ID"
//             className="opacity-0 group-hover/id:opacity-100 transition-opacity text-gray-400 hover:text-indigo-500"
//           >
//             <Copy size={11} />
//           </button>
//         </div>
//       </td>

//       {/* Actions */}
//       <td className="px-5 py-3.5 min-w-[110px]">
//         <MeetingActions
//           status={status}
//           meetingId={id}
//           onJoin={onJoin}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       </td>
//     </tr>
//   );
// }
