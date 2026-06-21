import { useState } from "react";

const JoinMeeting = () => {
  const [meetingId, setMeetingId] =
    useState("");

  return (
    <div>
      <h1>Join Meeting</h1>

      <input
        value={meetingId}
        onChange={(e) =>
          setMeetingId(e.target.value)
        }
      />
    </div>
  );
};

export default JoinMeeting;