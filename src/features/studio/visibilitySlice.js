import { createSlice } from "@reduxjs/toolkit";

export const isVisibilitySlice = createSlice({
  name: "isVisibility",
  initialState:{
    menu: false,
  },
  reducers: {
    setIsVisibilityMenu : (state,action) =>{
        state.menu = action.payload;
    },
  },
});
export const {setIsVisibilityMenu} = isVisibilitySlice.actions;
export const getIsVisibilityMenu = (state) => state.isVisibility.menu;
export default isVisibilitySlice.reducer;