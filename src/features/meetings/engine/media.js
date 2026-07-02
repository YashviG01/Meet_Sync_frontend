// meeting/engine/media.js

/**
 * Requests camera + microphone access, stores the stream in localStreamRef,
 * attaches it to the local video element, then signals the server to join the room.
 *
 * @param {Object} deps
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {React.MutableRefObject} deps.localVideoRef
 * @param {Object} deps.socket
 * @param {string} deps.roomId
 * @param {Object} deps.currentUser
 */
export const startVideo = async (deps) => {
  const { localStreamRef, localVideoRef, socket, roomId, currentUser } = deps;

  // Guard: already initialized (StrictMode double-invoke protection)
  if (localStreamRef.current) return;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  console.log(stream.getAudioTracks());
  console.log(stream.getAudioTracks()[0]?.enabled);
  console.log(stream.getAudioTracks()[0]?.readyState);

  localStreamRef.current = stream;

  if (localVideoRef.current) {
    localVideoRef.current.srcObject = stream;
  }

   // Guard: don't reconnect if socket is already connected
  if (!socket.connected) {
    socket.connect();
  }

  socket.emit("join-room", {
    roomId,
        user: currentUser,

    // user: currentUser.id,
    // name: currentUser.name,
  });
};

/**
 * Toggles the microphone audio track on/off.
 *
 * @param {Object} deps
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {Function} deps.setIsMicOn
 */
export const toggleMic = (deps) => {
  const { localStreamRef, setIsMicOn } = deps;

  const audioTrack = localStreamRef.current?.getAudioTracks()[0];

  if (!audioTrack) return;

  audioTrack.enabled = !audioTrack.enabled;

  setIsMicOn(audioTrack.enabled);
};

/**
 * Toggles the camera video track on/off.
 *
 * @param {Object} deps
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {Function} deps.setIsVideoOn
 */
export const toggleVideo = (deps) => {
  const { localStreamRef, setIsVideoOn } = deps;

  const videoTrack = localStreamRef.current?.getVideoTracks()[0];

  if (!videoTrack) return;

  videoTrack.enabled = !videoTrack.enabled;

  setIsVideoOn(videoTrack.enabled);
};

/**
 * Starts screen sharing, replaces the video track in all peer connections,
 * and reverts back to camera when the user stops sharing.
 *
 * @param {Object} deps
 * @param {React.MutableRefObject} deps.peerConnections
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {React.MutableRefObject} deps.screenStreamRef
 * @param {React.MutableRefObject} deps.localVideoRef
 * @param {Object} deps.socket
 * @param {string} deps.roomId
 * @param {Object} deps.currentUser
 * @param {Function} deps.setIsScreenSharing
 */
export const shareScreen = async (deps) => {
  const {
    peerConnections,
    localStreamRef,
    screenStreamRef,
    localVideoRef,
    socket,
    roomId,
    currentUser,
    setIsScreenSharing,
  } = deps;

  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    screenStreamRef.current = screenStream;

    const screenTrack = screenStream.getVideoTracks()[0];

    // Replace camera track with screen track in all peer connections
    Object.values(peerConnections.current).forEach(async (peer) => {
      const sender = peer
        .getSenders()
        .find((s) => s.track && s.track.kind === "video");

      if (sender) {
        await sender.replaceTrack(screenTrack);
      }
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = screenStream;
    }

    socket.emit("screen-share-status", {
      roomId,
      userName: currentUser.name,
      isSharing: true,
    });

    setIsScreenSharing(true);

    // Revert to camera when user clicks browser "Stop sharing"
    screenTrack.onended = async () => {
      const cameraTrack = localStreamRef.current?.getVideoTracks()[0];

      Object.values(peerConnections.current).forEach(async (peer) => {
        const sender = peer
          .getSenders()
          .find((s) => s.track && s.track.kind === "video");

        if (sender && cameraTrack) {
          await sender.replaceTrack(cameraTrack);
        }
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }

      socket.emit("screen-share-status", {
        roomId,
        userName: currentUser.name,
        isSharing: false,
      });

      setIsScreenSharing(false);
    };
  } catch (error) {
    console.error(error);
  }
};