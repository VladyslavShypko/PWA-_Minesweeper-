import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

describe("App Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      isGameStarted: false,
    });
  });

  test("renders GridMenu when game has not started", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("Level 1")).toBeInTheDocument();
  });

  test("renders Grid when game has started", () => {
    store = mockStore({
      isGameStarted: true,
      isLevelSelected: true,
      gridSize: 5,
      bombsCount: 3,
    });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("Let's go!")).toBeInTheDocument();
  });
});
