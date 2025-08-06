// src/components/Layout.js
import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
function Layout({ socket }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar socket={socket} />
      <main style={{ flex: "1" }}>
        <Analytics />
        <Outlet /> {/* Renders the current page content */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
