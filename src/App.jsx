import { Grid } from "./components/grid";
import { GridMenu } from "./components/gridMenu";
import { useSelector } from "react-redux";

import "./App.scss";

function App() {
  const isGameStarted = useSelector((state) => state.isGameStarted);
  return <div className="App">{isGameStarted ? <Grid /> : <GridMenu />}</div>;
}

export default App;
