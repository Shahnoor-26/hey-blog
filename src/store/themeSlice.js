import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeStatus: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeUpdate: (state, action) => {
      state.themeStatus = action.payload.themeStatus;
    },
  },
});

export const Reducers = themeSlice.reducer;
export const { themeUpdate } = themeSlice.actions;
