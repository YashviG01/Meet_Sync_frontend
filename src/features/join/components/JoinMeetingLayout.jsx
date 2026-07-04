const JoinMeetingLayout = ({
  roomId,
  loading,
  error,
  handleChange,
  handleJoin,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="w-full max-w-md rounded-xl border p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Join Meeting
        </h1>

        <input
          type="text"
          placeholder="Enter Meeting ID"
          value={roomId}
          onChange={handleChange}
          className="mb-4 w-full rounded border px-4 py-2"
        />

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <button
          onClick={handleJoin}
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          {loading ? "Joining..." : "Join Meeting"}
        </button>

      </div>

    </div>
  );
};

export default JoinMeetingLayout;