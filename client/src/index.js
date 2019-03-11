import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./components/app.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
