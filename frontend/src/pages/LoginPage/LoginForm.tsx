import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: LoginFormData) => {
    await UserService.logInUser(data);
    navigate("/my-lists");
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="form-element">
        <label>Email:</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="form-element">
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <input type="submit" value="Log in" />
    </form>
  );
};
