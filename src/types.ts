import store from "./redux/store";

export type AppDispatch = typeof store.dispatch;

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
}

export interface ListState {
  items: Repository[];
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
  sortOrder: string;
}

export interface RootState {
  list: ListState;
}

export interface RepositoriesParams {
  query: string;
  page: number;
  token?: string;
}

export interface Repositories {
  total_count: number;
  incomplete_results: boolean;
  items: [];
}
