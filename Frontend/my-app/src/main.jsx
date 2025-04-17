import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { allReducer } from "./Reducer/index.jsx";
const store = createStore(allReducer);
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
