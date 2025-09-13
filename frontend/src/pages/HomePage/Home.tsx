import { useContext } from "react";
import { Clock } from "./Clock";
import { RecentAdd } from "./RecentAdd/RecentAdd";
import { AuthContext } from "../../context/AuthContext";

export const Home = () => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div>Hello, {currentUser?.username}</div>
          <div>
            <Clock />
            <RecentAdd />
          </div>
        </div>
      ) : (
        <div>not logged in</div>
      )}
    </div>
  );
};
