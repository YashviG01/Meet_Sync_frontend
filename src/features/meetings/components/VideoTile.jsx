// meeting/components/VideoTile.jsx

import { useEffect, useRef } from "react";

/**
 * Renders a single video tile.
 * Accepts either a MediaStream (remote) or a ref (local).
 *
 * @param {Object}  props
 * @param {MediaStream} [props.stream]      - Remote stream (passed directly)
 * @param {Object}  [props.videoRef]        - Ref for local video element
 * @param {string}  [props.label]           - Participant name shown on tile
 * @param {boolean} [props.muted]           - Mute the audio (local tile)
 */
const VideoTile = ({ stream, videoRef, label, muted = false }) => {
  const internalRef = useRef(null);
  const ref = videoRef || internalRef;

  // Attach remote stream to video element when stream prop is provided
  useEffect(() => {
    if (stream && ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <video ref={ref} autoPlay playsInline muted={muted} />
      {label && (
        <span
          style={{
            position: "absolute",
            bottom: 4,
            left: 4,
            color: "white",
            fontSize: 12,
            background: "rgba(0,0,0,0.5)",
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default VideoTile;