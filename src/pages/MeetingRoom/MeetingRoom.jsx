// meeting/pages/MeetingRoom.jsx

import RemoteVideo from "../../../components/meeting/RemoteVideo";
import useMeeting from "../../features/meetings/hooks/useMeeting";

const MeetingRoom = () => {
  const {
    roomId,
    localVideoRef,
    remoteStreams,
    isMicOn,
    isVideoOn,
    isScreenSharing,
    handleToggleMic,
    handleToggleVideo,
    handleShareScreen,
    users,
    participantCount,
    message,
    messages,
    typingUser,
    handleSendMessage,
    handleTyping,
  } = useMeeting();

  return (
    <>
      <div>
        <h1>Meeting Room</h1>
        <h2>Room: {roomId}</h2>

        <div>
          {Object.entries(remoteStreams).map(([socketId, stream]) => (
            <RemoteVideo key={socketId} stream={stream} />
          ))}
        </div>

        <video ref={localVideoRef} autoPlay playsInline muted />

        <button onClick={handleToggleMic}>
          {isMicOn ? "Mute Mic" : "Unmute Mic"}
        </button>

        <button onClick={handleToggleVideo}>
          {isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>

        <button onClick={handleShareScreen}>
          {isScreenSharing ? "Sharing Screen" : "Share Screen"}
        </button>

        <h3>Participants: {participantCount}</h3>
      </div>

      <div>
        <h3>Participants</h3>

        {users.map((user) => (
          <div key={user.socketId}>{user.userName}</div>
        ))}

        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderName}</strong>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}

        {typingUser && <p>{typingUser} is typing...</p>}
      </div>

      <input
        value={message}
        onChange={(e) => handleTyping(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
};

export default MeetingRoom;




// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import RemoteVideo from "../../../components/meeting/RemoteVideo";
// import socket from "../../../socket/socket";
// import useAuthStore from "../../features/auth/auth/store/authStore";
// import {createMeetingEngine} from "../../features/meetings/engine/meetingEngine"
// // import {createPeerConnection as createPeer} from "../../features/meetings/engine/peerConnection"
// // import {
// //   startVideo,
// //   toggleMic,
// //   toggleVideo,
// //   shareScreen,
// // } from "../../features/meetings/engine/media";
// // import { registerSocketEvents } from "../../features/meetings/engine/socketEvents";
// const MeetingRoom = () => {
//   const { roomId } = useParams();
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [participantCount, setParticipantCount] = useState(0);
//   const [typingUser, setTypingUser] = useState("");
//   const localVideoRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const screenStreamRef = useRef(null);
//   const [remoteStreams, setRemoteStreams] = useState({});
//   const peerConnections = useRef({});
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
// const engineRef = useRef(null);
//   // const toggleMic = () => {
//   //   const audioTrack = localStreamRef.current?.getAudioTracks()[0];

//   //   if (!audioTrack) return;

//   //   audioTrack.enabled = !audioTrack.enabled;

//   //   setIsMicOn(audioTrack.enabled);
//   // };

// // const handleToggleMic = () =>
// //   toggleMic({ localStreamRef, setIsMicOn });
//   // const toggleVideo = () => {
//   //   const videoTrack = localStreamRef.current?.getVideoTracks()[0];

//   //   if (!videoTrack) return;

//   //   videoTrack.enabled = !videoTrack.enabled;

//   //   setIsVideoOn(videoTrack.enabled);
//   // };

// //fetch current user details from the zustand store
  
// // const handleToggleVideo = () =>
// //   toggleVideo({ localStreamRef, setIsVideoOn });

// const currentUser =
// useAuthStore(
// (state)=>state.user
// );
// const getEngine = () => {
//   if (!engineRef.current) {
//     engineRef.current = createMeetingEngine({
//       socket,
//       roomId,
//       currentUser,
//       peerConnections,
//       localStreamRef,
//       screenStreamRef,
//       localVideoRef,
//       setRemoteStreams,
//       setMessages,
//       setUsers,
//       setParticipantCount,
//       setTypingUser,
//       setIsMicOn,
//       setIsVideoOn,
//       setIsScreenSharing,
//     });
//   }
//   return engineRef.current;
// };

// // Replace Effect 1 with:
// useEffect(() => {
//   getEngine().initialize().catch(console.error);
// }, []);

// // Replace Effect 2 with:
// useEffect(() => {
//   return getEngine().registerEvents();
// }, [roomId]);

// // Replace handleToggleMic with:
// const handleToggleMic = () => getEngine().handleToggleMic();

// // Replace handleToggleVideo with:
// const handleToggleVideo = () => getEngine().handleToggleVideo();

// // Replace handleShareScreen with:
// const handleShareScreen = () => getEngine().handleShareScreen();

// // Replace sendMessage with:
// const sendMessage = () => {
//   getEngine().sendMessage(message);
//   setMessage("");
// };





  

//   // const sendMessage = () => {
//   //   if (!message.trim()) return;

//   //   socket.emit("send-message", {
//   //     roomId,

//   //     senderId: currentUser._id,

//   //     senderName: currentUser.name,

//   //     message,

//   //     timestamp: new Date().toISOString(),
//   //   });

//   //   setMessage("");
//   // };

//   //share-screen
// //  const shareScreen = async () => {
// //   try {
// //     const screenStream =
// //       await navigator.mediaDevices.getDisplayMedia({
// //         video: true,
// //       });

// //     screenStreamRef.current =
// //       screenStream;

// //     const screenTrack =
// //       screenStream.getVideoTracks()[0];

// //     // Replace camera with screen
// //     Object.values(
// //       peerConnections.current
// //     ).forEach(async (peer) => {
// //       const sender =
// //         peer.getSenders().find(
// //           (sender) =>
// //             sender.track &&
// //             sender.track.kind ===
// //               "video"
// //         );

// //       if (sender) {
// //         await sender.replaceTrack(
// //           screenTrack
// //         );
// //       }
// //     });

// //     if (localVideoRef.current) {
// //       localVideoRef.current.srcObject =
// //         screenStream;
// //     }

// //     socket.emit(
// //       "screen-share-status",
// //       {
// //         roomId,
// //         userName:
// //           currentUser.name,
// //         isSharing: true,
// //       }
// //     );

// //     setIsScreenSharing(true);

// //     // User clicks "Stop sharing"
// //     screenTrack.onended =
// //       async () => {
// //         const cameraTrack =
// //           localStreamRef.current
// //             ?.getVideoTracks()[0];

// //         Object.values(
// //           peerConnections.current
// //         ).forEach(async (peer) => {
// //           const sender =
// //             peer.getSenders().find(
// //               (sender) =>
// //                 sender.track &&
// //                 sender.track.kind ===
// //                   "video"
// //             );

// //           if (
// //             sender &&
// //             cameraTrack
// //           ) {
// //             await sender.replaceTrack(
// //               cameraTrack
// //             );
// //           }
// //         });

// //         if (
// //           localVideoRef.current
// //         ) {
// //           localVideoRef.current.srcObject =
// //             localStreamRef.current;
// //         }

// //         socket.emit(
// //           "screen-share-status",
// //           {
// //             roomId,
// //             userName:
// //               currentUser.name,
// //             isSharing: false,
// //           }
// //         );

// //         setIsScreenSharing(false);
// //       };
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };
// // const handleShareScreen = () =>
// //   shareScreen({
// //     peerConnections,
// //     localStreamRef,
// //     screenStreamRef,
// //     localVideoRef,
// //     socket,
// //     roomId,
// //     currentUser,
// //     setIsScreenSharing,
// //   });

// // const createPeerConnection = (targetSocketId) =>
// //   createPeer(targetSocketId, {
// //     peerConnections,
// //     localStreamRef,
// //     socket,
// //     setRemoteStreams,
// //   });
// //   const createPeerConnection = (targetSocketId) => {
// //   if (peerConnections.current[targetSocketId]) {
// //     return peerConnections.current[targetSocketId];
// //   }

// //   const peer = new RTCPeerConnection({
// //     iceServers: [
// //       {
// //         urls: "stun:stun.l.google.com:19302",
// //       },
// //     ],
// //   });

// //   peerConnections.current[targetSocketId] = peer;

// //   localStreamRef.current?.getTracks().forEach((track) => {
// //     peer.addTrack(track, localStreamRef.current);
// //   });

// //   peer.ontrack = (event) => {
// //     setRemoteStreams((prev) => ({
// //       ...prev,
// //       [targetSocketId]: event.streams[0],
// //     }));
// //   };

// //   peer.onicecandidate = (event) => {
// //     if (event.candidate) {
// //       socket.emit("ice-candidate", {
// //         targetSocketId,
// //         candidate: event.candidate,
// //         senderSocketId: socket.id,
// //       });
// //     }
// //   };

// //   peer.onconnectionstatechange = () => {
// //     console.log(
// //       "CONNECTION:",
// //       targetSocketId,
// //       peer.connectionState
// //     );
// //   };

// //   return peer;
// // };

//   //order:
//   //start video
//   //getusermedia
//   //store stream in localstreamref
//   //attach to localstreamref
//   //attach to local video
//   //add tracks to peer connection

//   // useEffect(() => {
//   //   const startVideo = async () => {
//   //     try {
//   //       const stream = await navigator.mediaDevices.getUserMedia({
//   //         video: true,
//   //         audio: true,
//   //       });

//   //       console.log(stream.getAudioTracks());
//   //       console.log(stream.getAudioTracks()[0]?.enabled);
//   //       console.log(stream.getAudioTracks()[0]?.readyState);

//   //       //used for peer conections.stored ina ref
//   //       localStreamRef.current = stream;

//   //       if (localVideoRef.current) {
//   //         localVideoRef.current.srcObject = stream;
//   //       }

//   //       //        stream.getTracks().forEach((track) => {
//   //       //   peerRef.current.addTrack(track, stream);
//   //       // });

//   //       // Join room only after media tracks are ready
//   //       socket.connect();

//   //       socket.emit("join-room", {
//   //         roomId:roomId,
//   //         user: currentUser.id,
//   //         name:currentUser.name
//   //       });
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   // peerRef.current = new RTCPeerConnection({
//   //   //   iceServers: [
//   //   //     {
//   //   //       urls: "stun:stun.l.google.com:19302",
//   //   //     },
//   //   //   ],
//   //   // });

//   //   // peerRef.current.onconnectionstatechange = () => {
//   //   //   console.log("CONNECTION:", peerRef.current.connectionState);
//   //   // };

//   //   // peerRef.current.oniceconnectionstatechange = () => {
//   //   //   console.log("ICE:", peerRef.current.iceConnectionState);
//   //   // };

//   //   startVideo();
//   // }, []);


// // useEffect(() => {
// //   const init = async () => {
// //     try {
// //       await startVideo({
// //         localStreamRef,
// //         localVideoRef,
// //         socket,
// //         roomId,
// //         currentUser,
// //       });
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   init();
// // }, []);

// // useEffect(() => {
// //   const cleanup = registerSocketEvents({
// //     socket,
// //     roomId,
// //     peerConnections,
// //     localStreamRef,
// //     createPeerConnection,
// //     setRemoteStreams,
// //     setMessages,
// //     setUsers,
// //     setParticipantCount,
// //     setTypingUser,
// //   });

// //   return cleanup;
// // }, [roomId]);





// //   useEffect(() => {
// //     // socket.connect();

// //     // socket.emit("join-room", { roomId, user: currentUser });
// //     socket.on("user-typing", (userName) => {
// //       setTypingUser(userName);

// //       setTimeout(() => {
// //         setTypingUser("");
// //       }, 1000);
// //     });

// //     socket.on("participant-count", (count) => {
// //       setParticipantCount(count);
// //     });
// //     socket.on("room-users", (users) => {
// //       setUsers(users);
// //     });

// //     socket.on("receive-message", (data) => {
// //       console.log("frontend received ", data);
// //       setMessages((prev) => [...prev, data]);
// //     });

// //     //A creating and sending offer when the other user joins
// //     //  socket.on("user-joined", async () => {
// //     // console.log(
// //     //   "creating offer",
// //     //   peerRef.current.signalingState,
// //     //   peerRef.current.connectionState
// //     // );

// //     // console.log(
// //     //   "SENDERS:",
// //     //   peerRef.current.getSenders()
// //     // );

// //     // const offer = await peerRef.current.createOffer();

// //     //     await peerRef.current.setLocalDescription(offer);

// //     //     socket.emit("offer", {
// //     //       roomId,
// //     //       offer,
// //     //       sender: socket.id,
// //     //     });
// //     //   });

// //     socket.on("participant-joined", async ({ socketId }) => {
// //       console.log("participant joined", socketId);
// //       const peer = createPeerConnection(socketId);

// //       const offer = await peer.createOffer();

// //       await peer.setLocalDescription(offer);

// //       socket.emit("offer", {
// //         targetSocketId: socketId,
// //         offer,
// //         senderSocketId: socket.id,
// //       });
// //       // const offer = await peerRef.current.createOffer();

// //       // await peerRef.current.setLocalDescription(offer);

// //       // socket.emit("offer", {
// //       //   roomId,
// //       //   offer,
// //       //   sender: socket.id,
// //       // });
// //     });

// //     //receive the offer from A,create answer and send back
// //     socket.on(
// //   "offer",
// //   async ({
// //     offer,
// //     senderSocketId,
// //   }) => {

// //     let peer =
// //       peerConnections.current[
// //         senderSocketId
// //       ];

// //     if (!peer) {
// //       peer =
// //         createPeerConnection(
// //           senderSocketId
// //         );
// //     }

// // if (peer.signalingState !== "stable") {
// //     console.log(
// //         "Ignoring duplicate offer"
// //     );
// //     return;
// // }

// //     await peer
// //       .setRemoteDescription(
// //         offer
// //       );

// //       if (peer.signalingState !== "have-remote-offer") {
// //     console.log(
// //         "Unexpected signaling state:",
// //         peer.signalingState
// //     );
// //     return;
// // }
// //     const answer =
// //       await peer.createAnswer();

// //     await peer
// //       .setLocalDescription(
// //         answer
// //       );

// //     socket.emit("answer", {
// //       targetSocketId:
// //         senderSocketId,
// //       answer,
// //       senderSocketId:
// //         socket.id,
// //     });
// //   }
// // );

// //     //A receives the anser from B.handshake complete
// //    socket.on(
// //   "answer",
// //   async ({
// //     answer,
// //     senderSocketId,
// //   }) => {

// //     const peer =
// //       peerConnections.current[
// //         senderSocketId
// //       ];

// //     if (!peer) return;

// //     await peer
// //       .setRemoteDescription(
// //         answer
// //       );

// //   }
// // );
// //     //receive the ice candidates
// //     socket.on(
// //   "ice-candidate",
// //   async ({
// //     candidate,
// //     senderSocketId,
// //   }) => {

// //     const peer =
// //       peerConnections.current[
// //         senderSocketId
// //       ];

// //     if (!peer) return;

// //     try {
// //       await peer.addIceCandidate(
// //         candidate
// //       );
// //     } catch (err) {
// //       console.error(err);
// //     }

// //   }
// // );

// //     //screen share

// //     socket.on("screen-share-status", ({ isSharing, userName }) => {
// //       console.log("SCREEN SHARE EVENT RECEIVED");

// //       console.log(
// //         `${userName} ${isSharing ? "started" : "stopped"} screen sharing`,
// //       );
// //     });

// //     //to make sure last frame does not remain oncet the user leaves
// //     socket.on(
// //   "user-left",
// //   ({ socketId }) => {

// //     setRemoteStreams((prev) => {
// //       const updated = { ...prev };

// //       delete updated[socketId];

// //       return updated;
// //     });

// //     if (
// //       peerConnections.current[
// //         socketId
// //       ]
// //     ) {
// //       peerConnections.current[
// //         socketId
// //       ].close();

// //       delete peerConnections.current[
// //         socketId
// //       ];
// //     }
// //   }
// // );

// //     socket.on("existing-participants", async (participants) => {





// //       for (const participant of participants) {
// //         console.log(peerConnections.current);

// //         const peer = createPeerConnection(participant.socketId);

// //         console.log("created peer for", participant.socketId);
// //         // localStreamRef.current.getTracks().forEach((track) => {
// //         //   peer.addTrack(track, localStreamRef.current);
// //         // });
// //         const offer = await peer.createOffer();

// //         await peer.setLocalDescription(offer);

// //         socket.emit("offer", {
// //           targetSocketId: participant.socketId,

// //           offer,

// //           senderSocketId: socket.id,
// //         });
// //       }
// //     });

// //     return () => {
// //       socket.off("participant-count");
// //       socket.off("receive-message");
// //       socket.off("room-users");
// //       socket.off("user-typing");
// //       socket.off("offer");
// //       socket.off("answer");
// //       socket.off("ice-candidate");
// //       socket.off("user-joined");
// // Object.values(
// // peerConnections.current
// // ).forEach(peer=>peer.close());

// // peerConnections.current={};
// // //turn off the camera,microphone if still in use
// // if (localStreamRef.current) {
// //   localStreamRef.current.getTracks().forEach(track => track.stop());
// // }

// //       //close peer connection on unmount
// //       // if (peerRef.current) {
// //       //   peerRef.current.close();
// //       // }

// //        if (socket) {
// //     socket.disconnect();
// //   }
// //     };
// //   }, [roomId]);

//   return (
//     <>
//       <div>
//         <h1>Meeting Room</h1>

//         <h2>Room: {roomId}</h2>
         

//          <div>
//   {Object.entries(remoteStreams).map(
//     ([socketId, stream]) => (
//       <RemoteVideo
//         key={socketId}
//         stream={stream}
//       />
//     )
//   )}
// </div>
//         {/* <video ref={remoteVideoRef} autoPlay playsInline /> */}
//         <video ref={localVideoRef} autoPlay playsInline muted />

//         <button onClick={handleToggleMic}>
//           {isMicOn ? "Mute Mic" : "Unmute Mic"}
//         </button>

//         <button onClick={handleToggleVideo}>
//           {isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
//         </button>

//         <button onClick={handleShareScreen}>
//           {isScreenSharing ? "Sharing Screen" : "Share Screen"}
//         </button>

//         <h3>Participants: {participantCount}</h3>
//       </div>
//       <div>
//         <h3>Participants</h3>

//         {users.map((user) => (
//           <div key={user.socketId}>{user.userName}</div>
//         ))}
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderName}</strong>

//             <p>{msg.message}</p>

//             <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//           </div>
//         ))}

//         {typingUser && <p>{typingUser} is typing...</p>}
//       </div>

//       <input
//         value={message}
//       onChange={(e) => {
//   setMessage(e.target.value);
//   getEngine().emitTyping();
// }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </>
//   );
// };

// export default MeetingRoom;
