import { useNavigate } from "react-router-dom";
import useLogout from "../features/auth/hooks/useLogout";

const Dashboard = () => {
  const navigate = useNavigate();

  const { logout } = useLogout();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Dashboard;