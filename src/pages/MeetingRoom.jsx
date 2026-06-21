import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import socket from "../../socket/socket";

const MeetingRoom = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [typingUser, setTypingUser] = useState("");
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
const [isScreenSharing, setIsScreenSharing] =
  useState(false);



  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setIsMicOn(audioTrack.enabled);
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setIsVideoOn(videoTrack.enabled);
  };

  const currentUser = {
    _id: "123",
    name: "test",
  };

  //later fetch the details of the user when logs in ,store it and send its details in the sendmessage
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomId,

      senderId: currentUser._id,

      senderName: currentUser.name,

      message,

      timestamp: new Date().toISOString(),
    });

    setMessage("");
  };

//share-screen
const shareScreen = async () => {
  try {

    const screenStream =
      await navigator.mediaDevices
        .getDisplayMedia({
          video: true,
        });

    screenStreamRef.current =
      screenStream;

    const screenTrack =
      screenStream.getVideoTracks()[0];

    socket.emit("screen-share-status", {
  roomId,
  userName: currentUser.name,
  isSharing: true,
});
      screenTrack.onended = async () => {

  const cameraTrack =
    localStreamRef.current
      .getVideoTracks()[0];

  const sender =
    peerRef.current
      .getSenders()
      .find(
        (sender) =>
          sender.track &&
          sender.track.kind ===
            "video"
      );

  if (sender) {
    await sender.replaceTrack(
      cameraTrack
    );
  }

  if (localVideoRef.current) {
    localVideoRef.current.srcObject =
      localStreamRef.current;
  }
  socket.emit("screen-share-status", {
  roomId,
  userName: currentUser.name,
  isSharing: false,
});

  
  setIsScreenSharing(false);
};




    const sender =
      peerRef.current
        .getSenders()
        .find(
          (sender) =>
            sender.track &&
            sender.track.kind ===
              "video"
        );

    if (sender) {
      await sender.replaceTrack(
        screenTrack
      );
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject =
        screenStream;
    }

    setIsScreenSharing(true);

  } catch (error) {
    console.error(error);
  }
};



  
//order:
  //start video
  //getusermedia
  //store stream in localstreamref
  //attach to localstreamref
  //attach to local video
  //add tracks to peer connection

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        console.log(stream.getAudioTracks());
console.log(stream.getAudioTracks()[0]?.enabled);
console.log(stream.getAudioTracks()[0]?.readyState);

        //used for peer conections.stored ina ref
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }


       stream.getTracks().forEach((track) => {
  peerRef.current.addTrack(track, stream);
});

// Join room only after media tracks are ready
socket.connect();

socket.emit("join-room", {
  roomId,
  user: currentUser,
});


      } catch (error) {
        console.error(error);
      }
    };

    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peerRef.current.ontrack = (event) => {
       console.log("TRACK RECEIVED");
        console.log(event.track.kind);
        console.log(
  event.streams[0].getAudioTracks()
);
      // const remoteStream =
      //   event.streams[0];

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    //send the candidates
    peerRef.current.onicecandidate = (event) => {
      console.log("sending the candidtaes");
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
          sender: socket.id,
        });
      }
    };
    peerRef.current.onconnectionstatechange = () => {
  console.log(
    "CONNECTION:",
    peerRef.current.connectionState
  );
};

peerRef.current.oniceconnectionstatechange = () => {
  console.log(
    "ICE:",
    peerRef.current.iceConnectionState
  );
};



    startVideo();
  }, []);

  useEffect(() => {
    // socket.connect();

    // socket.emit("join-room", { roomId, user: currentUser });
    socket.on("user-typing", (userName) => {
      setTypingUser(userName);

      setTimeout(() => {
        setTypingUser("");
      }, 1000);
    });

    socket.on("participant-count", (count) => {
      setParticipantCount(count);
    });
    socket.on("room-users", (users) => {
      setUsers(users);
    });

    socket.on("receive-message", (data) => {
      console.log("frontend received ", data);
      setMessages((prev) => [...prev, data]);
    });

    //A creating and sending offer when the other user joins
  //  socket.on("user-joined", async () => {
  // console.log(
  //   "creating offer",
  //   peerRef.current.signalingState,
  //   peerRef.current.connectionState
  // );

  // console.log(
  //   "SENDERS:",
  //   peerRef.current.getSenders()
  // );

  // const offer = await peerRef.current.createOffer();




  //     await peerRef.current.setLocalDescription(offer);

  //     socket.emit("offer", {
  //       roomId,
  //       offer,
  //       sender: socket.id,
  //     });
  //   });


 socket.on(
  "participant-joined",
  async ({ socketId }) => {
    console.log(
      "participant joined",
      socketId
    );

    const offer =
      await peerRef.current.createOffer();

    await peerRef.current
      .setLocalDescription(offer);

    socket.emit("offer", {
      roomId,
      offer,
      sender: socket.id,
    });
  }
);




    

    //receive the offer from A,create answer and send back
    socket.on("offer", async ({ offer }) => {
      console.log("creating offer", );
      await peerRef.current.setRemoteDescription(offer);

      const answer = await peerRef.current.createAnswer();
      console.log("offer received", peerRef.current.signalingState,
  peerRef.current.connectionState);
      await peerRef.current.setLocalDescription(answer);

      socket.emit("answer", {
        roomId,
        answer,
        sender: socket.id,
      });
    });

    //A receives the anser from B.handshake complete
    socket.on("answer", async ({ answer }) => {
      console.log("answer received", peerRef.current.signalingState,
  peerRef.current.connectionState);
      await peerRef.current.setRemoteDescription(answer);
      console.log(
  "remote description set"
);
    });
    //receive the ice candidates
    socket.on("ice-candidate", async ({ candidate }) => {
      console.log("receiving the candidtaes");
      try {
        await peerRef.current.addIceCandidate(candidate);
      } catch (err) {
        console.error(err);
      }
    });

    //screen share

  socket.on(
  "screen-share-status",
  ({
    isSharing,
    userName,
  }) => {
    console.log(
      "SCREEN SHARE EVENT RECEIVED"
    );

    console.log(
      `${userName} ${
        isSharing
          ? "started"
          : "stopped"
      } screen sharing`
    );

  }
);

    //to make sure last frame does not remain oncet the user leaves
  socket.on("user-left", () => {

  if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = null;
  }

});

    return () => {
      socket.off("participant-count");
      socket.off("receive-message");
      socket.off("room-users");
      socket.off("user-typing");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-joined");

      //close peer connection on unmount
      if (peerRef.current) {
        peerRef.current.close();
      }

      socket.disconnect();
    };
  }, [roomId]);

  return (
    <>
      <div>
        <h1>Meeting Room</h1>

        <h2>Room: {roomId}</h2>

        <video ref={remoteVideoRef} autoPlay playsInline />
        <video ref={localVideoRef} autoPlay playsInline muted />

        <button onClick={toggleMic}>
          {isMicOn ? "Mute Mic" : "Unmute Mic"}
        </button>

        <button onClick={toggleVideo}>
          {isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>

        <button onClick={shareScreen}>
  {isScreenSharing
    ? "Sharing Screen"
    : "Share Screen"}
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
        onChange={(e) => {
          setMessage(e.target.value);

          socket.emit("typing", {
            roomId,
            userName: currentUser.name,
          });
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
};

export default MeetingRoom;
