import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components";
import { Auth } from "./appwrite/authentication.js";
import { login, logout } from "./store/authSlice.js";

const Layout = () => {
  const [spin, updateSpin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentUser()
      .then((userdata) => {
        if (userdata) dispatch(login({ userdata }));
        else dispatch(logout());
      })
      .catch((error) => console.log("Not Found User! ", error))
      .finally(() => updateSpin(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
