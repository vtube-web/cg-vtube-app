import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSearchResult, getSearchSuggestion} from "../../api/searchApi";
import {getVideos, videoSlice} from "../video/videoSlice";

const initialState = {
    success: false,
    loading: false,
    error: null,
    searchData: [],
    searchSuggestion: []
};

export const collectSearchData = createAsyncThunk("collectSearchData", async (inputSearch) => {
    const response = await getSearchResult(inputSearch);
    return response.data;
})

export const collectSearchSuggestion = createAsyncThunk("collectSearchSuggestion", async (inputSearch) => {
    const response = await getSearchSuggestion(inputSearch);
    return response.data;
})

export const searchSlice = createSlice({
    name: "search",
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
        resetSearchData: state => {
            state.searchData = []
        },
        resetSearchSuggestion: state => {
            state.searchSuggestion = []
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(collectSearchData.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(collectSearchData.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(collectSearchData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.searchData = action.payload;
            })

            .addCase(collectSearchSuggestion.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(collectSearchSuggestion.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(collectSearchSuggestion.fulfilled, (state, action) => {
                state.getVideoListSuccess = true;
                state.loading = false;
                state.error = false;
                state.searchSuggestion = action.payload.data.content;
            })
    },
})

export const {
    resetSearchData,
    resetSearchSuggestion
} = searchSlice.actions;

export const selectSearchData = (state) => state.search.searchData;
export const selectSearchSuggestion = (state) => state.search.searchSuggestion;

export default searchSlice.reducer;