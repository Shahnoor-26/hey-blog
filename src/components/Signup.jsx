import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../appwrite/authentication.js";
import { login as loginStore } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, updateError] = useState();

  const create = async (data) => {
    try {
      updateError("");
      const session = await Auth.signup(data);

      if (session) {
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
    <section className="h-screen w-full mt-10 mb-10 flex flex-col justify-center items-center gap-2.5 font-semibold antialiased select-none">
      <div className="h-auto w-auto flex justify-center items-center text-base md:text-lg xl:text-xl border md:border-2 rounded md:rounded-md">
        <div className="h-auto w-auto m-4 md:m-8 xl:m-12 space-y-4 md:space-y-8">
          <div className="text-center truncate space-y-2 md:space-y-4">
            <Logo /> {/* Logo will be added soon */}
            <h2 className="text-xl md:text-2xl xl:text-3xl truncate font-bold">
              Signup To Create Account
            </h2>
            <p className="text-sm md:text-base xl:text-lg truncate">
              <span>Already have an account?&nbsp;</span>
              <Link to={"/signup"} className="hover:underline">
                Login
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(create)}
            className="h-auto w-auto space-y-4 md:space-y-8"
          >
            <div>
              <Input
                label="Name:"
                type="text"
                placeholder="Enter your email"
                {...register("name", { required: true })}
                className="h-auto w-full px-2 xl:px-4 py-1 xl:py-2 border md:border-2 rounded md:rounded-md outline-none"
              />
            </div>
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
                children={"Create"}
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

export default Signup;
