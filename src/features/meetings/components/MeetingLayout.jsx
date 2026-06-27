// meeting/components/MeetingLayout.jsx

import VideoGrid from "./VideoGrid";
import BottomControls from "./BottomControls";
import ParticipantsSidebar from "./ParticipantsSidebar";
import ChatSidebar from "./ChatSidebar";

/**
 * Top-level layout shell for the meeting room.
 * Composes all panels — video grid, controls, participants, chat.
 * Receives all data and handlers as props from MeetingRoom via useMeeting.
 */
const MeetingLayout = ({
  roomId,
  localVideoRef,
  remoteStreams,
  isMicOn,
  isVideoOn,
  isScreenSharing,
  handleToggleMic,
  handleToggleVideo,
  handleShareScreen,
  participantCount,
  users,
  messages,
  typingUser,
  message,
  handleTyping,
  handleSendMessage,
}) => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {/* Left: video + controls */}
      <div style={{ flex: 1 }}>
        <h1>Meeting Room</h1>
        <h2>Room: {roomId}</h2>

        <VideoGrid
          localVideoRef={localVideoRef}
          remoteStreams={remoteStreams}
        />

        <BottomControls
          isMicOn={isMicOn}
          isVideoOn={isVideoOn}
          isScreenSharing={isScreenSharing}
          onToggleMic={handleToggleMic}
          onToggleVideo={handleToggleVideo}
          onShareScreen={handleShareScreen}
        />
      </div>

      {/* Right: participants + chat */}
      <div style={{ width: 280 }}>
        <ParticipantsSidebar
          participantCount={participantCount}
          users={users}
        />

        <ChatSidebar
          messages={messages}
          typingUser={typingUser}
          message={message}
          onTyping={handleTyping}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MeetingLayout;