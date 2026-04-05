import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./features/lisitingSlice";

import chatReducer from "./features/chatSlice";
export const store = configureStore({
  reducer: {
    listings: listingReducer,
    chat: chatReducer,
  },
});
