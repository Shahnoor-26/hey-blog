import { useDispatch } from "react-redux";
import { Auth } from "../../appwrite/authentication.js";
import { logout } from "../../store/authSlice.js";
import { Button } from "../index.js";

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Auth.logout()
      .then(() => dispatch(logout()))
      .catch((error) => console.log("Logout Button Error ", error));
  };
  return <Button children={"Logout"} className="" />;
};

export default Logout;
