import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(signUp)}>
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
