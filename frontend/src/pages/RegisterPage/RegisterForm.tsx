import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState<Error | null>(null);

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await signUp(data);
    } catch (error: any) {
      setError(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

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
      {!!error && <p>{error.message}</p>}
      <input type="submit" value="Sign up" />
    </form>
  );
};
