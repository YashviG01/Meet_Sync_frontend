// meeting/engine/socketEvents.js

/**
 * Registers all socket event listeners for the meeting room.
 * Returns a cleanup function that removes all listeners,
 * closes peer connections, stops media tracks, and disconnects the socket.
 *
 * @param {Object} deps
 * @param {Object}   deps.socket
 * @param {string}   deps.roomId
 * @param {React.MutableRefObject} deps.peerConnections
 * @param {React.MutableRefObject} deps.localStreamRef
 * @param {Function} deps.createPeerConnection
 * @param {Function} deps.setRemoteStreams
 * @param {Function} deps.setMessages
 * @param {Function} deps.setUsers
 * @param {Function} deps.setParticipantCount
 * @param {Function} deps.setTypingUser
 */
export const registerSocketEvents = (deps) => {
  const {
    socket,
    roomId,
    peerConnections,
    localStreamRef,
    createPeerConnection,
    setRemoteStreams,
    setMessages,
    setUsers,
    setParticipantCount,
    setTypingUser,
  } = deps;

  // --- Chat ---

  socket.on("user-typing", (userName) => {
    setTypingUser(userName);
    setTimeout(() => setTypingUser(""), 1000);
  });

  socket.on("receive-message", (data) => {
    console.log("frontend received", data);
    setMessages((prev) => [...prev, data]);
  });

  // --- Participants ---

  socket.on("participant-count", (count) => {
    setParticipantCount(count);
  });

  socket.on("room-users", (users) => {
    setUsers(users);
  });

  // --- WebRTC: initiator side ---

  // Fired when a new participant joins after us — we create the offer
  socket.on("participant-joined", async ({ socketId }) => {
    console.log("participant joined", socketId);

    const peer = createPeerConnection(socketId);

    const offer = await peer.createOffer();

    await peer.setLocalDescription(offer);

    socket.emit("offer", {
      targetSocketId: socketId,
      offer,
      senderSocketId: socket.id,
    });
  });

  // Fired when we join a room that already has participants — we create offers for each
  socket.on("existing-participants", async (participants) => {
    for (const participant of participants) {
      console.log(peerConnections.current);

      const peer = createPeerConnection(participant.socketId);

      console.log("created peer for", participant.socketId);

      const offer = await peer.createOffer();

      await peer.setLocalDescription(offer);

      socket.emit("offer", {
        targetSocketId: participant.socketId,
        offer,
        senderSocketId: socket.id,
      });
    }
  });

  // --- WebRTC: receiver side ---

  // Receive offer, create and send answer
  socket.on("offer", async ({ offer, senderSocketId }) => {
    let peer = peerConnections.current[senderSocketId];

    if (!peer) {
      peer = createPeerConnection(senderSocketId);
    }

    if (peer.signalingState !== "stable") {
      console.log("Ignoring duplicate offer");
      return;
    }

    await peer.setRemoteDescription(offer);

    if (peer.signalingState !== "have-remote-offer") {
      console.log("Unexpected signaling state:", peer.signalingState);
      return;
    }

    const answer = await peer.createAnswer();

    await peer.setLocalDescription(answer);

    socket.emit("answer", {
      targetSocketId: senderSocketId,
      answer,
      senderSocketId: socket.id,
    });
  });

  // Receive answer, complete handshake
  socket.on("answer", async ({ answer, senderSocketId }) => {
    const peer = peerConnections.current[senderSocketId];

    if (!peer) return;

    await peer.setRemoteDescription(answer);
  });

  // Receive ICE candidates
  socket.on("ice-candidate", async ({ candidate, senderSocketId }) => {
    const peer = peerConnections.current[senderSocketId];

    if (!peer) return;

    try {
      await peer.addIceCandidate(candidate);
    } catch (err) {
      console.error(err);
    }
  });

  // --- Screen share status ---

  socket.on("screen-share-status", ({ isSharing, userName }) => {
    console.log("SCREEN SHARE EVENT RECEIVED");
    console.log(`${userName} ${isSharing ? "started" : "stopped"} screen sharing`);
  });

  // --- Participant leaving ---

  // Remove remote stream and close peer connection when a user leaves
  socket.on("user-left", ({ socketId }) => {
    setRemoteStreams((prev) => {
      const updated = { ...prev };
      delete updated[socketId];
      return updated;
    });

    if (peerConnections.current[socketId]) {
      peerConnections.current[socketId].close();
      delete peerConnections.current[socketId];
    }
  });

  // --- Cleanup function returned to useEffect ---

  return () => {
    socket.off("user-typing");
    socket.off("participant-count");
    socket.off("room-users");
    socket.off("receive-message");
    socket.off("participant-joined");
    socket.off("existing-participants");
    socket.off("offer");
    socket.off("answer");
    socket.off("ice-candidate");
    socket.off("screen-share-status");
    socket.off("user-left");
    socket.off("user-joined");

    // Close all peer connections
    Object.values(peerConnections.current).forEach((peer) => peer.close());
    peerConnections.current = {};

    // Stop camera and microphone tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Disconnect socket
    if (socket) {
      socket.disconnect();
    }
  };
};