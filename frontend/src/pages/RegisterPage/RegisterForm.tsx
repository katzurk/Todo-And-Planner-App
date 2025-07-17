import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    await UserService.registerUser;
    setAuthenticated(true);
    navigate("/my-lists");
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="form-element">
        <label>Email:</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="form-element">
        <label>Username:</label>
        <input {...register("username")} />
        <p>{errors.username?.message}</p>
      </div>
      <div className="form-element">
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <div className="form-element">
        <label>Confirm password:</label>
        <input type="password" {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <input type="submit" value="Log in" />
    </form>
  );
};
