import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  occupied: false,
  documents: [],
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    initStore: (state, action) => {
      state.occupied = true;
      state.documents = action.payload.documents;
    },
    cleanStore: (state, action) => {
      state.occupied = false;
      state.documents = [];
    },
  },
});

export const Reducers = draftSlice.reducer;
export const { initStore, cleanStore } = draftSlice.actions;
