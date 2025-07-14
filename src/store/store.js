import { configureStore } from "@reduxjs/toolkit";
import { Reducers as AuthRed } from "./authSlice.js";
import { Reducers as ThemeRed } from "./themeSlice.js";

export const store = configureStore({
  reducer: {
    auth: AuthRed,
    theme: ThemeRed,
  },
});
