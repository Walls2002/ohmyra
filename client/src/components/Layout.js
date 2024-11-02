// src/components/Layout.js
import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout({ socket }) {
  return (
    <div>
      <NavBar socket={socket} />
      <main>
        <Outlet /> {/* Renders the current page content */}
      </main>
    </div>
  );
}

export default Layout;
