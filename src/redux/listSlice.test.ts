import listReducer, {
    setSortOrder,
    removeRepository,
    resetList,
  } from "./listSlice";
  import { ListState } from "../types";
  
  describe("работа слайса списка", () => {
    const initialState: ListState = {
      items: [],
      loading: false,
      currentPage: 1,
      hasMore: true,
      sortOrder: "stars",
    };
  
    test("Установка начального состояния", () => {
      expect(listReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  
    test("Установка значения сортировки", () => {
      const newState = listReducer(
        initialState,
        setSortOrder("updated")
      );
      expect(newState.sortOrder).toBe("updated");
    });
  
    test("Удаление карточки", () => {
      const stateWithItems = { ...initialState, items: [{ id: 2, name: "New Repo" }] };
      const newState = listReducer(stateWithItems, removeRepository(2));
      expect(newState.items).toHaveLength(0);
    });
  
    test("Обновление списка", () => {
      const stateWithItems = {
        ...initialState,
        items: [{ id: 1, name: "Repo" }],
        currentPage: 2,
        hasMore: false,
      };
      const newState = listReducer(stateWithItems, resetList());
      expect(newState.items).toEqual([]);
      expect(newState.currentPage).toBe(1);
      expect(newState.hasMore).toBe(true);
    });
  });
  