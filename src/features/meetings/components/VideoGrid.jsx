import VideoTile from "./VideoTile";

const VideoGrid = ({
  localStream,
  remoteStreams,
  participants,
}) => {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-[260px]">

      {/* Local Video */}

      <VideoTile
        stream={localStream}
        name="You"
        isLocal
      />

      {/* Remote Videos */}

      {participants.map((participant) => (
        <VideoTile
          key={participant.socketId}
          stream={
            remoteStreams[participant.socketId]
          }
          name={participant.userName}
        />
      ))}

    </div>
  );
};

export default VideoGrid;