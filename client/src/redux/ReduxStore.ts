import { configureStore } from "@reduxjs/toolkit";
import reduxSlices from "./reduxSlices";

export const store = configureStore({
  reducer: {
    userdata: reduxSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
