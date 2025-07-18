import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const UserBar = () => {
  const { currentUser, isAuthenticated, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="user-bar">
      <h3>{currentUser && <h3>Hi {currentUser.username}</h3>}</h3>
      {isAuthenticated ? (
        <button onClick={logOut}>Log Out</button>
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
