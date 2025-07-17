import { Link } from "react-router-dom";
import { Logo } from "../index.js";
import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "../Icons.jsx";

const Footer = () => {
  return (
    <footer className="h-auto w-full px-2 py-4 border-t md:border-t-2 text-xs md:text-sm xl:text-base font-semibold antialiased select-none">
      <div className="h-auto w-full mt-8 mb-12 flex max-md:flex-col justify-between items-center">
        <section className="h-auto w-full md:w-1/2 px-2 py-4 flex md:flex-col justify-between gap-2.5">
          <div className="space-y-2">
            <Link to={"/"} tabIndex={-1} className="block">
              <Logo className="text-xl md:text-2xl xl:text-3xl" />
              {/* Logo will be added soon */}
            </Link>
            <p className="text-sm md:text-base xl:text-lg text-wrap">
              &copy; All Rights Reserved
            </p>
          </div>
          <ul className="flex gap-2">
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <GithubIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
              <Link to={"#"}>
                <DiscordIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <TelegramIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
              <Link to={"#"}>
                <XIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"}>
                <InstagramIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
              <Link to={"#"}>
                <YoutubeIcon className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:opacity-80 hover:fill-black" />
              </Link>
            </li>
          </ul>
        </section>
        <section className="h-auto w-full md:w-1/2 px-2 py-4 flex justify-between sm:justify-evenly items-center gap-2.5 max-md:border-t">
          <div className="space-y-2.5">
            <h3 className="text-sm md:text-base xl:text-lg truncate">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="text-sm md:text-base xl:text-lg truncate">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="text-sm md:text-base xl:text-lg truncate">
              Legal & Rights
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
                >
                  Licensing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:opacity-80"
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
