import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import JoinMeeting from "./pages/JoinMeeting";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/join"
          element={<JoinMeeting />}
        />

        <Route
          path="/room/:roomId"
          element={<MeetingRoom />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;