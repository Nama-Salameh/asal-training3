import React from "react";
import "./App.scss";
import OppositeDisplay from "./components/OppositeDisplay";
import data from "./constants/data";
import WatchListManger from "./components/watchListManager/WatchListManger";

function App() {
  return (
    <div className="app">
      <h1 className="appTitle">Gaza Strip </h1>
      <OppositeDisplay data={data} />
      <hr /> <hr />
      <WatchListManger />
    </div>
  );
}

export default App;
