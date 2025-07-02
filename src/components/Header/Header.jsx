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
    <header className="h-auto w-full">
      <Container>
        <nav className="h-auto w-full p-2.5 border-b border-[#D5D5D5]">
          <div className="h-auto w-full flex justify-between items-center gap-2.5">
            <Link to={"/"}>
              <Logo />
            </Link>
            <ul className="h-auto w-fit flex justify-between items-center gap-2.5">
              {links.map(
                (link) =>
                  link.active && (
                    <li key={link.name}>
                      <NavLink
                        to={link.source}
                        className={
                          "h-auto w-full py-2.5 px-5 block border border-[#D5D5D5] rounded-md"
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
                    className="h-auto w-full py-2.5 px-5 block border border-[#D5D5D5] rounded-md cursor-pointer"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
