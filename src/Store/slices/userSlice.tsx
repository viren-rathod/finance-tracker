import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USER } from "../../utils/data";
import { RegisterType } from "../../pages/auth/Register";

const userSlice = createSlice({
  name: "Users",
  initialState: { user: USER },
  reducers: {
    addUser: (state, action: PayloadAction<RegisterType>) => {
      const newUser = action.payload;
      const allData: RegisterType[] = [...state.user, newUser];
      return { ...state, user: allData };
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;