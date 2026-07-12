import { useState } from "react";
import { CalendarPlus, Zap, LogIn } from "lucide-react";
import Sidebar from "../features/dashboard/components/Sidebar";
import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import MyMeetingsSection  from "../features/dashboard/components/MyMeetingsSection";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import  useStartInstantMeeting 
from "../features/meetings/hooks/useStartInstantMeeting";
// import StatsGrid from "../features/dashboard/components/StatsGrid";
// import MeetingsTable from "../features/dashboard/components/MeetingTable"

// ── Mock meetings dataset ────────────────────────────────────────────
// const MEETINGS = [
//   {
//     id: 1,
//     title: "Design Sync: Q3 Planning",
//     subtitle: "Project #4-421",
//     host: { name: "Alex Rivers" },
//     participants: [
//       { name: "Anna K" },
//       { name: "Bob M" },
//       { name: "Carl D" },
//       { name: "Diana S" },
//     ],
//     extra: 4,
//     date: "Jul 14, 2025",
//     time: "10:00 – 11:30 AM",
//     duration: "90 min",
//     status: "ONGOING",
//     meetingId: "MSY-8821",
//   },
//   {
//     id: 2,
//     title: "Engineering Standup",
//     subtitle: "Daily Team Ritual",
//     host: { name: "Sarah Chen" },
//     participants: [
//       { name: "Dan R" },
//       { name: "Eva S" },
//     ],
//     extra: 0,
//     date: "Jul 14, 2025",
//     time: "02:00 – 02:30 PM",
//     duration: "30 min",
//     status: "UPCOMING",
//     meetingId: "MSY-4432",
//   },
//   {
//     id: 3,
//     title: "Weekly Sales Briefing",
//     subtitle: "Global Sales Team",
//     host: { name: "Marcus Thorne" },
//     participants: [
//       { name: "Fay A" },
//       { name: "Gil B" },
//       { name: "Hana C" },
//     ],
//     extra: 26,
//     date: "Jul 14, 2025",
//     time: "04:30 – 05:00 PM",
//     duration: "30 min",
//     status: "UPCOMING",
//     meetingId: "MSY-9901",
//   },
//   {
//     id: 4,
//     title: "Product Roadmap Review",
//     subtitle: "Q3 Planning Session",
//     host: { name: "Lena Park" },
//     participants: [
//       { name: "Mike N" },
//       { name: "Priya O" },
//     ],
//     extra: 2,
//     date: "Jul 13, 2025",
//     time: "01:00 – 02:00 PM",
//     duration: "60 min",
//     status: "COMPLETED",
//     meetingId: "MSY-7710",
//   },
//   {
//     id: 5,
//     title: "Client Onboarding — Acme",
//     subtitle: "Enterprise Client",
//     host: { name: "James Wu" },
//     participants: [
//       { name: "Rosa T" },
//     ],
//     extra: 0,
//     date: "Jul 12, 2025",
//     time: "09:00 – 09:30 AM",
//     duration: "30 min",
//     status: "CANCELLED",
//     meetingId: "MSY-5532",
//   },
// ];
import useMyMeetings from "../features/dashboard/hooks/useMyMeetings";
export default function Dashboard({ onNavigate }) {
  const [activePage, setActivePage] = useState("dashboard");
const navigate = useNavigate();
const {
    meetings,
    loading,
    error,
    fetchMeetings
} = useMyMeetings();

console.log("fetch meetings type",typeof fetchMeetings)
const {
    createMeeting,
    // loading
} = useStartInstantMeeting();


  const handleNavigate = (key) => {
    setActivePage(key);
    if (onNavigate) onNavigate(key);
  };
const handleStartInstant =
async () => {

    const result =
    await createMeeting();

    if(result.success){

        toast.success(
            "Meeting created!"
        );
console.log(result.meeting.roomId)
        navigate(
            `/meeting/${result.meeting.roomId}`
        );

    }

    else{

        toast.error(
            result.message
        );

    }

};

//join button
const handleJoinClick = () => {
    navigate("/join");
};
const handleScheduleClick = () => {
    navigate("/scheduleMeeting");
};
//   const handleJoin = (id) => {
//     console.log("Join meeting:", id);
//     handleNavigate("waiting-lobby");
//   };

//   const handleEdit = (id) => console.log("Edit meeting:", id);
//   const handleDelete = (id) => console.log("Delete meeting:", id);

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <DashboardHeader
          user={{ name: "#", plan: "Premium Plan" }}
        />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
{/* dashboard top bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                You have <span className="font-semibold text-indigo-600">#meetings</span> scheduled for today.
              </p>
            </div>


{/* meeting actions */}
            <div className="flex items-center gap-2 flex-wrap">

                {/* schedule */}
              <button
                onClick={handleScheduleClick}
                className="
                  flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                  text-white text-sm font-semibold px-4 py-2.5 rounded-xl
                  transition-all shadow-sm hover:shadow-md hover:shadow-indigo-200
                  active:scale-[0.98]
                "
              >
                <CalendarPlus size={16} />
                Schedule
              </button>




{/* start meeting */}
              <button
                onClick={handleStartInstant}  disabled={loading}
                className="
                  flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500
                  hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold
                  px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md
                  hover:shadow-orange-200 active:scale-[0.98]
                "
              >
                <Zap size={16} />
              {
loading
?
"Creating..."
:
"Start Instant"
}










              </button>



{/* join button */}
              <button
                onClick= {handleJoinClick}
                className="
                  flex items-center gap-2 border border-gray-200 bg-white
                  hover:bg-gray-50 hover:border-gray-300 text-gray-700 text-sm font-semibold
                  px-4 py-2.5 rounded-xl transition-all active:scale-[0.98]
                "
              >
                <LogIn size={16} />
                Join
              </button>
            </div>
          </div>

          {/* ── Stats ─────────────────────────────────────────── */}
          {/* <div className="mb-6">
            <StatsGrid />
          </div> */}


{/* my meetings section */}
      <MyMeetingsSection
    meetings={meetings}
    loading={loading}
    error={error}
    fetchMeetings={fetchMeetings}
/>


        </main>
      </div>
    </div>
  );
}
