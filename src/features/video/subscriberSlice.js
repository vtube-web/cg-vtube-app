import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSubscriber, deleteSubscribed } from "../../api/subscriberAPI";

const initialState = {
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const addSubscriber = createAsyncThunk(
  "subscriber/create",
  async (channelId) => {
    const response = await createSubscriber(channelId);
    return response.data;
  }
);

export const removeSubscribed = createAsyncThunk(
  "subscriber/remove",
  async (channelId) => {
    const response = await deleteSubscribed(channelId);
    return response.data;
  }
);

export const subscriberSlice = createSlice({
  name: "subscriber",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubscriber.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addSubscriber.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.value = action.payload.data;
      })

      .addCase(removeSubscribed.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(removeSubscribed.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeSubscribed.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload.data;
        state.error = false;
      });
  },
});

export const { setLoading, setError, setSuccess } = subscriberSlice.actions;

export const selectLoading = (state) => state.subscriber.loading;
export const selectError = (state) => state.subscriber.error;
export const selectSuccess = (state) => state.subscriber.success;
export const selectSubscriber = (state) => state.subscriber.value;
export const selectSubscribedRemoved = (state) => state.subscriber.value;

export default subscriberSlice.reducer;
