import VideoTile from "./VideoTile";

/**
 * Responsive grid of participant video tiles.
 * Renders the local tile first, then one tile per remote stream.
 *
 * @param {Object}                          props
 * @param {React.MutableRefObject}          props.localVideoRef
 * @param {string}                          props.localUserName
 * @param {boolean}                         props.isMicOn        - local mic state
 * @param {Object}                          props.remoteStreams   - { [socketId]: MediaStream }
 * @param {Array}                           props.users          - [{ socketId, userName }]
 */



const VideoGrid = ({
  localVideoRef,
  localUserName = "You",
  isMicOn,
  remoteStreams = {},
  users = [],
}) => {


  
  // Map socketId → userName for remote tiles
  const userMap = Object.fromEntries(users.map((u) => [u.socketId, u.userName]));

  const remoteTiles = Object.entries(remoteStreams);
  // console.log(remoteTiles.length);
  const totalTiles = 1 + remoteTiles.length;

  // Grid columns: 1 for solo, 2 for 2–4 tiles, 3 for 5+
  const gridCols =
    totalTiles === 1
      ? "grid-cols-1"
      : totalTiles <= 4
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div className={`grid h-full gap-2 auto-rows-fr ${gridCols}`}>
      {/* Local tile */}
      <VideoTile
        name={localUserName}
        videoRef={localVideoRef}
        isMicOn={isMicOn}
        isLocal
      />

      {/* Remote tiles */}
      {remoteTiles.map(([socketId, stream]) => (
        <VideoTile
          key={socketId}
          name={userMap[socketId] ?? "Participant"}
          stream={stream}
          isMicOn
        />
      ))}
    </div>
  );
};

export default VideoGrid;