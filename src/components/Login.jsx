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
    <section className="h-screen w-full flex justify-center items-center font-semibold antialiased select-none">
      <div className="h-3/5 md:h-3/4 xl:h-4/5 w-11/12 md:w-3/4 xl:w-3/5 p-2 flex justify-center items-center text-sm md:text-base xl:text-lg border md:border-2 rounded-md xl:rounded-xl">
        <div className="h-auto w-full space-y-4">
          <div className="h-auto w-full space-y-2 text-center truncate">
            <Logo />
            <h2 className="text-xl md:text-2xl xl:text-3xl truncate font-bold">
              Login Into Your Account
            </h2>
            <p className="text-xs md:text-sm xl:text-base truncate">
              <span>Don&apos;t have an account?&nbsp;</span>
              <Link to={"/signup"} className="hover:underline">
                Create Account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(login)} className="space-y-4">
            <div className="h-auto w-full px-2">
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
                className="h-auto w-3/4 md:w-4/5 xl:w-[85%] px-2.5 py-1.5 border md:border-2 rounded md:rounded-md"
              />
            </div>
            <div className="h-auto w-full px-2">
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="h-auto w-3/4 md:w-4/5 xl:w-[85%] px-2.5 py-1.5 border md:border-2 rounded md:rounded-md"
              />
            </div>
            <div className="h-auto w-full px-2 flex justify-center gap-4">
              <Button
                type="submit"
                children={"Login"}
                className="px-6 md:px-8 xl:px-10 py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2"
              />
              <Button
                type="reset"
                children={"Reset"}
                className="px-6 md:px-8 xl:px-10 py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2"
              />
            </div>
          </form>
        </div>
      </div>
      {error && <p>{error}</p>}
    </section>
  );
};

export default Login;
