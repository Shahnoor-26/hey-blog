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

        if (userdata) dispatch(loginStore(userdata));
        navigate("/");
      }
    } catch (error) {
      updateError(error.message);
    }
  };

  return (
    <div>
      <div>
        <Logo />
      </div>
      <h2>Signup To Create Account</h2>
      <p>
        <span>Already have an account</span>
        <Link to={"/login"} className="">
          Login
        </Link>
      </p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(create)}>
        <div>
          <Input
            label="Name: "
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
        </div>
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
          <Button children={"Create Account"} type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
