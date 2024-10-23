import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_LEVEL, RESTART_GAME } from "../../redux/actions";
import {
  createGrid,
  isValuesInRange,
  addIconIfBomb,
  createEmptyGrid,
  setBombs,
  getInitialOpenFields,
} from "./helpers/heplers";

import "./grid.scss";

const results = {
  LOST: "LOST",
  WIN: "WIN",
  INITIAL: "",
};

export const Grid = () => {
  const bombsCount = useSelector((state) => state.bombsCount);
  const isLevelSelected = useSelector((state) => state.isLevelSelected);
  const gridSize = useSelector((state) => state.gridSize);

  const dispatch = useDispatch();

  const [grid, setGrid] = useState([]);
  const [result, setResult] = useState(results.INITIAL);
  const [numberBombsFound, setNumberBombsFound] = useState(0);
  const [bombСoordinates, setBombСoordinates] = useState([]);
  const [openedFields, setOpenedFields] = useState([]);

  useEffect(() => {
    if (isLevelSelected) {
      if (!bombСoordinates.length) {
        setBombСoordinates(setBombs(gridSize, bombsCount));
      } else {
        setOpenedFields(getInitialOpenFields(gridSize));
        setGrid(createGrid(gridSize, bombСoordinates));
      }
    }
  }, [isLevelSelected, bombsCount, bombСoordinates, gridSize]);

  useEffect(() => {
    if (!isLevelSelected) {
      setOpenedFields(getInitialOpenFields(gridSize));
      setGrid(createEmptyGrid(gridSize));
    }
  }, [isLevelSelected, gridSize]);

  const checkResult = () =>
    !result && !grid.flat().includes(-1) && setResult(results.WIN);

  const openField = (rowIdx, fieldIdx) => {
    if (openedFields[rowIdx * gridSize + fieldIdx]) return;
    const updatedOpenedFields = [...openedFields];

    const open = (fieldIdx, rowIdx) => {
      if (
        isValuesInRange(fieldIdx, rowIdx, gridSize) &&
        !updatedOpenedFields[rowIdx * gridSize + fieldIdx]
      ) {
        updatedOpenedFields[rowIdx * gridSize + fieldIdx] = true;
        if (grid[rowIdx][fieldIdx] === -1) {
          setResult(results.LOST);
          setOpenedFields(updatedOpenedFields.fill(true));
        } else {
          if (grid[rowIdx][fieldIdx] === 0) {
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                open(fieldIdx + x, rowIdx + y);
              }
            }
          }
        }
      }
    };

    open(fieldIdx, rowIdx);
    setOpenedFields(updatedOpenedFields);
    !updatedOpenedFields.includes(false) && checkResult();
  };

  const addBomb = (rowIdx, fieldIdx) => {
    if (!openedFields[rowIdx * gridSize + fieldIdx]) {
      if (bombСoordinates.length !== bombsCount) {
        openedFields[rowIdx * gridSize + fieldIdx] = true;
        grid[rowIdx][fieldIdx] = -1;
        setBombСoordinates((prev) => [...prev, [rowIdx, fieldIdx]]);
        setOpenedFields((prev) => [...prev]);

        bombsCount - bombСoordinates.length === 1 &&
          dispatch({ type: SELECT_LEVEL });
      }
    }
  };

  const handleLeftClick = (rowIdx, fieldIdx) => {
    isLevelSelected ? openField(rowIdx, fieldIdx) : addBomb(rowIdx, fieldIdx);
  };

  const handleRightClick = (e, rowIdx, fieldIdx) => {
    e.preventDefault();
    if (openedFields[rowIdx * gridSize + fieldIdx]) return;
    openedFields[rowIdx * gridSize + fieldIdx] = true;
    grid[rowIdx][fieldIdx] = -11;

    setNumberBombsFound(numberBombsFound + 1);
    !openedFields.includes(false) && checkResult();
    setOpenedFields((prev) => [...prev]);
  };

  const handleRestartBtn = () => {
    dispatch({ type: RESTART_GAME });
  };

  const bombsFound = "Bombs: " + (bombsCount - numberBombsFound);

  return (
    <div className="grid">
      <div className="grid-header">
        <h2 className="result">{result}</h2>
        <h3>{isLevelSelected ? "Let's go!" : "Define bombs position"}</h3>
        {isLevelSelected && <p>{bombsFound}</p>}
      </div>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((field, fieldIdx) => (
            <div
              key={fieldIdx}
              className={`field mask ${
                openedFields[rowIdx * gridSize + fieldIdx] ? "show-field" : ""
              }`}
              onClick={() => handleLeftClick(rowIdx, fieldIdx)}
              onContextMenu={(e) => handleRightClick(e, rowIdx, fieldIdx)}
            >
              {addIconIfBomb(field)}
            </div>
          ))}
        </div>
      ))}
      {result && (
        <button className="restart-btn" onClick={handleRestartBtn}>
          Restart
        </button>
      )}
    </div>
  );
};
