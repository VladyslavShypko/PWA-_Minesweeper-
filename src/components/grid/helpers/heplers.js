export const getInitialOpenFields = (size) =>
  new Array(size * size).fill(false);

export const isValuesInRange = (x, y, size) =>
  x >= 0 && x < size && y >= 0 && y < size;

export const addIconIfBomb = (field) =>
  field === -1 ? "💣" : field === -11 ? "📍" : field;

export const setBombs = (size, bombsCount) => {
  const bombСoordinates = [];

  while (bombСoordinates.length !== bombsCount) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    !bombСoordinates.find((сoord) => сoord[0] + сoord[1] === x + y) &&
      bombСoordinates.push([y, x]);
  }

  return bombСoordinates;
};

export const createEmptyGrid = (size) =>
  new Array(size * size).fill(0).reduce((result, _, idx, arr) => {
    if (idx % size === 0) result.push(arr.slice(idx, idx + size));
    return result;
  }, []);

export const createGrid = (size, bombСoordinates) => {
  const grid = createEmptyGrid(size);

  bombСoordinates.forEach(([y, x]) => {
    grid[y][x] = -1;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          isValuesInRange(x + j, y + i, size) &&
          grid[y + i][x + j] !== -1 &&
          grid[y + i][x + j] !== -11
        ) {
          grid[y + i][x + j] += 1;
        }
      }
    }
  });

  return grid;
};
