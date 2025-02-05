import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: User = JSON.parse(localStorage.getItem("userData") || "null") || {
  userId: "",
  name: "",
  address: "",
  email: "",
  phone: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { saveUserData } = userSlice.actions;
export const selectUserData = (state: { user: User }) => state.user;
export default userSlice.reducer;
