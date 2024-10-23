import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Grid } from "./grid";

const mockStore = configureStore([]);

describe("Grid Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      bombsCount: 3,
      isLevelSelected: false,
      gridSize: 3,
    });
    jest.spyOn(store, "dispatch");
  });

  test("renders initial layout and state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    expect(getByText("Define bombs position")).toBeInTheDocument();
  });

  test("updates state and displays bombs count when level is selected", () => {
    store = mockStore({
      bombsCount: 3,
      isLevelSelected: true,
      gridSize: 3,
    });

    const { getByText } = render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    expect(getByText("Bombs: 3")).toBeInTheDocument();
    expect(getByText("Let's go!")).toBeInTheDocument();
  });
});
