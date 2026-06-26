// meeting/engine/peerConnection.js

const ICE_SERVERS = [
  {
    urls: "stun:stun.l.google.com:19302",
  },
];

/**
 * Creates a new RTCPeerConnection for the given targetSocketId.
 * Returns the existing one if it already exists.
 *
 * @param {string} targetSocketId
 * @param {Object} deps
 * @param {React.MutableRefObject} deps.peerConnections
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {Object} deps.socket
 * @param {Function} deps.setRemoteStreams
 */
export const createPeerConnection = (targetSocketId, deps) => {
  const { peerConnections, localStreamRef, socket, setRemoteStreams } = deps;

  if (peerConnections.current[targetSocketId]) {
    return peerConnections.current[targetSocketId];
  }

  const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });

  peerConnections.current[targetSocketId] = peer;

  localStreamRef.current?.getTracks().forEach((track) => {
    peer.addTrack(track, localStreamRef.current);
  });

  peer.ontrack = (event) => {
    setRemoteStreams((prev) => ({
      ...prev,
      [targetSocketId]: event.streams[0],
    }));
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        targetSocketId,
        candidate: event.candidate,
        senderSocketId: socket.id,
      });
    }
  };

  peer.onconnectionstatechange = () => {
    console.log("CONNECTION:", targetSocketId, peer.connectionState);
  };

  return peer;
};