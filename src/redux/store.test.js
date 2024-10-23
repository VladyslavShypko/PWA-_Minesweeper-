import store from "./store";
import {
  START_GAME,
  RESTART_GAME,
  SET_PARAMETERS,
  SELECT_LEVEL,
} from "./actions";

describe("Redux Store", () => {
  beforeEach(() => {
    store.dispatch({ type: RESTART_GAME });
  });

  test("should have initial state", () => {
    const state = store.getState();
    expect(state).toEqual({
      isGameStarted: false,
      isLevelSelected: false,
      gridSize: 0,
      bombsCount: 0,
    });
  });

  test("should handle START_GAME action", () => {
    store.dispatch({ type: START_GAME });
    const state = store.getState();
    expect(state.isGameStarted).toBe(true);
  });

  test("should handle SET_PARAMETERS action", () => {
    const payload = { gridSize: 10, bombsCount: 5 };
    store.dispatch({ type: SET_PARAMETERS, payload });
    const state = store.getState();
    expect(state.gridSize).toBe(payload.gridSize);
    expect(state.bombsCount).toBe(payload.bombsCount);
  });

  test("should handle SELECT_LEVEL action", () => {
    store.dispatch({ type: SELECT_LEVEL });
    const state = store.getState();
    expect(state.isLevelSelected).toBe(true);
  });

  test("should handle RESTART_GAME action", () => {
    store.dispatch({ type: START_GAME });
    store.dispatch({
      type: SET_PARAMETERS,
      payload: { gridSize: 10, bombsCount: 5 },
    });
    store.dispatch({ type: SELECT_LEVEL });

    store.dispatch({ type: RESTART_GAME });
    const state = store.getState();
    expect(state).toEqual({
      isGameStarted: false,
      isLevelSelected: false,
      gridSize: 0,
      bombsCount: 0,
    });
  });
});
