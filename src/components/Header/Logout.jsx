import { useDispatch } from "react-redux";
import { Auth } from "../../appwrite/authentication.js";
import { logout as logoutStore } from "../../store/authSlice.js";
import { Button } from "../index.js";

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Auth.logout()
      .then(() => dispatch(logoutStore()))
      .catch((error) => console.log("Logout Button Error ", error));
  };
  return <Button children={"Logout"} className="" onClick={handleLogout} />;
};

export default Logout;
