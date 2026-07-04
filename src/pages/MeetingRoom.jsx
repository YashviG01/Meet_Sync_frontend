
import useMeeting from "../features/meetings/hooks/useMeeting";
import MeetingLayout from "../features/meetings/components/MeetingLayout";
import { useEffect } from "react";

const MeetingRoom = () => {
  useEffect(() => {
    console.log("MEETING ROOM MOUNTED");
}, []);
  const meetingProps = useMeeting();
// console.log("in the meetingroom.jsx file",meetingProps)
  return <MeetingLayout {...meetingProps} />;
};

export default MeetingRoom;


