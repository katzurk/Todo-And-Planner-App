import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { EditUsernameModal } from "./EditUsernameModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

export const MyProfile = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [usernameModal, setUsernameModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="home">
      <div>
        <h1>
          <i className="bi bi-person-circle usericon"></i> Profile
        </h1>
        <div>
          {currentUser && (
            <div>
              <h4>username: {currentUser.username}</h4>
              <h4>email: {currentUser.email}</h4>
              <h4>
                registration date:{" "}
                {new Date(currentUser.date_registered).toLocaleDateString()}
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="home-side">
        <button onClick={() => setUsernameModal(true)}>Change username</button>
        <button onClick={() => setPasswordModal(true)}>Reset password</button>
      </div>

      <EditUsernameModal
        usernameModal={usernameModal}
        setUsernameModal={setUsernameModal}
      />
      <ResetPasswordModal
        passwordModal={passwordModal}
        setPasswordModal={setPasswordModal}
      />
    </div>
  );
};
