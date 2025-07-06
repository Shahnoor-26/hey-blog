import { Link } from "react-router-dom";
import { Logo } from "../index.js";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 h-auto md:h-80 w-full flex justify-between bg-bg-secondary text-text-primary border-t-2 border-border">
      <section className="h-full w-1/2 mt-10 px-5 flex flex-col gap-2.5">
        <div>
          <Logo />
        </div>
        <div>
          <p className="text-sm md:text-base xl:text-lg truncate">
            &copy; 2025 HeyBlog. All rights reserved.
          </p>
        </div>
      </section>
      <section className="h-full w-1/2 mt-10 px-5 flex justify-evenly gap-2.5 text-xs md:text-sm xl:text-base">
        <div>
          <h3 className="mb-3.5 text-heading text-sm md:text-base xl:text-lg text-center truncate font-semibold">
            Company
          </h3>
          <ul className="flex flex-col gap-3.5">
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Affiliate Program
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3.5 text-heading text-sm md:text-base xl:text-lg text-center truncate font-semibold">
            Support
          </h3>
          <ul className="flex flex-col gap-3.5">
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Help Desk
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3.5 text-heading text-sm md:text-base xl:text-lg text-center truncate font-semibold">
            Legal
          </h3>
          <ul className="flex flex-col gap-3.5">
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="truncate hover:text-accent hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
