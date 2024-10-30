import { Repositories, RepositoriesParams, RootState } from './../types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRepositories } from "../api/api";

export const fetchRepositoriesAsync = createAsyncThunk<
  Repositories,
  RepositoriesParams,
  { state: RootState }
>(
  "list/fetchRepositories",
  async (
    {
      query,
      page,
      token,
    }: {
      query: string;
      page: number;
      token?: string;
    },
    { getState }
  ) => {
    const { sortOrder } = getState().list;
    const response = await fetchRepositories(query, page, token, sortOrder);
    return response;
  }
);