import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {savePlaylist, getPlaylist} from "../../api/playlistApi";

const initialState = {
    playlist: {},
    playlists: [],
    loading: false,
    error: null,
    success: false
};

export const addPlaylist = createAsyncThunk("addPlaylist", async (playlistData) => {
    const response = await savePlaylist(playlistData);
    return response.data;
})

export const collectPlaylists = createAsyncThunk("collectPlaylist", async () => {
    const response = await getPlaylist();
    return response.data;
})

export const playlistSlice = createSlice({
    name: "playlist",
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPlaylist.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addPlaylist.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addPlaylist.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = false;
            })

            .addCase(collectPlaylists.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(collectPlaylists.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(collectPlaylists.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.playlists = action.payload.data;
            });
    }
})

export const selectPlaylists = (state) => state.playlist.playlists;

export default playlistSlice.reducer;