import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components";
import { Auth } from "./appwrite/authentication.js";
import { themeUpdate } from "./store/themeSlice.js";
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

    const status = localStorage.getItem("dark-status")?.includes("true");
    const choice = status ? "dark" : "light";
    dispatch(themeUpdate({ themeStatus: status }));
    document.querySelector("html").setAttribute("data-status", choice);
  }, []);

  return spin ? (
    <>
      <Header />
      <main>
        <div>Loading</div>
      </main>
      <Footer />
    </>
  ) : (
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
