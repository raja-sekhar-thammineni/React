import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "courses",
  initialState: {
    Courses: [],
  },
  reducers: {
    setDataOnInitialLoad(state, actions) {
      state.Courses = actions.payload;
    },
  },
});

export const { setDataOnInitialLoad } = counterSlice.actions;

export default counterSlice.reducer;
