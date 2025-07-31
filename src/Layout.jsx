import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Auth } from "./appwrite/authentication.js";
import { login, logout } from "./store/authSlice.js";
import { Spin, Header, Footer } from "./components/index.js";
import { themeUpdate } from "./store/themeSlice.js";

const Layout = () => {
  const [spin, updateSpin] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentUser()
      .then((userdata) =>
        userdata ? dispatch(login(userdata)) : dispatch(logout())
      )
      .catch((error) => console.log(error))
      .finally(() => updateSpin(false));

    const status = localStorage.getItem("dark-status")?.includes("true");
    const choice = status ? "dark" : "light";

    dispatch(themeUpdate({ themeStatus: status }));
    document.querySelector("html").setAttribute("data-status", choice);
  }, []);

  return (
    <>
      <Header />
      <main>
        {spin && <Spin />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
