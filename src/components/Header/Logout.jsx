import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../appwrite/authentication.js";
import { logout as logoutStore } from "../../store/authSlice.js";
import { Button, Spin } from "../index.js";

const Logout = ({ children, className = "" }) => {
  const [spin, updateSpin] = useState(false);

  const dispatch = useDispatch();

  const authout = () => {
    updateSpin(true);

    Auth.logout()
      .then(() => dispatch(logoutStore()))
      .catch((error) => console.log(`website service error: ${error.message}`))
      .finally(() => updateSpin(false));
  };

  return (
    <Button className={className} onClick={authout}>
      {spin && <Spin />}
      {children}
    </Button>
  );
};

export default Logout;
