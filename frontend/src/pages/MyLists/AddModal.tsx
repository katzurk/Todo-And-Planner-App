import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ListService } from "../../services/ListService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddModalProps {
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddModal = ({ addModal, setAddModal }: AddModalProps) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");

  const handleClose = () => {
    setAddModal(false);
    setTitle("");
  };

  const addMutation = useMutation({
    mutationFn: (title: string) => ListService.addList(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  const handleSubmitList = () => {
    addMutation.mutate(title);
    setAddModal(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Modal show={addModal} onHide={handleClose} contentClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>New List</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Title:</p>
        <input type="text" value={title} onChange={handleTitleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleSubmitList}>Save Changes</button>
      </Modal.Footer>
    </Modal>
  );
};
