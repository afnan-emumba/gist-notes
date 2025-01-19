import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UserType } from "../../types/user";

const user: UserType | null =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

const initialState = {
  user,
  loading: false as boolean,
  error: null as string | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      toast.error("An error occured, please try again");
      console.error(action.payload);
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setError, setLoading, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
