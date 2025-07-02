import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../appwrite/authentication.js";
import { login as loginStore } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, updateError] = useState();

  const login = async (data) => {
    try {
      updateError("");
      const session = await Auth.login(data);

      if (session.current) {
        const userdata = await Auth.currentUser();

        if (userdata) {
          dispatch(loginStore(userdata));
          navigate(0);
        }
      }
    } catch (error) {
      updateError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <Logo />
        </div>
        <h2>Sign Into Your Account</h2>
        <p>
          <span>Don&apos;t have an account?&nbsp;</span>
          <Link to={"/signup"} className="">
            Create Account
          </Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  pattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>
          <div>
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <div>
            <Button type="submit" children={"Sign In"} className="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
