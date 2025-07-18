import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(logIn)}>
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
