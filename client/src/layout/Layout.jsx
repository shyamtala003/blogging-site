import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ThemeContest from "../context/ThemeContest";

const Layout = () => {
  let { theme } = useContext(ThemeContest);
  return (
    <main className={theme}>
      <div className={theme === "dark" ? "fix_bg_dark" : "fix_bg_light"}></div>
      <Navbar></Navbar>
      <div className="main_content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
