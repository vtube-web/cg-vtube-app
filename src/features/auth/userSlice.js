import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { checkEmailApi, login, registerApi, getInfo, getUserList, getInfoByUserName } from "../../api/authApi";


const initialState = {
  userCredential:null,
  userInfoFindByUserName:null,
  loading: false,
  error: null,
  value: null,
  loginSuccess: false,
  registerSuccess: false,
  registerError: false,
  checkEmailSuccess: false,
  userList: []
};


export const loginUser = createAsyncThunk("/user/loginUser",async (userCredential) => {
  const response = await login(userCredential);
  return response.data;
});

export const registerAccount = createAsyncThunk("register", async (data) => {
  const response = await registerApi(data);
  return response.data;
});

export const checkEmail = createAsyncThunk("check-email", async (data) => {
  return await checkEmailApi(data);
});

export const getInfoUser = createAsyncThunk("info", async () => {
  const response = await getInfo();
  return response.data;
});

export const getInfoUserByUsername = createAsyncThunk("info-findByUserName", async (data) => {
  const response = await getInfoByUserName(data);
  return response.data;
});

export const getListUser = createAsyncThunk("list-user", async (data) => {
  if (data && data.length > 0) {
    const response = await getUserList(data);
    return response.data;
  } else {
    throw new Error('No Data');

  }
}); 

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setUserCredential: (state, action) => {
      state.userCredential = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoginSuccess: (state, action) => {
      state.loginSuccess = action.payload
    },
    resetUserAccountState: (state) => {
      state.loading = false;
      state.error = null;
      state.loginSuccess = false;
      state.registerSuccess = false;
      state.registerError = false;
      state.checkEmailSuccess = false;
    },
    setUserInfoFindByUserName: (state,action) => {
      state.userInfoFindByUserName = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loginSuccess = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginSuccess = false;
        state.loading = false;
        state.error = action.error;
        state.userCredential = null;
        if (action.error) {
          state.error = "Access Denied ! Wrong Email or Password";
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginSuccess = true;
        state.loading = false;
        state.error = false;
        state.userCredential = action.payload;
      })

      // REGISTER
      .addCase(registerAccount.pending, (state) => {
        state.registerSuccess = false;
        state.loading = true;
        state.registerError = false;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.registerSuccess = false;
        state.loading = false;
        state.registerError = action.error;
      })
      .addCase(registerAccount.fulfilled, (state) => {
        state.registerSuccess = true;
        state.loading = false;
        state.registerError = false;
      })
      // CHECK EMAIL
      .addCase(checkEmail.pending, (state) => {
        state.checkEmailSuccess = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.checkEmailSuccess = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmailSuccess = true;
        state.loading = false;
        state.error = action.payload;
      })
      // INFO USER BY TOKEN
      .addCase(getInfoUser.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload.data;
        state.error = false;
      })
      // INFO USER BY USERNAME
      .addCase(getInfoUserByUsername.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getInfoUserByUsername.rejected, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = action.error;
      })
      .addCase(getInfoUserByUsername.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userInfoFindByUserName = action.payload.data;
        state.error = false;
      })
      // LIST USERS FIND BY USER TOKEN
      .addCase(getListUser.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getListUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getListUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.userList = action.payload.data;
      });
  },
});


export const {
  setLoading,
  setError,
  setLoginSuccess,
  setUserCredential,
  resetUserAccountState,
  setUserInfoFindByUserName,
} = userAccountSlice.actions;
export const selectUserAccountSliceIsLoading = (state) => state.userAccount.loading;
export const selectUserAccountSliceIsError = (state) => state.userAccount.error;
// get state of userCredentials.
export const selectUserData = (state) => state.userAccount.userCredential;

// get state of Register.
export const selectRegisterIsSuccess = (state) => state.userAccount.registerSuccess;
export const selectRegisterIsError = (state) => state.userAccount.registerError;

// get state of Login.
export const selectLoginIsSuccess = (state) => state.userAccount.loginSuccess;

// get state of Check Email Register.
export const selectCheckEmailIsSuccess = (state) => state.userAccount.checkEmailSuccess;

// get state of userInfo
export const selectUserInfo = (state) => state.userAccount.value;

// get state of userInfo by Username.
export const selectUserInfoByUserName = (state) => state.userAccount.userInfoFindByUserName;

export const selectUserList = (state) => state.userAccount.userList;
export default userAccountSlice.reducer;
