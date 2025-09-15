import { useContext } from "react";
import { Clock } from "./Clock";
import { RecentAdd } from "./RecentAdd/RecentAdd";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      {isAuthenticated ? (
        <div className="home">
          <div className="home-element welcome-box">
            Hello, {currentUser?.username}
          </div>
          <div className="home-element side">
            <Clock />
            <RecentAdd />
          </div>
        </div>
      ) : (
        <div className="home">
          <h3>not logged in</h3>
          <div>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/register")}>Sign up</button>
          </div>
        </div>
      )}
    </div>
  );
};
