import MeetingTable from "./MeetingTable";
import EmptyState from "./EmptyState";
import useJoinMeeting from "../hooks/useJoinMeeting";
import useDeleteMeeting from "../hooks/useDeleteMeeting";
export default function MyMeetingsSection({
  meetings,
  loading,
  error,
    fetchMeetings
}) {
    const { joinMeetingDashboard } = useJoinMeeting();
    const { deleteMeeting } =
    useDeleteMeeting(fetchMeetings);
    console.log(deleteMeeting)
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-500">
          Loading meetings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <p className="text-sm text-red-500">
          Failed to load meetings.
        </p>
      </div>
    );
  }

  if (meetings.length === 0) {
    return <EmptyState />;
  }

  return (
    <MeetingTable meetings={meetings}
                  onJoin={joinMeetingDashboard}
                  onDelete={deleteMeeting} />
  );
}