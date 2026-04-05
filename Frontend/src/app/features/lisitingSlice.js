import { createSlice } from "@reduxjs/toolkit";
import { dummyListings } from "../../assets/assets";
const lisitingSlice = createSlice({
  name: "Lisitng",
  initialState: {
    listings: dummyListings,
    userListings: dummyListings,
    balance: {
      earned: 0,
      withdrawn: 0,
      available: 0,
    },
  },
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const { setListings } = lisitingSlice.actions;

export default lisitingSlice.reducer;
