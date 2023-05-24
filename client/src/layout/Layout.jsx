import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
// import ThemeContest from "../context/ThemeContest";
import Theme from "../context/Theme";

const Layout = () => {
  // let { theme } = useContext(ThemeContest);
  const { theme } = Theme();
  return (
    <main className={`${theme} main_container`}>
      <div className={theme === "dark" ? "fix_bg_dark" : "fix_bg_light"}></div>
      <Navbar></Navbar>
      <div className="main_content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
