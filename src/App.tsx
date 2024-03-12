import React from "react";
import "./App.scss";
import OppositeDisplay from "./components/OppositeDisplay";
import data from "./constants/data";

function App() {
  return (
    <div className="app">
      <h1 className="appTitle">Gaza Strip </h1>
      <OppositeDisplay data={data} />
    </div>
  );
}

export default App;
