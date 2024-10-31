// RepositoryCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RepositoryCard from "./Card";
import { removeRepository } from "../../redux/listSlice";
import { Repository } from "../../types";

const mockStore = configureStore([]);

const mockRepository: Repository = {
  id: 1,
  name: "Test Repo",
  full_name: "Test Repo",
  description: "Test Description",
  stargazers_count: 123,
  updated_at: "2023-01-01T12:34:56Z",
  html_url: "https://github.com/test/test-repo",
};

describe("Работа карточки репозитория", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test("Рендеринг карточки со всей необходимой информацией", () => {
    render(
      <Provider store={store}>
        <RepositoryCard repository={mockRepository} />
      </Provider>
    );

    expect(screen.getByText(mockRepository.name)).toBeTruthy();
    expect(screen.getByText(mockRepository.description)).toBeTruthy();
    expect(screen.getByText(`Количество звезд:`)).toBeTruthy();
    expect(screen.getByText(mockRepository.stargazers_count)).toBeTruthy();
    expect(screen.getByText(/Обновлен:/)).toBeTruthy();
  });

  test("Открытие модалки по клику на кнопку редактировать", () => {
    render(
      <Provider store={store}>
        <RepositoryCard repository={mockRepository} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Редактировать"));
    expect(screen.getByText("Сохранить")).toBeTruthy();
  });

  test("Диспатчится removeRepository при нажатии на кнопку удаления карточки", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <RepositoryCard repository={mockRepository} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Удалить"));
    expect(dispatchSpy).toHaveBeenCalledWith(
      removeRepository(mockRepository.id)
    );
  });
});
