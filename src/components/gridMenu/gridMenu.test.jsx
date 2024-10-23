import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { GridMenu } from "./gridMenu";

const mockStore = configureStore([]);

describe("GridMenu Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test("renders level buttons", () => {
    const { getByText } = render(
      <Provider store={store}>
        <GridMenu />
      </Provider>
    );

    expect(getByText("Choose level")).toBeInTheDocument();
    expect(getByText("Level 1")).toBeInTheDocument();
    expect(getByText("Level 2")).toBeInTheDocument();
    expect(getByText("Level 3")).toBeInTheDocument();
  });

  test("selects a level and updates the grid size and bombs count", () => {
    const { getByText } = render(
      <Provider store={store}>
        <GridMenu />
      </Provider>
    );

    const levelButton = getByText("Level 2");
    fireEvent.click(levelButton);

    expect(levelButton).toHaveClass("active");
  });

  test("inputs grid size and bombs count", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <GridMenu />
      </Provider>
    );

    const gridSizeInput = getByPlaceholderText("Enter a grid size");
    const bombsCountInput = getByPlaceholderText("Enter the number of bombs");

    fireEvent.change(gridSizeInput, { target: { value: "10" } });
    fireEvent.change(bombsCountInput, { target: { value: "5" } });

    expect(gridSizeInput.value).toBe("10");
    expect(bombsCountInput.value).toBe("5");
    expect(getByText("Define bombs position")).toBeInTheDocument();
  });
});
