import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="dark">
      <Navbar></Navbar>
      <div className="main_content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
