// meeting/engine/meetingEngine.js

import { createPeerConnection as createPeer } from "./peerConnection";
import { startVideo, toggleMic, toggleVideo, shareScreen } from "./media";
import { registerSocketEvents } from "./socketEvents";

/**
 * Creates the meeting engine — a factory that orchestrates WebRTC,
 * media, socket, and chat logic. Returns an object with lifecycle
 * methods and all control handlers.
 *
 * No React hooks here — all refs and setters are passed in from useMeeting.
 */
export const createMeetingEngine = ({
  socket,
  roomId,
  currentUser,
  peerConnections,
  localStreamRef,
  screenStreamRef,
  localVideoRef,
  setRemoteStreams,
  setMessages,
  setUsers,
  setParticipantCount,
  setTypingUser,
  setIsMicOn,
  setIsVideoOn,
  setIsScreenSharing,
}) => {
  // Internal peer connection wrapper — closes over shared refs
  // so socket event handlers don't need to pass dep objects every call
  const handleCreatePeerConnection = (targetSocketId) =>
    createPeer(targetSocketId, {
      peerConnections,
      localStreamRef,
      socket,
      setRemoteStreams,
    });

  // --- Lifecycle ---

  /**
   * Acquires media, attaches to local video element,
   * connects socket, and emits join-room.
   * Maps to Effect 1 in MeetingRoom.
   */
  const initialize = async () => {
    await startVideo({
      localStreamRef,
      localVideoRef,
      socket,
      roomId,
      currentUser,
    });
  };

  /**
   * Registers all socket event listeners.
   * Returns a cleanup function — pass directly as the return
   * value of useEffect.
   * Maps to Effect 2 in MeetingRoom.
   */
  const registerEvents = () =>
    registerSocketEvents({
      socket,
      roomId,
      peerConnections,
      localStreamRef,
      createPeerConnection: handleCreatePeerConnection,
      setRemoteStreams,
      setMessages,
      setUsers,
      setParticipantCount,
      setTypingUser,
    });

  // --- Media controls ---

  const handleToggleMic = () =>
    toggleMic({ localStreamRef, setIsMicOn });

  const handleToggleVideo = () =>
    toggleVideo({ localStreamRef, setIsVideoOn });

  const handleShareScreen = () =>
    shareScreen({
      peerConnections,
      localStreamRef,
      screenStreamRef,
      localVideoRef,
      socket,
      roomId,
      currentUser,
      setIsScreenSharing,
    });

  // --- Chat ---

  /**
   * Emits a chat message to the room.
   * message is passed as a parameter (not closed over)
   * since it changes with every keystroke.
   */
  const sendMessage = (message) => {
    if (!message.trim()) return;
    socket.emit("send-message", {
      roomId,
      senderId: currentUser._id,
      senderName: currentUser.name,
      message,
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Emits a typing indicator to the room.
   */
  const emitTyping = () => {
    socket.emit("typing", {
      roomId,
      userName: currentUser.name,
    });
  };

  return {
    initialize,
    registerEvents,
    handleToggleMic,
    handleToggleVideo,
    handleShareScreen,
    sendMessage,
    emitTyping,
  };
};