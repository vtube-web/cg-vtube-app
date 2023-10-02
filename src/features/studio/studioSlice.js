import { createSlice } from "@reduxjs/toolkit";

export const isModalSreachSlice = createSlice({
  name: "isModalSreach",
  initialState: {
    search: false,
  },
  reducers: {
    setIsModalSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setIsModalSearch } = isModalSreachSlice.actions;
export const getIsModalSearch = (state) => state.isModalSreach.search;
export default isModalSreachSlice.reducer;
