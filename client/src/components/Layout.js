// src/components/Layout.js
import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet /> {/* Renders the current page content */}
      </main>
    </div>
  );
}

export default Layout;
