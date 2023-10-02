import { createSlice } from "@reduxjs/toolkit";

export const isModalSlice = createSlice({
  name: "isModal",
  initialState: {
    search: false,
    menu: false,
    upload:false
  },
  reducers: {
    setIsModalSearch: (state, action) => {
      state.search = action.payload;
    },
    setIsModalMenu: (state, action) => {
      state.menu = action.payload;
    },
    setIsModalUpload: (state,action) =>{
      state.upload = action.payload;
    }
  },
});
export const { setIsModalSearch, setIsModalMenu,setIsModalUpload } = isModalSlice.actions;
export const getIsModalSearch = (state) => state.isModal.search;
export const getIsModalMenu = (state) => state.isModal.menu;
export const getIsModalUpload = (state) => state.isModal.upload;
export default isModalSlice.reducer;
