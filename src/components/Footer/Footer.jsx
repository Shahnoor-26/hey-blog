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
    <footer className="w-full px-2 py-4 bg-primary-color border-secondary-accent border-t md:border-t-2 text-primary-text font-semibold antialiased select-none">
      <div className="h-full w-full mt-5 mb-10 flex max-md:flex-col justify-between items-center text-xs md:text-sm xl:text-base text-wrap">
        <section className="w-full md:w-1/2 px-2 py-4 flex md:flex-col justify-between gap-2.5">
          <div className="space-y-2">
            <Link to={"/"} tabIndex={-1} className="block">
              <Logo className="text-xl md:text-2xl xl:text-3xl" />
              {/* Insert Logo */}
            </Link>
            <p className="text-sm md:text-base xl:text-lg">
              &copy; All Rights Reserved
            </p>
          </div>
          <ul className="flex gap-2.5">
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"} className="focus:outline-primary-accent">
                <GithubIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
              <Link to={"#"} className="focus:outline-primary-accent">
                <DiscordIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"} className="focus:outline-primary-accent">
                <TelegramIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
              <Link to={"#"} className="focus:outline-primary-accent">
                <XIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
            </li>
            <li className="flex max-md:flex-col gap-2.5">
              <Link to={"#"} className="focus:outline-primary-accent">
                <InstagramIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
              <Link to={"#"} className="focus:outline-primary-accent">
                <YoutubeIcon
                  className="h-6 w-6 md:h-7 md:w-7 xl:h-8 xl:w-8 transition-all duration-200 ease-in-out hover:fill-primary-accent"
                  color="#693c9d"
                />
              </Link>
            </li>
          </ul>
        </section>
        <section className="h-auto w-full md:w-1/2 px-2 py-4 flex justify-between sm:justify-evenly items-center gap-2.5 max-md:border-secondary-accent max-md:border-t">
          <div className="space-y-2.5">
            <h3 className="text-secondary-accent text-sm md:text-base xl:text-lg">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="text-secondary-accent text-sm md:text-base xl:text-lg">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h3 className="text-secondary-accent text-sm md:text-base xl:text-lg">
              Legal & Rights
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
                >
                  Licensing
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="transition-all duration-200 ease-in-out hover:underline hover:text-primary-accent focus:text-primary-accent focus:underline focus:outline-none"
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
