// meeting/hooks/useMeeting.js

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../auth/auth/store/authStore";
import { createMeetingEngine } from "../engine/meetingEngine";
import socket from "../../../../socket/socket";

/**
 * Owns all meeting state, refs, and engine lifecycle.
 * Returns everything MeetingRoom needs to render.
 */
const useMeeting = () => {
useEffect(() => {
    console.log("USE MEETING MOUNTED");
}, []); 
 const { roomId } = useParams();
// console.log("room id:",roomId)
  const currentUser = useAuthStore((state) => state.user);

  // --- Chat state ---
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  // --- Participant state ---
  const [users, setUsers] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);

  // --- Media state ---
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // ── UI panel state (new) ──
  const [activePanel, setActivePanel] = useState(null); // "chat" | "participants" | null
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [search, setSearch] = useState("");

  // --- WebRTC state ---
  const [remoteStreams, setRemoteStreams] = useState({});

  // --- Refs ---
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerConnections = useRef({});
  const engineRef = useRef(null);

  // --- Engine getter (lazy, created once) ---
  const getEngine = () => {
    if (!engineRef.current) {
      engineRef.current = createMeetingEngine({
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
      });
    }
    return engineRef.current;
  };

  // --- Effect 1: acquire media + join room ---
  useEffect(() => {
    getEngine().initialize().catch(console.error);
  }, []);

  // --- Effect 2: register socket events ---
  useEffect(() => {
    return getEngine().registerEvents();
  }, [roomId]);

  // --- Handlers exposed to MeetingRoom ---

  const handleToggleMic = () => getEngine().handleToggleMic();

  const handleToggleVideo = () => getEngine().handleToggleVideo();

  const handleShareScreen = () => getEngine().handleShareScreen();

  const handleSendMessage = () => {
    getEngine().sendMessage(message);
    setMessage("");
  };

  const handleTyping = (value) => {
    setMessage(value);
    getEngine().emitTyping();
  };
  //mapping of the backend users to participantsto feed to all other ui components
let participants = [];

try {
  participants = users.map((user) => ({
    id: user.socketId,
    socketId: user.socketId,
    userId: user.userId,
    name: user.userName,

    isMicOn: true,
    isVideoOn: true,
    isSpeaking: false,
    isHandRaised: false,
    isHost: false,
  }));

  // console.log("participants", participants);

} catch (err) {
  console.error("participants mapping failed");
  console.log("users =", users);
  console.error(err);
}


   // ── UI panel handlers (new) ──
  const handleToggleChat = () =>
    setActivePanel((p) => (p === "chat" ? null : "chat"));
 
  const handleToggleParticipants = () =>
    setActivePanel((p) => (p === "participants" ? null : "participants"));
 
  const handleToggleHand = () => setIsHandRaised((v) => !v);
 
  const handleSearchChange = (val) => setSearch(val);
 
  return {
    // Room
    roomId,

    // Refs (passed to JSX elements directly)
    localVideoRef,

    // Remote streams
    remoteStreams,

    // Media controls
    isMicOn,
    isVideoOn,
    isScreenSharing,
    handleToggleMic,
    handleToggleVideo,
    handleShareScreen,

    // Participants
    users,
    participantCount,
    participants,

    // Chat
    message,
    messages,
    typingUser,
    handleSendMessage,
    handleTyping,
    // UI panel handlers
    activePanel,
    isHandRaised,
    search,
    handleToggleChat,
    handleToggleParticipants,
    handleToggleHand,
    handleSearchChange
  };
};

export default useMeeting;