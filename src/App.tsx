import React from "react";
import "./App.scss";
import OppositeDisplay from "./OppositeDisplayTask/OppositeDisplay";
import data from "./constants/data";
import NatureListManger from "./NatureTask/natureListManager/NatureListManger";

function App() {
  return (
    <div className="app">
      <NatureListManger />
    </div>
  );
}

export default App;
