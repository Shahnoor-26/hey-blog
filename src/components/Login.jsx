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
      updateError(error);
    }
  };

  return (
    <section className="min-h-[60vh] md:min-h-[80vh] w-full flex justify-center items-center bg-secondary-color text-primary-text text-center font-semibold antialiased select-none">
      <div className="w-fit sm:w-1/2 md:w-3/5 xl:w-2/5 mt-5 mb-5 p-2.5 md:p-5 bg-primary-color border-secondary-accent border md:border-2 rounded text-base md:text-lg xl:text-xl">
        <div className="m-2 p-2 space-y-2 text-center">
          <Logo className="text-xl md:text-2xl xl:text-3xl font-bold" />{" "}
          {/* Insert Logo */}
          <h2 className="text-primary-accent text-xl md:text-2xl xl:text-3xl font-bold">
            Login Into Your Account
          </h2>
          <p className="text-sm md:text-base xl:text-lg">
            <span>Don't have an account?&nbsp;</span>
            <Link
              to={"/signup"}
              className="transition-all duration-200 ease-in-out focus:outline-none focus:text-primary-accent focus:underline hover:text-primary-accent hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="m-2 space-y-2 md:space-y-4"
        >
          <Input
            label="Email: "
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            {...register("email", {
              required: true,
              validate: {
                pattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            className="w-full mb-2 px-2 py-1 bg-secondary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", { required: true })}
            className="w-full mb-2 px-2 py-1 bg-secondary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
          />
          <div className="flex gap-2.5">
            <Button
              children={"Login"}
              type="submit"
              className="min-h-fit w-1/2 px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
            <Button
              children={"Reset"}
              type="reset"
              className="min-h-fit w-1/2 px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
        </form>
        {error && (
          <div className="m-2 p-2 border-primary-accent border md:border-2 rounded space-y-2 text-xs md:text-sm xl:text-base text-center text-wrap">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
