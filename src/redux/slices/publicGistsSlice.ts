import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PublicGistsState {
  gists: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PublicGistsState = {
  gists: [],
  loading: false,
  error: null,
};

const fetchPublicGists = async (page: number, token: string) => {
  const response = await axios.get("https://api.github.com/gists/public", {
    params: { per_page: 10, page },
    headers: { Authorization: `token ${token}` },
  });
  return response.data;
};

export const getPublicGists = createAsyncThunk(
  "publicGists/getPublicGists",
  async ({ page, token }: { page: number; token: string }, { rejectWithValue }) => {
    try {
      const data = await fetchPublicGists(page, token);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const publicGistsSlice = createSlice({
  name: "publicGists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicGists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicGists.fulfilled, (state, action) => {
        state.loading = false;
        state.gists = action.payload;
      })
      .addCase(getPublicGists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default publicGistsSlice.reducer;
