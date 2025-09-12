import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const MyProfile = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <i className="bi bi-person-circle usericon"></i>
      <h1>Profile</h1>
      <h4>username: {currentUser?.username}</h4>
      <h4>email: {currentUser?.email}</h4>
      <h4>registration date: {typeof currentUser?.date_registered}</h4>
      <button>Change username</button>
      <button>Reset password</button>
    </div>
  );
};
