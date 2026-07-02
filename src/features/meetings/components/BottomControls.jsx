import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  Users,
  MessageSquare,
  Hand,
  Smile,
  Settings,
  MoreHorizontal,
  PhoneOff,
} from "lucide-react";
import ControlButton from "./ControlButton";

/**
 * Floating bottom control bar.
 *
 * @param {Object}   props
 * @param {boolean}  props.isMicOn
 * @param {boolean}  props.isVideoOn
 * @param {boolean}  props.isScreenSharing
 * @param {boolean}  props.isHandRaised
 * @param {boolean}  props.isParticipantsOpen
 * @param {boolean}  props.isChatOpen
 * @param {Function} props.onToggleMic
 * @param {Function} props.onToggleVideo
 * @param {Function} props.onToggleScreenShare
 * @param {Function} props.onToggleParticipants
 * @param {Function} props.onToggleChat
 * @param {Function} props.onToggleHand
 * @param {Function} props.onReactions
 * @param {Function} props.onSettings
 * @param {Function} props.onMore
 * @param {Function} props.onLeave
 */
const BottomControls = ({
  isMicOn,
  isVideoOn,
  isScreenSharing,
  isHandRaised,
  isParticipantsOpen,
  isChatOpen,
  onToggleMic,
  onToggleVideo,
  onToggleScreenShare,
  onToggleParticipants,
  onToggleChat,
  onToggleHand,
  onReactions,
  onSettings,
  onMore,
  onLeave,
}) => {
  return (
    <div className="absolute inset-x-0 bottom-3.5 flex justify-center px-3">
      <div
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-meeting-pill
          px-3 py-2 shadow-2xl shadow-black/40 sm:gap-2 sm:px-4"
      >
        <ControlButton
          icon={isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          active={isMicOn}
          label={isMicOn ? "Mute microphone" : "Unmute microphone"}
          onClick={onToggleMic}
        />

        <ControlButton
          icon={isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
          active={isVideoOn}
          label={isVideoOn ? "Turn off camera" : "Turn on camera"}
          onClick={onToggleVideo}
        />

        <ControlButton
          icon={<ScreenShare size={18} />}
          active={isScreenSharing}
          label={isScreenSharing ? "Stop sharing" : "Share screen"}
          onClick={onToggleScreenShare}
        />

        <ControlButton
          icon={<Hand size={18} />}
          active={isHandRaised}
          label={isHandRaised ? "Lower hand" : "Raise hand"}
          onClick={onToggleHand}
        />

        {/* Hidden on very small screens to avoid overflow */}
        <span className="hidden sm:contents">
          <ControlButton
            icon={<Smile size={18} />}
            active={false}
            label="Reactions"
            onClick={onReactions}
          />
        </span>

        <ControlButton
          icon={<Users size={18} />}
          active={isParticipantsOpen}
          label="Participants"
          onClick={onToggleParticipants}
        />

        <ControlButton
          icon={<MessageSquare size={18} />}
          active={isChatOpen}
          label="Chat"
          onClick={onToggleChat}
        />

        <span className="hidden sm:contents">
          <ControlButton
            icon={<Settings size={18} />}
            active={false}
            label="Settings"
            onClick={onSettings}
          />
        </span>

        <ControlButton
          icon={<MoreHorizontal size={18} />}
          active={false}
          label="More options"
          onClick={onMore}
        />

        <div className="mx-0.5 h-7 w-px bg-white/15" />

        <button
          type="button"
          aria-label="End call"
          onClick={onLeave}
          className="flex h-[42px] items-center gap-1.5 rounded-full bg-meeting-red px-4
            text-sm font-semibold text-white transition-all duration-150
            hover:bg-meeting-redHover active:scale-95"
        >
          <PhoneOff size={15} />
          <span className="hidden sm:inline">End Call</span>
        </button>
      </div>
    </div>
  );
};

export default BottomControls;