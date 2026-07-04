import useJoinMeeting from "../features/join/hooks/useJoinMeeting";
import JoinMeetingLayout from "../features/join/components/JoinMeetingLayout";

const JoinMeeting = () => {
    const props = useJoinMeeting();

    return <JoinMeetingLayout {...props} />;
};

export default JoinMeeting;