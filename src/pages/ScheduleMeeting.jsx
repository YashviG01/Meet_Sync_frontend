// import useScheduleMeeting from "../../features/scheduling/hooks/useScheduleMeeting";

// import ScheduleMeetingLayout from "../../features/scheduling/components/ScheduleMeetingLayout";


import useScheduleMeeting from "../features/scheduleMeeting/hooks/useScheduleMeeting";
import ScheduleMeetingLayout from "../features/scheduleMeeting/components/scheduleMeetingLayout";

const ScheduleMeeting = () => {
  const scheduleProps =
    useScheduleMeeting();

  return (
    <ScheduleMeetingLayout
      {...scheduleProps}
    />
  );
};

export default ScheduleMeeting;