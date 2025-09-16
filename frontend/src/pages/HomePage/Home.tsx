import { useContext } from "react";
import { Clock } from "./Clock";
import { RecentAdd } from "./RecentAdd/RecentAdd";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      {isAuthenticated ? (
        <div className="home">
          <div className="home-element welcome-box">
            <h3>Hello, {currentUser?.username}</h3>
            <div className="listing">
              <Link to="/my-lists" className="link">
                <h4>• My lists</h4>
              </Link>
              <Link to="/my-profile" className="link">
                <h4>• My profile</h4>
              </Link>
            </div>
          </div>
          <div className="home-side">
            <Clock />
            <RecentAdd />
          </div>
        </div>
      ) : (
        <div className="home">
          <div className="home-element">
            <h3>Welcome to the ToDo Planner website.</h3>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/register")}>Sign up</button>
          </div>
        </div>
      )}
    </div>
  );
};
