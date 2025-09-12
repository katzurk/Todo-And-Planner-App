import { useState } from "react";
import { Modal } from "react-bootstrap";
import { UserService } from "../../services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UsernameModalProps {
  usernameModal: boolean;
  setUsernameModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditUsernameModal = ({
  usernameModal,
  setUsernameModal,
}: UsernameModalProps) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleClose = () => {
    setUsernameModal(false);
    setUsername("");
  };

  const changeMutation = useMutation({
    mutationFn: (newUsername: string) => UserService.editUsername(newUsername),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setUsernameModal(false);
    },
    onError: (err: Error) => {
      setError(err);
    },
  });

  const handleChangeUsername = () => {
    changeMutation.mutate(username);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Modal
      show={usernameModal}
      onHide={handleClose}
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Change username</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>New username:</p>
        <input type="text" value={username} onChange={handleUsername}></input>
        {error && <p>{error.message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
        <button className="edit-btn" onClick={handleChangeUsername}>
          Change
        </button>
      </Modal.Footer>
    </Modal>
  );
};
