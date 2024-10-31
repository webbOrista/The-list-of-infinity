import { ListState } from "./../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRepositoriesAsync } from "./asyncAction";

const initialState: ListState = {
  items: [],
  loading: false,
  currentPage: 1,
  hasMore: true,
  sortOrder: "stars",
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
      state.items = [];
      state.currentPage = 1;
    },
    removeRepository: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editRepository: (
      state,
      action: PayloadAction<{ id: number; name: string; description: string }>
    ) => {
      const { id, name, description } = action.payload;
      const repository = state.items.find((item) => item.id === id);
      if (repository) {
        repository.name = name;
        repository.description = description;
      }
    },
    resetList: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(...action.payload.items);
        state.hasMore = action.payload.items.length > 0;
      })
      .addCase(fetchRepositoriesAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  removeRepository,
  editRepository,
  resetList,
  setSortOrder,
} = listSlice.actions;

export default listSlice.reducer;
