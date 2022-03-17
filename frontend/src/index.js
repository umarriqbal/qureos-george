import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import QureosNavBar from "./components/navBar";

ReactDOM.render(
  <BrowserRouter>
    <QureosNavBar></QureosNavBar>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
