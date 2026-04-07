import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../configs/axios";

export const getAllPublicListing = createAsyncThunk(
  "listing/getAllPublicListing",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/listing/public");
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch",
      );
    }
  },
);

export const getAllUserListing = createAsyncThunk(
  "listing/getAllUserListing",
  async ({ getToken }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      // ✅ FIX: Added leading slash "/"
      const { data } = await api.get("/api/listing/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      // ✅ FIX: Use rejectWithValue so it triggers 'rejected', NOT 'fulfilled'
      console.error("Fetch user listings error:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch",
      );
    }
  },
);

const lisitingSlice = createSlice({
  name: "Lisitng",
  initialState: {
    listings: [],
    userListings: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(getAllPublicListing.fulfilled, (state, action) => {
        state.listings = action.payload.listings;
      })
      .addCase(getAllUserListing.fulfilled, (state, action) => {
        state.userListings = action.payload.listings;
        state.balance = action.payload.balance;
      })
      // ✅ FIX: Handle rejections safely WITHOUT wiping the existing state
      .addCase(getAllUserListing.rejected, (state, action) => {
        console.error("Failed to load user listings:", action.payload);
        // Do nothing here! Keep the existing userListings in state
      });
  },
});

export const { setListings } = lisitingSlice.actions;
export default lisitingSlice.reducer;
