import React from "react";
import "./App.scss";
import OppositeDisplay from "./components/OppositeDisplay";
import data from "./constants/data";
import NatureListManger from "./components/natureListManager/NatureListManger";

function App() {
  return (
    <div className="app">
      <h1 className="appTitle">Gaza Strip </h1>
      <OppositeDisplay data={data} />
      <hr /> <hr />
      <NatureListManger />
    </div>
  );
}

export default App;
