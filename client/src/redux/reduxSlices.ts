import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/CustomInterface";
import { Message } from "@prisma/client";
// import { Message } from "@prisma/client";

interface State {
  userState: User;
  selectedfriend: User;
  currchat: { id: string; messages: Message[] } | null;
  change: boolean;
}

const initialState: State = {
  userState: {} as User,
  selectedfriend: {} as User,
  currchat: null,
  change: false,
};

export const Slice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    updateuserdata: (state, action: PayloadAction<User>) => {
      state.userState = action.payload;
    },
    updateselectedfriend: (state, action) => {
      state.selectedfriend = action.payload;
    },
    updatecurrchat: (state, action: PayloadAction<any>) => {
      state.currchat = action.payload;
    },
    updatechange: (state, action) => {
      state.change = action.payload;
    },
  },
});

export const {
  updateuserdata,
  updateselectedfriend,
  updatecurrchat,
  updatechange,
} = Slice.actions;

export default Slice.reducer;
