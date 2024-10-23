import {
  getInitialOpenFields,
  isValuesInRange,
  addIconIfBomb,
  setBombs,
  createEmptyGrid,
  createGrid,
} from "./heplers";

describe("Helpers Functions", () => {
  test("getInitialOpenFields returns an array of false values", () => {
    const size = 3;
    const result = getInitialOpenFields(size);
    expect(result).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  test("isValuesInRange returns true for valid coordinates", () => {
    expect(isValuesInRange(1, 1, 3)).toBe(true);
    expect(isValuesInRange(0, 0, 5)).toBe(true);
    expect(isValuesInRange(4, 4, 5)).toBe(true);
  });

  test("isValuesInRange returns false for out-of-range coordinates", () => {
    expect(isValuesInRange(-1, 1, 3)).toBe(false);
    expect(isValuesInRange(3, 3, 3)).toBe(false);
    expect(isValuesInRange(1, -1, 3)).toBe(false);
  });

  test("addIconIfBomb returns correct icons based on field value", () => {
    expect(addIconIfBomb(-1)).toBe("💣");
    expect(addIconIfBomb(-11)).toBe("📍");
    expect(addIconIfBomb(5)).toBe(5);
  });

  test("setBombs generates unique bomb coordinates", () => {
    const size = 5;
    const bombsCount = 3;
    const bombCoordinates = setBombs(size, bombsCount);

    expect(bombCoordinates.length).toBe(bombsCount);
    bombCoordinates.forEach((coord) => {
      expect(isValuesInRange(coord[1], coord[0], size)).toBe(true);
    });
  });

  test("createEmptyGrid returns a 2D array of specified size", () => {
    const size = 3;
    const result = createEmptyGrid(size);
    expect(result).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  test("createGrid populates grid with bombs and adjacent counts", () => {
    const size = 3;
    const bombCoordinates = [
      [1, 1],
      [0, 0],
    ];
    const result = createGrid(size, bombCoordinates);

    expect(result).toEqual([
      [-1, 2, 1],
      [2, -1, 1],
      [1, 1, 1],
    ]);
  });
});
