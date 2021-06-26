import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { fetchPhotos } from "./nasaAPI";

export interface PhotoData {
  camera: { id: number; name: string; rover_id: number; full_name: string };
  earth_date: string;
  id: number;
  img_src: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
  sol: number;
}

export type Status = "idle" | "loading" | "failed";

export type Rover = "curiosity" | "opportunity" | "spirit";

export interface SolState {
  status: Status;
  sol: number;
  photos: PhotoData[] | null;
  favourites: PhotoData[];
}

const initialState: SolState = {
  status: "idle",
  sol: 0,
  photos: null,
  favourites: [],
};

export const getPhotos = createAsyncThunk<
  PhotoData[],
  { sol: number; rover: Rover }
>("photos/fetchPhotos", async ({ sol, rover }) => {
  const response = await fetchPhotos(sol, rover);

  return response;
});

export const solSlice = createSlice({
  name: "sol",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<PhotoData>) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action: PayloadAction<PhotoData>) => {
      const removedIndex = state.favourites.findIndex(
        (item) => item.id === action.payload.id
      );
      state.favourites.splice(removedIndex, 1);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.status = "idle";
        state.photos = action.payload;
      });
  },
});

export const { addToFavourites, removeFromFavourites } = solSlice.actions;

export const selectPhotos = (state: RootState) => state.sol.photos;
export const selectStatus = (state: RootState) => state.sol.status;
export const selectFavourites = (state: RootState) => state.sol.favourites;

export default solSlice.reducer;
