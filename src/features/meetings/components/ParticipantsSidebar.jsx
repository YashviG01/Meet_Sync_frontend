// meeting/components/ParticipantsSidebar.jsx

/**
 * Sidebar showing the participant count and list of active users.
 *
 * @param {Object}   props
 * @param {number}   props.participantCount
 * @param {Array}    props.users            - [{ socketId, userName }]
 */
const ParticipantsSidebar = ({ participantCount, users }) => {
  return (
    <div>
      <h3>Participants: {participantCount}</h3>

      {users.map((user) => (
        <div key={user.socketId}>{user.userName}</div>
      ))}
    </div>
  );
};

export default ParticipantsSidebar;