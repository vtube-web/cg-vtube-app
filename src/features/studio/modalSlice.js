import { createSlice } from "@reduxjs/toolkit";

export const isModalSlice = createSlice({
  name: "isModal",
  initialState: {
    search: false,
  },
  reducers: {
    setIsModalSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { setIsModalSearch } = isModalSlice.actions;
export const getIsModalSearch = (state) => state.isModal.search;
export default isModalSlice.reducer;
