import { useEffect, useRef } from "react";
import { MicOff, MoreVertical } from "lucide-react";

/**
 * Single participant video tile.
 * Three mutually exclusive modes:
 *  1. videoRef prop  → local camera tile (ref attached directly to <video>)
 *  2. stream prop    → remote participant tile (stream attached via useEffect)
 *  3. audioOnly      → no video, shows initials circle
 *
 * @param {Object}                      props
 * @param {string}                      props.name
 * @param {React.MutableRefObject}      [props.videoRef]  - local video ref
 * @param {MediaStream}                 [props.stream]    - remote stream
 * @param {boolean}                     [props.audioOnly]
 * @param {string}                      [props.initials]
 * @param {boolean}                     [props.isMicOn]
 * @param {boolean}                     [props.isHost]
 * @param {boolean}                     [props.isSpeaking]
 * @param {boolean}                     [props.isLocal]   - shows "You" label suffix
 */
const VideoTile = ({
  name,
  videoRef,
  stream,
  audioOnly = false,
  initials = "",
  isMicOn = true,
  isHost = false,
  isSpeaking = false,
  isLocal = false,
}) => {
  // For remote streams: internal ref to attach stream
  const internalRef = useRef(null);

  useEffect(() => {
    if (stream && internalRef.current) {
      internalRef.current.srcObject = stream;
    }
  }, [stream]);

  const displayName = isLocal ? `${name} (You)` : name;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-colors duration-200
        ${isSpeaking
          ? "border-blue-400/60 shadow-[0_0_0_2px_rgba(79,142,247,0.3)]"
          : "border-white/10 hover:border-white/20"
        }`}
    >
      {/* ── Video / Avatar ── */}
      {audioOnly ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1c1f2e]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2f44] text-lg font-semibold text-white">
            {initials}
          </div>
        </div>
      ) : videoRef ? (
        /* Local tile — ref controlled by useMeeting / engine */
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        /* Remote tile — stream attached via internalRef */
        <video
          ref={internalRef}
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* ── Hover overlay ── */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-150 group-hover:bg-black/10" />

      {/* ── Bottom gradient ── */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* ── More options (hover) ── */}
      <button
        aria-label="More options"
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full
          bg-white/10 text-white opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100"
      >
        <MoreVertical size={14} />
      </button>

      {/* ── Bottom info ── */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2.5 py-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {!isMicOn && (
            <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-red-500">
              <MicOff size={10} className="text-white" />
            </span>
          )}
          <span className="truncate text-xs font-medium text-white drop-shadow">
            {displayName}
          </span>
          {audioOnly && (
            <span className="text-[11px] text-white/50">(Audio Only)</span>
          )}
        </div>

        {isHost && (
          <span className="ml-1 flex-shrink-0 rounded bg-[#4f8ef7] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white">
            HOST
          </span>
        )}
      </div>

      {/* Aspect ratio spacer */}
      <div className="pb-[62.5%]" />
    </div>
  );
};

export default VideoTile;