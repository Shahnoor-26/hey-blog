import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeUpdate } from "../../store/themeSlice.js";
import { Button, Logo, Logout } from "../index.js";
import { CrossIcon, MenuIcon, MoonIcon, SunIcon } from "../Icons.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const themeStatus = useSelector((state) => state.theme.themeStatus);

  const switchStatus = () => {
    try {
      const html = document.querySelector("html");

      if (themeStatus) {
        html.setAttribute("data-status", "light");
        localStorage.setItem("dark-status", "false");
        dispatch(themeUpdate({ themeStatus: false }));
      } else {
        html.setAttribute("data-status", "dark");
        localStorage.setItem("dark-status", "true");
        dispatch(themeUpdate({ themeStatus: true }));
      }
    } catch (error) {
      console.log("");
    }
  };

  const hamburger = () => {
    try {
      const menu = document.getElementById("menu-box");

      if (menu.classList.contains("right-full")) {
        menu.classList.replace("right-full", "right-0");
      } else {
        menu.classList.replace("right-0", "right-full");
      }
    } catch (error) {
      console.log("");
    }
  };

  const links = [
    {
      name: "Home",
      source: "/",
      active: true,
    },
    {
      name: "Login",
      source: "/login",
      active: !status,
    },
    {
      name: "Signup",
      source: "/signup",
      active: !status,
    },
    {
      name: "All Articles",
      source: "/articles",
      active: status,
    },
    {
      name: "Add Article",
      source: "/add-article",
      active: status,
    },
  ];

  return (
    <header className="sticky top-0 z-20 h-auto w-full font-semibold antialiased select-none">
      <nav className="relative h-auto w-full px-2 py-4 flex justify-between items-center gap-2.5 border-b md:border-b-2 text-base md:text-lg xl:text-xl">
        <section>
          <Link to={"/"} tabIndex={-1}>
            <Logo />
          </Link>
        </section>
        <section className="h-auto w-auto flex items-center gap-2.5">
          <ul className="h-auto w-auto hidden md:flex items-center gap-2.5">
            {links?.map(
              (link) =>
                link.active && (
                  <li key={link.name}>
                    <NavLink
                      to={link.source}
                      className={({ isActive }) =>
                        `${
                          isActive && "ring-1 md:ring-2"
                        } px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                )
            )}
            {status && (
              <li>
                <Logout
                  children={"Logout"}
                  className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2"
                />
              </li>
            )}
          </ul>
          <div className="h-auto w-auto flex items-center gap-2.5">
            <Button
              className="md:hidden px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2"
              onClick={hamburger}
            >
              <MenuIcon
                className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                stroke="2"
              />
            </Button>
            <Button
              className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out focus:ring-1 md:focus:ring-2"
              onClick={switchStatus}
            >
              {themeStatus ? (
                <MoonIcon
                  className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                  stroke="2"
                />
              ) : (
                <SunIcon
                  className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                  stroke="2"
                />
              )}
            </Button>
          </div>
        </section>
        <section
          id="menu-box"
          className="absolute top-0 right-full h-screen w-full flex md:hidden justify-center items-center backdrop-blur-xs transition-all duration-200 ease-in-out"
        >
          <ul className="h-auto w-full text-xl sm:text-2xl text-center space-y-4">
            {status && (
              <li
                className="h-auto w-4/5 sm:w-3/5 mx-auto border-2 rounded-full transition-all duration-200 ease-in-out focus:ring-2"
                onClick={hamburger}
              >
                <Logout
                  children={"Logout"}
                  className="block h-full w-full p-2"
                />
              </li>
            )}
            {links?.map(
              (link) =>
                link.active && (
                  <li
                    key={link.name}
                    className="h-auto w-4/5 sm:w-3/5 mx-auto border-2 rounded-full transition-all duration-200 ease-in-out focus:ring-2"
                    onClick={hamburger}
                  >
                    <Link to={link.source} className="block h-full w-full p-2">
                      {link.name}
                    </Link>
                  </li>
                )
            )}
            <li>
              <Button
                className="h-auto w-4/5 sm:w-3/5 mx-auto p-2 border-2 rounded-full transition-all duration-200 ease-in-out focus:ring-2"
                onClick={hamburger}
              >
                <CrossIcon
                  className="h-7 w-7 sm:h-8 sm:w-8 mx-auto"
                  stroke="2"
                />
              </Button>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Header;
