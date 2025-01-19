import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserGistsState {
  gists: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserGistsState = {
  gists: [],
  loading: false,
  error: null,
};

const fetchUserGists = async (username: string, token: string) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/gists`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  return response.data;
};

export const getUserGists = createAsyncThunk(
  "userGists/getUserGists",
  async (
    { username, token }: { username: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchUserGists(username, token);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userGistsSlice = createSlice({
  name: "userGists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserGists.fulfilled, (state, action) => {
        state.loading = false;
        state.gists = action.payload;
      })
      .addCase(getUserGists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userGistsSlice.reducer;
