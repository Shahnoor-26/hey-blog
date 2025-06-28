import { configureStore } from "@reduxjs/toolkit";
import { Reducers } from "./authSlice.js";

export const store = configureStore({
  reducer: {
    auth: Reducers,
  },
});
