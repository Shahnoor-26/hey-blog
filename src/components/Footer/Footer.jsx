import { Link } from "react-router-dom";
import { Logo } from "../index.js";
import {
  GithubIcon,
  DiscordIcon,
  XIcon,
  TelegramIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../Icons.jsx";

const Footer = () => {
  return (
    <footer className="h-auto w-full p-2 bg-primary text-text-primary text-xs md:text-sm xl:text-base border-t md:border-t-2 border-border antialiased select-none">
      <div className="h-auto w-full mt-5 mb-10 flex max-md:flex-col items-center">
        <section className="h-auto w-full md:w-1/2 px-2 py-4 flex md:flex-col justify-between gap-2.5">
          <div className="flex flex-col gap-2.5">
            <Link to={"/"}>
              <Logo className="text-xl font-serif" />
            </Link>
            <p>&copy; All Rights Reserved</p>
          </div>
          <ul className="flex gap-2.5">
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <GithubIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
              <Link to={"#"}>
                <DiscordIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <TelegramIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
              <Link to={"#"}>
                <XIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <InstagramIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
              <Link to={"#"}>
                <YoutubeIcon
                  className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-secondary"
                  color="#ffffff"
                />
              </Link>
            </li>
          </ul>
        </section>
        <section className="h-full w-full md:w-1/2 px-2 py-4 flex justify-between sm:justify-evenly items-center gap-2.5 max-md:border-t max-md:border-border">
          <div className="space-y-2.5">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="font-semibold">Legal & Rights</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Licensing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="hover:text-text-secondary hover:underline transition-all duration-200 ease-in-out"
                >
                  Terms & Conditions
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
