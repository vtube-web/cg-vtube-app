import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/authApi";
// import Cookies from "js-cookie";

const initialState = {
    loading: false,
    user: null,
    error: null,
    success: false
};


export const loginUser = createAsyncThunk("/user/loginUser",async (userCredential) => {
    console.log("Waiting for response...");
    const response = await login(userCredential);
    localStorage.setItem("user", JSON.stringify(response.data));
    // Cookies.set("token", response.data.accessToken);
    return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
        state.user = null;
        console.log(action.error.message);
        if (action.error) {
          state.error = "Access Denied ! Wrong Email or Password";
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.user = action.payload;
      });
  },
});


export const { setLoading, setError, setSuccess,setUser } = userSlice.actions;

export const { clearState } = userSlice.actions;


export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectSuccess = (state) => state.user.success;
export const selectUser = (state) => state.user.user;



export default userSlice.reducer;
