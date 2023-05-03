import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ThemeContest from "../context/ThemeContest";

const Layout = () => {
  let { theme } = useContext(ThemeContest);
  return (
    <main className={theme}>
      <Navbar></Navbar>
      <div className="main_content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
