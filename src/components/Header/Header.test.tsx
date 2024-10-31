import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./Header";
import { setSortOrder } from "../../redux/listSlice";
import { fetchRepositoriesAsync } from "../../redux/asyncAction";

const mockStore = configureStore([]);

jest.mock("../../redux/asyncAction", () => ({
  fetchRepositoriesAsync: jest.fn().mockReturnValue(() => ({ type: "mocked" })),
}));

describe("Работа Шапки", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});

    store.dispatch = jest.fn();
  });

  test("Рендер заголовка Хедера с сортировкой", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText(/Звездные репозитории/i)).toBeTruthy();
    expect(screen.getByLabelText(/Сортировать по:/i)).toBeTruthy();
    expect(screen.getByText(/количеству звезд/i)).toBeTruthy();
    expect(screen.getByText(/дате обновления/i)).toBeTruthy();
  });

  test("Отправка запроса при изменении типа сортировки По дате обновления", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const select = screen.getByLabelText(/Сортировать по:/i);
    fireEvent.change(select, { target: { value: "updated" } });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(setSortOrder("updated"));
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchRepositoriesAsync({ query: "javascript", page: 1 })
    );
  });

  test("Отправка запроса при изменении типа сортировки По количеству звезд", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const select = screen.getByLabelText(/Сортировать по:/i);
    fireEvent.change(select, { target: { value: "stars" } });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(setSortOrder("stars"));
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchRepositoriesAsync({ query: "javascript", page: 1 })
    );
  });
});
