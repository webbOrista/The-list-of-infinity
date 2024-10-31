import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EditModal from "./EditModal";
import { editRepository } from "../../redux/listSlice";

const mockStore = configureStore([]);

const mockRepository = {
  id: 1,
  name: "Test Repo",
  full_name: "Test Repo",
  description: "Test Description",
  stargazers_count: 123,
  updated_at: "2023-01-01T12:34:56Z",
  html_url: "https://github.com/test/test-repo",
};

describe("Работа модального окна", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});

    store.dispatch = jest.fn();
  });

  test("Рендер модалки с начальным состоянием", () => {
    render(
      <Provider store={store}>
        <EditModal repository={mockRepository} onClose={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText(/Редактировать/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Название:/i).value).toBe("Test Repo");
    expect(screen.getByLabelText(/Описание:/i).value).toBe("Test Description");
  });

  test("Редактирование полей ввода", () => {
    render(
      <Provider store={store}>
        <EditModal repository={mockRepository} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Название:/i), {
      target: { value: "New Name" },
    });
    fireEvent.change(screen.getByLabelText(/Описание:/i), {
      target: { value: "New Description" },
    });

    expect(screen.getByLabelText(/Название:/i).value).toBe("New Name");
    expect(screen.getByLabelText(/Описание:/i).value).toBe("New Description");
  });

  test("Обновление данных репозитория при нажатии кнопки сохранить", () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <EditModal repository={mockRepository} onClose={handleClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Сохранить/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      editRepository({
        id: mockRepository.id,
        name: mockRepository.name,
        description: mockRepository.description,
      })
    );
    expect(handleClose).toHaveBeenCalled();
  });

  test("Закрытие модалки при нажатии кнопки отменить", () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <EditModal repository={mockRepository} onClose={handleClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Отменить/i));

    expect(handleClose).toHaveBeenCalled();
  });
});
