import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const UserBar = () => {
  const { isAuthenticated, setAuthenticated, currentUser, setCurrentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await UserService.logOutUser();
    setAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div className="user-bar">
      <h3>{currentUser && <h3>Hi {currentUser.username}</h3>}</h3>
      {isAuthenticated ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
