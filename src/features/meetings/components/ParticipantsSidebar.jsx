import { X, Search, Mic, MicOff, Video, VideoOff, Hand } from "lucide-react";

/**
 * Collapsible participants sidebar.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Array}    props.participants  - [{ id, name, isHost, isMicOn, isVideoOn, isHandRaised, isSpeaking }]
 * @param {string}   props.search
 * @param {Function} props.onSearchChange
 */
const ParticipantsSidebar = ({
  isOpen,
  onClose,
  participants = [],
  search,
  onSearchChange,
}) => {
  console.log("Participants Sidebar:", participants);
  if (!isOpen) return null;

  const filtered = participants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex w-[300px] flex-shrink-0 animate-slideIn flex-col overflow-hidden
        border-l border-white/10 bg-meeting-panel sm:w-[310px]"
    >
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-4 py-3.5">
        <span className="text-sm font-semibold text-white">
          Participants ({participants.length})
        </span>
        <button
          aria-label="Close participants"
          onClick={onClose}
          className="rounded p-0.5 text-meeting-muted transition-colors duration-150 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Search size={14} className="text-meeting-dim" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search participants"
            className="w-full bg-transparent text-[13px] text-white placeholder-meeting-dim outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">


        {
        filtered.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-white/5"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className={`h-2 w-2 flex-shrink-0 rounded-full ${
                  p.isSpeaking ? "bg-green-400" : "bg-transparent"
                }`}
              />
              <span className="truncate text-[13px] text-white">{p.name}</span>
              {p.isHost && (
                <span className="flex-shrink-0 rounded-md bg-meeting-accent px-1.5 py-0.5 text-[9px] font-bold text-white">
                  HOST
                </span>
              )}
            </div>

            <div className="flex flex-shrink-0 items-center gap-1.5 text-meeting-muted">
              {p.isHandRaised && <Hand size={14} className="text-amber-400" />}
              {p.isMicOn ? <Mic size={14} /> : <MicOff size={14} className="text-meeting-red" />}
              {p.isVideoOn ? <Video size={14} /> : <VideoOff size={14} className="text-meeting-red" />}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="px-2.5 py-4 text-center text-[13px] text-meeting-dim">
            No participants found
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipantsSidebar;