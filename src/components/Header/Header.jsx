import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo, Logout } from "../index.js";

const Header = () => {
  const status = useSelector((state) => state.auth.status);

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
    <header className="sticky top-0 z-20 h-auto w-full font-semibold antialiased">
      <nav className="h-auto w-full p-2 bg-primary text-text-primary border-b-2 border-border">
        <div className="h-auto w-full px-4 py-2 flex justify-between items-center gap-2.5">
          <Link to={"/"}>
            <Logo className="text-3xl font-serif" /> {/* Logo Will Change */}
          </Link>
          <ul className="h-auto w-auto flex gap-2.5">
            {links.map(
              (link) =>
                link.active && (
                  <li key={link.name}>
                    <NavLink
                      to={link.source}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-secondary ring-2 ring-accent-primary"
                            : "bg-accent-secondary focus:ring-2 focus:ring-accent-primary"
                        } block px-5 py-2.5 border-2 border-border rounded-xl`
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
                  className="block px-5 py-2.5 border-2 border-border rounded-xl bg-accent-secondary focus:ring-2 focus:ring-accent-primary"
                />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
