import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { fetchRepositories } from "../api/api";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

interface ListState {
  items: Repository[];
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
}

const initialState: ListState = {
  items: [],
  loading: false,
  currentPage: 1,
  hasMore: true,
};

export const fetchRepositoriesAsync = createAsyncThunk(
  "list/fetchRepositories",
  async ({
    query,
    page,
    token,
  }: {
    query: string;
    page: number;
    token?: string;
  }) => {
    const response = await fetchRepositories(query, page, token);
    return response;
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addRepository: (state, action) => {
      state.items.push(action.payload);
    },
    removeRepository: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editRepository: (state, action: PayloadAction<{ id: number; name: string; description: string }>) => {
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

export const { addRepository, removeRepository, editRepository, resetList } =
  listSlice.actions;

export default listSlice.reducer;
