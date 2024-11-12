// src/components/Layout.js
import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
function Layout({ socket }) {
  return (
    <div>
      <NavBar socket={socket} />
      <main>
        <Analytics />
        <Outlet /> {/* Renders the current page content */}
      </main>
    </div>
  );
}

export default Layout;
