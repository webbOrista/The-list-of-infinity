import { fetchRepositoriesAsync } from "./asyncAction";
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import * as api from "../api/api";

jest.mock("../api/api");

describe("Проверка получения репозиториев", () => {
  const mockResponse = { items: [{ id: 1, name: "Repo 1" }] };

  it("Отправляется fulfilled если запрос прошел успешно", async () => {
    api.fetchRepositories.mockResolvedValue(mockResponse);

    const store = configureStore({
      reducer: { list: listReducer },
    });

    await store.dispatch(fetchRepositoriesAsync({ query: "test", page: 1 }));

    const state = store.getState().list;
    expect(state.items).toEqual(mockResponse.items);
    expect(state.loading).toBe(false);
  });
});
