import { useState } from "react";
import { useDispatch } from "react-redux";
import { START_GAME, SET_PARAMETERS, SELECT_LEVEL } from "../../redux/actions";

import "./gridMenu.scss";

const levelList = [
  {
    level: "Level 1",
    size: 5,
    bombsCount: 3,
  },
  {
    level: "Level 2",
    size: 10,
    bombsCount: 10,
  },
  {
    level: "Level 3",
    size: 15,
    bombsCount: 25,
  },
];

export const GridMenu = () => {
  const [gridSize, setGridSize] = useState(0);
  const [bombsCount, setBombsCount] = useState(0);
  const [isLevelSelected, setLevelSelected] = useState(false);

  const dispatch = useDispatch();

  const handlePlayBtn = () => {
    if (gridSize && bombsCount) {
      dispatch({ type: START_GAME });
      dispatch({ type: SET_PARAMETERS, payload: { gridSize, bombsCount } });
    }

    isLevelSelected && dispatch({ type: SELECT_LEVEL });
  };

  const handleLvlBtn = (size, count) => {
    setGridSize(size);
    setBombsCount(count);
    setLevelSelected(true);
  };

  const handleSizeInput = (e) => {
    const value = e.target.value && parseInt(e.target.value);
    if (!isNaN(value)) {
      setGridSize(value);
      setLevelSelected(false);
    }
  };

  const handleBombsCountInput = (e) => {
    const value = e.target.value && parseInt(e.target.value);
    if (!isNaN(value)) {
      setBombsCount(value);
      setLevelSelected(false);
    }
  };

  const isLvlBtnActive = (size, count) => {
    return size === gridSize && count === bombsCount;
  };

  return (
    <div className="grid-menu">
      <div className="level-list">
        <p>Choose level</p>
        {levelList.map(({ level, size, bombsCount }, idx) => (
          <button
            key={idx}
            className={`level-list-btn ${
              isLvlBtnActive(size, bombsCount) ? "active" : ""
            }`}
            onClick={() => handleLvlBtn(size, bombsCount)}
          >
            {level}
          </button>
        ))}
      </div>
      <p>OR</p>
      <p>specify parameters</p>
      <div className="level-editor">
        <input
          type="text"
          placeholder="Enter a grid size"
          onChange={handleSizeInput}
        />
        <input
          type="text"
          placeholder="Enter the number of bombs"
          onChange={handleBombsCountInput}
        />
      </div>
      {gridSize && bombsCount ? (
        <button className="play-btn" onClick={handlePlayBtn}>
          {isLevelSelected ? "PLAY" : "Define bombs position"}
        </button>
      ) : null}
    </div>
  );
};
