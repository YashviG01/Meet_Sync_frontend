import { useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

/**
 * In-call chat sidebar.
 * Slides in from the right when isOpen is true.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Array}    props.messages       - from useMeeting: [{ senderName, message, timestamp }]
 * @param {string}   props.draft          - controlled input value (= message from useMeeting)
 * @param {Function} props.onDraftChange  - (value: string) → void (= handleTyping)
 * @param {Function} props.onSend         - () → void (= handleSendMessage)
 * @param {string}   [props.typingUser]   - name of user currently typing
 */
const ChatSidebar = ({
  isOpen,
  onClose,
  messages = [],
  draft,
  onDraftChange,
  onSend,
  typingUser,
}) => {
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="flex w-[300px] flex-shrink-0 flex-col overflow-hidden
      border-l border-white/[0.07] bg-[#181b28] animate-[slideIn_0.25s_ease-out] sm:w-[310px]">

      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
        <span className="text-sm font-semibold text-white">In-call Messages</span>
        <button
          aria-label="Close chat"
          onClick={onClose}
          className="rounded p-0.5 text-[#7a8099] transition-colors hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      {/* Notice */}
      <div className="flex-shrink-0 border-b border-white/[0.07] px-4 py-2.5">
        <p className="text-[11.5px] leading-snug text-[#4a5070]">
          Messages can only be seen by people in the call and are deleted when
          the call ends.
        </p>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-3.5
        [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">

        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
            <span className="text-sm text-[#7a8099]">No messages yet</span>
            <span className="text-xs text-[#4a5070]">
              Say something to start the conversation
            </span>
          </div>
        ) : (
          messages.map((msg, i) => {
            // Messages with no senderName = sent by current user (from engine layer)
            const isMe = !msg.senderName;

            return (
              <div
                key={i}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                {!isMe && (
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#4f8ef7]">
                      {msg.senderName}
                    </span>
                    <span className="text-[10.5px] text-[#4a5070]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-[10px] px-2.5 py-2 text-[13px] leading-relaxed text-white
                    ${isMe
                      ? "rounded-tr-sm bg-blue-500"
                      : "rounded-tl-sm bg-white/[0.06]"
                    }`}
                >
                  {msg.message}
                </div>

                {isMe && (
                  <span className="mt-1 text-[10.5px] text-[#4a5070]">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            );
          })
        )}

        {typingUser && (
          <p className="text-[12px] italic text-[#7a8099]">
            {typingUser} is typing…
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex flex-shrink-0 items-center gap-2 border-t border-white/[0.07] px-3 py-2.5">
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Send a message"
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-2
            text-[13px] text-white placeholder-[#4a5070] outline-none
            transition-colors focus:border-[#4f8ef7]/40"
        />
        <button
          aria-label="Send"
          onClick={onSend}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
            bg-[#4f8ef7] text-white transition-all hover:bg-blue-500 active:scale-95"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;