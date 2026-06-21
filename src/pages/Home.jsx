import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>MeetSync</h1>

      <button
        onClick={() =>
          navigate("/schedule")
        }
      >
        Schedule Meeting
      </button>

      <button
        onClick={() =>
          navigate("/join")
        }
      >
        Join Meeting
      </button>

      <button
        onClick={() =>
          navigate("/meetings")
        }
      >
        My Meetings
      </button>

      <button
        onClick={() =>
          navigate("/start")
        }
      >
        Start Meeting
      </button>
    </div>
  );
};

export default Home;