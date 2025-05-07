// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import modelReducer from "../Features/Model/ModelSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
  },
});
