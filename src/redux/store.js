import { legacy_createStore as createStore } from "redux";
import {
  START_GAME,
  RESTART_GAME,
  SET_PARAMETERS,
  SELECT_LEVEL,
} from "./actions";

const defaultState = {
  isGameStarted: false,
  isLevelSelected: false,
  gridSize: 0,
  bombsCount: 0,
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case START_GAME:
      return { ...state, isGameStarted: true };
    case SET_PARAMETERS:
      return {
        ...state,
        gridSize: payload.gridSize,
        bombsCount: payload.bombsCount,
      };
    case SELECT_LEVEL:
      return { ...state, isLevelSelected: true };
    case RESTART_GAME:
      return { ...defaultState };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
