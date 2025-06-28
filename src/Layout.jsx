import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components";
import { Auth } from "./appwrite/authentication.js";

const Layout = () => {
  return (
    <>
      <Header />

      <Footer />
    </>
  );
};

export default Layout;
