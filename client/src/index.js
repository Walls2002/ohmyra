import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const LOCAL_PORT = process.env.REACT_APP_LOCAL_PORT;
const PROD_PORT = process.env.REACT_APP_PROD_HOST;
console.log(PROD_PORT);
const socket = io.connect("https://ohmyra.onrender.com/");

root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
