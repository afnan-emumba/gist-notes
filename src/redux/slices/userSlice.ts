import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UserType } from "../../types/user";

interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      //   updateAuthToken();
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export default userSlice.reducer;
