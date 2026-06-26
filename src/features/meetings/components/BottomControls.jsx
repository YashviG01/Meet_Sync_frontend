import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageCircle,
  Users,
  PhoneOff,
} from "lucide-react";

const BottomControls = ({
  micOn,
  cameraOn,
  toggleMic,
  toggleCamera,
  shareScreen,
  toggleChat,
  toggleParticipants,
  leaveMeeting,
}) => {
  const Button = ({
    children,
    onClick,
    danger,
  }) => (
    <button
      onClick={onClick}
      className={`
      w-12
      h-12
      rounded-full
      flex
      items-center
      justify-center
      transition
      ${
        danger
          ? "bg-red-600 hover:bg-red-700"
          : "bg-zinc-800 hover:bg-zinc-700"
      }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex justify-center items-center gap-5">

      <Button onClick={toggleMic}>
        {micOn ? (
          <Mic />
        ) : (
          <MicOff />
        )}
      </Button>

      <Button onClick={toggleCamera}>
        {cameraOn ? (
          <Video />
        ) : (
          <VideoOff />
        )}
      </Button>

      <Button onClick={shareScreen}>
        <MonitorUp />
      </Button>

      <Button onClick={toggleChat}>
        <MessageCircle />
      </Button>

      <Button onClick={toggleParticipants}>
        <Users />
      </Button>

      <Button
        danger
        onClick={leaveMeeting}
      >
        <PhoneOff />
      </Button>

    </div>
  );
};

export default BottomControls;