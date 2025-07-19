import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState<Error | null>(null);

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

  const handleLogIn = async (data: LoginFormData) => {
    try {
      await logIn(data);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogIn)}>
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
      {!!error && <p>{error.message}</p>}
      <input type="submit" value="Log in" />
    </form>
  );
};
