import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface StarredGistsState {
  gists: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StarredGistsState = {
  gists: [],
  loading: false,
  error: null,
};

const fetchStarredGists = async (token: string) => {
  const response = await axios.get("https://api.github.com/gists/starred", {
    headers: { Authorization: `token ${token}` },
  });
  return response.data;
};

export const getStarredGists = createAsyncThunk(
  "starredGists/getStarredGists",
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await fetchStarredGists(token);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const starredGistsSlice = createSlice({
  name: "starredGists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStarredGists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStarredGists.fulfilled, (state, action) => {
        state.loading = false;
        state.gists = action.payload;
      })
      .addCase(getStarredGists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default starredGistsSlice.reducer;
