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
      name: "Create Account",
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
    <header>
      <Container>
        <nav>
          <div>
            <Link to={"/"}>
              <Logo />
            </Link>
            <ul>
              {links.map(
                (link) =>
                  link.active && (
                    <li key={link.name}>
                      <NavLink to={link.source}>{link.name}</NavLink>
                    </li>
                  )
              )}
              {status && (
                <li>
                  <Logout />
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
