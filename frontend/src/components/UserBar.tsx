import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const UserBar = () => {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await UserService.logOutUser();
    setAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="user-bar">
        <h3>User</h3>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    );
  } else {
    return (
      <div className="user-bar">
        <h3>User</h3>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </button>
      </div>
    );
  }
};
