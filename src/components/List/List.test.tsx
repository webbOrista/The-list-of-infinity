
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RepositoryList from './List';

jest.mock("../../config", () => ({
  accessToken: "mockedAccessToken",
}));

jest.mock("../../redux/asyncAction", () => ({
  fetchRepositoriesAsync: jest.fn(() => ({ type: "list/fetchRepositoriesAsync" })),
}));

jest.mock('date-fns', () => ({
    format: jest.fn(() => '01.01.2020 00:00'),
  }));

  const mockIntersectionObserver = jest.fn().mockImplementation((callback) => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      callback,
    };
  });
  window.IntersectionObserver = mockIntersectionObserver;

const mockStore = configureStore([]);

describe('Работа компонента списка', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      list: {
        items: [],
        loading: false,
        currentPage: 1,
        hasMore: true,
      },
    });
  });

  test('Отображение лоадера во время загрузки данных', () => {
    store = mockStore({
      list: {
        items: [],
        loading: true,
        currentPage: 1,
        hasMore: true,
      },
    });

    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeTruthy();
    expect(screen.getByText(/Секундочку, загружаем.../)).toBeTruthy();
  });

  test('Отрисовка карточек после загрузки данных', () => {
    const mockItems = [
      { id: 1, name: 'Repo 1' },
      { id: 2, name: 'Repo 2' },
    ];

    store = mockStore({
      list: {
        items: mockItems,
        loading: false,
        currentPage: 1,
        hasMore: true,
      },
    });

    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );

    expect(screen.getByText('Repo 1')).toBeTruthy();
    expect(screen.getByText('Repo 2')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).not.toBeTruthy();
  });

  test('Если карточек нет, то ничего не рендерится, включая лоадер', () => {
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );

    expect(screen.queryByRole('progressbar')).not.toBeTruthy();
  });
});





