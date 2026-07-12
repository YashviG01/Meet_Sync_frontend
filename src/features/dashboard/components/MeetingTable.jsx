// features/dashboard/components/MeetingsTable.jsx

import MeetingRow from "./MeetingRow";

const COLUMNS = [
  { key: "meeting", label: "Meeting" },
  { key: "host", label: "Host" },
  { key: "time", label: "Time" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function MeetingsTable(
 { meetings,onJoin,onDelete}
) 
{ console.log(meetings)
    console.log(onDelete)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          My Meetings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-500
                  "
                >
                  {column.label}
                </th>
              ))}

            </tr>

          </thead>


{/* <tbody>
  {meetings.map((meeting) => {
    console.log("Key:", meeting._id);
console.log("typeof =", typeof meeting._id);
    return (
      <MeetingRow
        key={meeting._id}
        meeting={meeting}
      />
    );
  })}
</tbody> */}



          <tbody>

            {meetings.map((meeting) => (
              <MeetingRow
                key={meeting._id}
                meeting={meeting}
                onJoin={onJoin}
                 onDelete={onDelete}
              />
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}



// import { useMemo, useState } from "react";
// import {
//   ChevronRight,
//   SlidersHorizontal,
//   Search,
// } from "lucide-react";

// import MeetingRow from "./MeetingRow";
// import EmptyState from "./EmptyState";

// const COLUMNS = [
//   { key: "title", label: "Meeting Title" },
//   { key: "host", label: "Host" },
//   { key: "date", label: "Date" },
//   { key: "time", label: "Time" },
//   { key: "duration", label: "Duration" },
//   { key: "participants", label: "Participants" },
//   { key: "status", label: "Status" },
//   { key: "meetingId", label: "Meeting ID" },
//   { key: "actions", label: "Actions" },
// ];

// const STATUS_MAP = {
//   Upcoming: "scheduled",
//   Ongoing: "active",
//   Completed: "completed",
//   Cancelled: "cancelled",
// };

// const STATUS_FILTERS = [
//   "All",
//   "Upcoming",
//   "Ongoing",
//   "Completed",
//   "Cancelled",
// ];

// export default function MeetingsTable({
//   meetings = [],
//   title = "My Meetings",

//   onJoin,
//   onEdit,
//   onDelete,
// }) {
//   const [filter, setFilter] = useState("All");

//   const [search, setSearch] = useState("");

//   const filteredMeetings = useMemo(() => {
//     return meetings.filter((meeting) => {
//       const statusMatch =
//         filter === "All"
//           ? true
//           : meeting.status === STATUS_MAP[filter];

//       const query = search.trim().toLowerCase();

//       const searchMatch =
//         !query ||
//         meeting.title.toLowerCase().includes(query) ||
//         meeting.organizer.name.toLowerCase().includes(query) ||
//         meeting.roomId.toLowerCase().includes(query);

//       return statusMatch && searchMatch;
//     });
//   }, [meetings, filter, search]);

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

//       {/* Toolbar */}

//       <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">

//         <h2 className="text-base font-bold text-gray-900">
//           {title}
//         </h2>

//         <div className="ml-auto flex flex-wrap items-center gap-2">

//           {/* Search */}

//           <div className="relative">

//             <Search
//               size={13}
//               className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               type="text"
//               placeholder="Search meetings..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="
//                 w-44
//                 rounded-lg
//                 border
//                 border-gray-200
//                 bg-gray-50
//                 py-1.5
//                 pl-8
//                 pr-3
//                 text-xs
//                 text-gray-700
//                 placeholder-gray-400
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-indigo-300
//               "
//             />

//           </div>

//           {/* Filters */}

//           <div className="flex items-center gap-1">

//             {STATUS_FILTERS.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setFilter(item)}
//                 className={`
//                   rounded-lg
//                   px-2.5
//                   py-1
//                   text-[11px]
//                   font-semibold
//                   transition-all

//                   ${
//                     filter === item
//                       ? "bg-indigo-600 text-white"
//                       : "text-gray-500 hover:bg-gray-100"
//                   }
//                 `}
//               >
//                 {item}
//               </button>
//             ))}

//           </div>

//           <button
//             className="
//               flex
//               items-center
//               gap-1
//               rounded-lg
//               border
//               border-gray-200
//               px-2.5
//               py-1.5
//               text-xs
//               text-gray-500
//               hover:bg-gray-50
//             "
//           >
//             <SlidersHorizontal size={13} />
//             Filter
//           </button>

//           <button
//             className="
//               flex
//               items-center
//               gap-1
//               text-xs
//               font-medium
//               text-indigo-600
//             "
//           >
//             View All
//             <ChevronRight size={14} />
//           </button>

//         </div>

//       </div>

//       {/* Table */}

//       <div className="overflow-x-auto">

//         <table className="w-full">

//           <thead className="sticky top-0 bg-gray-50">

//             <tr>

//               {COLUMNS.map((column) => (
//                 <th
//                   key={column.key}
//                   className="
//                     whitespace-nowrap
//                     px-5
//                     py-3
//                     text-left
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-widest
//                     text-gray-400
//                   "
//                 >
//                   {column.label}
//                 </th>
//               ))}

//             </tr>

//           </thead>

//           <tbody className="divide-y divide-gray-50">

//             {filteredMeetings.length === 0 ? (
//               <EmptyState
//                 title="No meetings found"
//                 description="Try changing the filters or search keyword."
//               />
//             ) : (
//               filteredMeetings.map((meeting, index) => (
//                 <MeetingRow
//                   key={meeting.id}
//                   meeting={meeting}
//                   isOdd={index % 2 === 0}
//                   onJoin={onJoin}
//                   onEdit={onEdit}
//                   onDelete={onDelete}
//                 />
//               ))
//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* Footer */}

//       {filteredMeetings.length > 0 && (
//         <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">

//           <p className="text-xs text-gray-500">

//             Showing{" "}

//             <span className="font-semibold text-gray-700">
//               {filteredMeetings.length}
//             </span>

//             {" "}of{" "}

//             <span className="font-semibold text-gray-700">
//               {meetings.length}
//             </span>

//             {" "}meetings

//           </p>

//           <div className="flex gap-1">

//             {[1, 2, 3].map((page) => (
//               <button
//                 key={page}
//                 className={`
//                   h-7
//                   w-7
//                   rounded-lg
//                   text-xs

//                   ${
//                     page === 1
//                       ? "bg-indigo-600 text-white"
//                       : "text-gray-500 hover:bg-gray-100"
//                   }
//                 `}
//               >
//                 {page}
//               </button>
//             ))}

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }