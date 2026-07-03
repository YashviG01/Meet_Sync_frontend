// meeting/components/MeetingLayout.jsx

import VideoGrid from "./VideoGrid";
import BottomControls from "./BottomControls";
import ParticipantsSidebar from "./ParticipantsSidebar";
import ChatSidebar from "./ChatSidebar";
// import Header from "./Header";


//  Composes all panels — video grid, controls, participants, chat.
  // Receives all data and handlers as props from MeetingRoom via useMeeting.

const MeetingLayout = ({
  //room
  roomId,
   // Local user (from authStore — pass currentUser.name from useMeeting)
  localUserName,
  //video
  localVideoRef,
  remoteStreams,
  //media
  isMicOn,
  isVideoOn,
  isScreenSharing,
  //media handlers
  handleToggleMic,
  handleToggleVideo,
  handleShareScreen,
  //participants
  participantCount,
  users,
  participants,
  //chat
  messages,
  typingUser,
  message,//draft
  handleTyping,
  handleSendMessage,

  //ui apnel state
   activePanel,
  isHandRaised,
  search,
  handleToggleChat,
  handleToggleParticipants,
  handleToggleHand,
  handleSearchChange,
  //leavemeeting
  handleLeaveMeeting
}) => {
// console.log("participants in the meeting layout",participants)
  // console.log("users",users)
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0d0f18]">
      {/* ── Header ── */}
      {/* <Header
        roomId={roomId}
        meetingName="Weekly Product Sync"
        participantCount={participantCount}
        isRecording
      /> */}
 
      {/* ── Body ── */}
      <div className="relative flex flex-1 overflow-hidden">
 
        {/* ── Video area ── */}
        <div className="relative flex-1 overflow-hidden p-3 pb-[76px]">
          <VideoGrid
            localVideoRef={localVideoRef}
            localUserName={localUserName}
            isMicOn={isMicOn}
            remoteStreams={remoteStreams}
            users={users}
          />
 
          <BottomControls
            isMicOn={isMicOn}
            isVideoOn={isVideoOn}
            isScreenSharing={isScreenSharing}
            isHandRaised={isHandRaised}
            isChatOpen={activePanel === "chat"}
            isParticipantsOpen={activePanel === "participants"}
            onToggleMic={handleToggleMic}
            onToggleVideo={handleToggleVideo}
            onToggleScreenShare={handleShareScreen}
            onToggleHand={handleToggleHand}
            onToggleChat={handleToggleChat}
            onToggleParticipants={handleToggleParticipants}
             onLeave={handleLeaveMeeting}
            // onLeave={() => window.history.back()}
          />
        </div>
 
        {/* ── Right panel — only one open at a time ── */}
        <ChatSidebar
          isOpen={activePanel === "chat"}
          onClose={handleToggleChat}
          messages={messages}
          draft={message}
          onDraftChange={handleTyping}
          onSend={handleSendMessage}
          typingUser={typingUser}
        />
 
        <ParticipantsSidebar
          isOpen={activePanel === "participants"}
          onClose={handleToggleParticipants}
          users={users}
          participants={participants}
          participantCount={participantCount}
          search={search}
          onSearchChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default MeetingLayout;