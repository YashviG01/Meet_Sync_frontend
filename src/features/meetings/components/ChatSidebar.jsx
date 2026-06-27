// meeting/components/ChatSidebar.jsx

/**
 * Chat sidebar — message history, typing indicator, and input.
 *
 * @param {Object}   props
 * @param {Array}    props.messages          - [{ senderName, message, timestamp }]
 * @param {string}   props.typingUser        - Name of user currently typing
 * @param {string}   props.message           - Current input value
 * @param {Function} props.onTyping          - Called with new input value on change
 * @param {Function} props.onSendMessage     - Called on send button click
 */
const ChatSidebar = ({
  messages,
  typingUser,
  message,
  onTyping,
  onSendMessage,
}) => {
  return (
    <div>
      <h3>Chat</h3>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderName}</strong>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      {typingUser && <p>{typingUser} is typing...</p>}

      <input
        value={message}
        onChange={(e) => onTyping(e.target.value)}
      />
      <button onClick={onSendMessage}>Send</button>
    </div>
  );
};

export default ChatSidebar;