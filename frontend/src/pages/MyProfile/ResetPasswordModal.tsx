import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/UserService";
import { Modal } from "react-bootstrap";

interface PasswordModalProps {
  passwordModal: boolean;
  setPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResetPasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordModal = ({
  passwordModal,
  setPasswordModal,
}: PasswordModalProps) => {
  const [error, setError] = useState<Error | null>(null);

  const schema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword")], "Your new passwords do not match."),
  });

  const changeMutation = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      UserService.editPassword(data.currentPassword, data.newPassword),
    onSuccess: () => {
      setPasswordModal(false);
    },
    onError: (err: Error) => {
      setError(err);
    },
  });

  const handleReset = (data: ResetPasswordFormData) => {
    changeMutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      show={passwordModal}
      onHide={() => setPasswordModal(false)}
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Reset password</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          id="reset-password"
          className="unstyled-form"
          onSubmit={handleSubmit(handleReset)}
        >
          <p>Current password:</p>
          <input type="text" {...register("currentPassword")}></input>
          <p>{errors.currentPassword?.message}</p>

          <p>New password:</p>
          <input type="text" {...register("newPassword")}></input>
          <p>{errors.newPassword?.message}</p>

          <p>Confirm new password:</p>
          <input type="text" {...register("confirmPassword")}></input>
          <p>{errors.confirmPassword?.message}</p>

          {!!error && <p>{error.message}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setPasswordModal(false)}>Close</button>
        <button type="submit" form="reset-password" className="edit-btn">
          Change
        </button>
      </Modal.Footer>
    </Modal>
  );
};
