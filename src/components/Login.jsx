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
    <section className="h-screen w-full flex flex-col justify-center items-center gap-2.5 font-semibold antialiased select-none">
      <div className="h-auto w-auto flex justify-center items-center text-base md:text-lg xl:text-xl border md:border-2 rounded md:rounded-md">
        <div className="h-auto w-auto m-8 md:m-12 xl:m-24 space-y-4 md:space-y-8">
          <div className="text-center truncate space-y-2 md:space-y-4">
            <Logo /> {/* Logo will be added soon */}
            <h2 className="text-xl md:text-2xl xl:text-3xl truncate font-bold">
              Login Into Your Account
            </h2>
            <p className="text-sm md:text-base xl:text-lg truncate">
              <span>Don&apos;t have an account?&nbsp;</span>
              <Link to={"/signup"} className="hover:underline">
                Create Account
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(login)}
            className="h-auto w-auto space-y-4 md:space-y-8"
          >
            <div>
              <Input
                label="Email:"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    pattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                className="h-auto w-full px-2 xl:px-4 py-1 xl:py-2 border md:border-2 rounded md:rounded-md outline-none"
              />
            </div>
            <div>
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="h-auto w-full px-2 xl:px-4 py-1 xl:py-2 border md:border-2 rounded md:rounded-md outline-none"
              />
            </div>
            <div className="h-auto w-full flex justify-between items-center space-x-2 md:space-x-4">
              <Button
                type="submit"
                children={"Login"}
                className="h-auto w-1/2 p-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer focus:ring-1 md:focus:ring-2"
              />
              <Button
                type="reset"
                children={"Reset"}
                className="h-auto w-1/2 p-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer focus:ring-1 md:focus:ring-2"
              />
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div className="h-auto max-w-1/2 p-2 border md:border-2 rounded md:rounded-md">
          <p className="text-xs md:text-sm xl:text-base text-center text-wrap break-words">
            {error}
          </p>
        </div>
      )}
    </section>
  );
};

export default Login;
