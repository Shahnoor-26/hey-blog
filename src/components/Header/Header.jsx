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
      console.log(`website service error: ${error.message}`);
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
      console.log(`website service error: ${error.message}`);
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
    <header className="sticky top-0 z-20 bg-primary-color text-primary-text font-semibold antialiased select-none">
      <nav className="relative h-full w-full p-2 md:p-4 flex justify-between items-center gap-2.5 border-secondary-accent border-b md:border-b-2 text-base md:text-lg xl:text-xl">
        <section>
          <Link to={"/"} tabIndex={-1}>
            <Logo className="h-8 md:h-10 xl:h-12 w-fit" />
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
                          isActive && "ring-primary-accent ring-1 md:ring-2"
                        } min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2`
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
                  className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
                />
              </li>
            )}
          </ul>
          <div className="h-auto w-auto flex items-center gap-2.5">
            <Button
              className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 md:hidden bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
              onClick={hamburger}
            >
              <MenuIcon
                className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                color="#693c9d"
              />
            </Button>
            <Button
              className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
              onClick={switchStatus}
            >
              {themeStatus ? (
                <MoonIcon
                  className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                  color="#693c9d"
                />
              ) : (
                <SunIcon
                  className="h-5 md:h-6 xl:h-7 w-5 md:w-6 xl:w-7"
                  color="#693c9d"
                />
              )}
            </Button>
          </div>
        </section>
        <section
          id="menu-box"
          className="absolute top-0 right-full h-screen w-full md:hidden backdrop-blur-xl transition-all duration-200 ease-in-out"
        >
          <ul className="h-full w-full flex flex-col justify-center items-center gap-5 text-xl text-center text-primary-accent">
            {status && (
              <li
                className="h-auto w-4/5 sm:w-3/5 border-secondary-accent border-2 rounded-full transition-all duration-200 ease-in-out outline-none focus:ring-primary-accent focus:ring-2"
                onClick={hamburger}
              >
                <Logout
                  children={"Logout"}
                  className="block h-full w-full p-2 outline-none"
                />
              </li>
            )}
            {links?.map(
              (link) =>
                link.active && (
                  <li
                    key={link.name}
                    className="h-auto w-4/5 sm:w-3/5 border-secondary-accent border-2 rounded-full transition-all duration-200 ease-in-out outline-none focus:ring-primary-accent focus:ring-2"
                    onClick={hamburger}
                  >
                    <Link
                      to={link.source}
                      className="block h-full w-full p-2 outline-none"
                    >
                      {link.name}
                    </Link>
                  </li>
                )
            )}
            <li className="h-auto w-4/5 sm:w-3/5 border-secondary-accent border-2 rounded-full transition-all duration-200 ease-in-out outline-none focus:ring-primary-accent focus:ring-2">
              <Button
                className="block h-full w-full p-2 outline-none"
                onClick={hamburger}
              >
                <CrossIcon className="h-7 w-7 mx-auto" color="#fea10a" />
              </Button>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Header;
