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
    <section className="min-h-[60vh] md:min-h-[80vh] w-full flex justify-center items-center text-center font-semibold antialiased select-none">
      <div className="w-fit sm:w-1/2 md:w-3/5 xl:w-2/5 mt-5 mb-5 p-2.5 md:p-5 border md:border-2 rounded text-base md:text-lg xl:text-xl">
        <div className="m-2 p-2 space-y-2 text-center">
          <Logo className="text-xl md:text-2xl xl:text-3xl font-bold" />{" "}
          {/* Insert Logo */}
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold">
            Signup To Create Account
          </h2>
          <p className="text-sm md:text-base xl:text-lg">
            <span>Already have an account?&nbsp;</span>
            <Link
              to={"/login"}
              className="transition-all duration-200 ease-in-out hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(create)}
          className="m-2 space-y-2 md:space-y-4"
        >
          <Input
            label="Name: "
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className="w-full mb-2 px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
          />
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
            className="w-full mb-2 px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", { required: true })}
            className="w-full mb-2 px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
          />
          <div className="flex gap-2.5">
            <Button
              children={"Create"}
              type="submit"
              className="min-h-fit w-1/2 px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2"
            />
            <Button
              children={"Reset"}
              type="reset"
              className="min-h-fit w-1/2 px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2"
            />
          </div>
        </form>
        {error && (
          <div className="m-2 p-2 border md:border-2 rounded space-y-2 text-xs md:text-sm xl:text-base text-center text-wrap">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Signup;
