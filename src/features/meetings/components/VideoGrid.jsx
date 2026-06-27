// meeting/components/VideoGrid.jsx

import VideoTile from "./VideoTile";

/**
 * Renders the local video tile + all remote video tiles.
 *
 * @param {Object}  props
 * @param {Object}  props.localVideoRef     - Ref for local video element
 * @param {Object}  props.remoteStreams     - { [socketId]: MediaStream }
 */
const VideoGrid = ({ localVideoRef, remoteStreams }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {/* Local tile */}
      <VideoTile
        videoRef={localVideoRef}
        label="You"
        muted
      />

      {/* Remote tiles */}
      {Object.entries(remoteStreams).map(([socketId, stream]) => (
        <VideoTile
          key={socketId}
          stream={stream}
        />
      ))}
    </div>
  );
};

export default VideoGrid;