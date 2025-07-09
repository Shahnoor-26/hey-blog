import { Link } from "react-router-dom";
import { Logo } from "../index.js";

const Footer = () => {
  return (
    <footer className="w-full p-2 bg-secondary text-text-primary border-t-2 border-border antialiased select-none">
      <div className="h-full w-full px-4 mb-20 flex">
        <section className="h-full w-1/2 mt-10">
          <Link className="block mb-2.5">
            <Logo className="text-2xl font-semibold font-serif" />
            {/* Logo Will Change */}
          </Link>
          <ul className="mb-5 flex gap-2.5">
            <li>
              <Link
                to={"#"}
                className="hover:text-text-secondary hover:underline"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="hover:text-text-secondary hover:underline"
              >
                Discord
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="hover:text-text-secondary hover:underline"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="hover:text-text-secondary hover:underline"
              >
                Github
              </Link>
            </li>
          </ul>
          <p>&copy; 2025 All Rights Reserved</p>
        </section>
        <section className="h-full w-1/2 mt-10 flex justify-evenly">
          <div className="space-y-2.5">
            <h3 className="font-semibold opacity-80">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-semibold opacity-80">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-semibold opacity-80">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Licensing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
