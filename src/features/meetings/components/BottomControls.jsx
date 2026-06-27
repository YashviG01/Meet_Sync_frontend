// meeting/components/BottomControls.jsx

/**
 * Meeting room control bar — mic, camera, screen share.
 *
 * @param {Object}   props
 * @param {boolean}  props.isMicOn
 * @param {boolean}  props.isVideoOn
 * @param {boolean}  props.isScreenSharing
 * @param {Function} props.onToggleMic
 * @param {Function} props.onToggleVideo
 * @param {Function} props.onShareScreen
 */
const BottomControls = ({
  isMicOn,
  isVideoOn,
  isScreenSharing,
  onToggleMic,
  onToggleVideo,
  onShareScreen,
}) => {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <button onClick={onToggleMic}>
        {isMicOn ? "Mute Mic" : "Unmute Mic"}
      </button>

      <button onClick={onToggleVideo}>
        {isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
      </button>

      <button onClick={onShareScreen}>
        {isScreenSharing ? "Sharing Screen" : "Share Screen"}
      </button>
    </div>
  );
};

export default BottomControls;