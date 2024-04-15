import { useState } from "react";
import "./App.scss";
import CountriesChildComponent from "./CountriesContextAndReducerTask/CountriesChildComponent";
import CountriesParentComponent from "./CountriesContextAndReducerTask/CountriesParentComponent";
import { CountriesProvider } from "./contexts/countriesContext/CountriesContext";

function App() {
  const [isParentVisible, setIsParentVisible] = useState(true);

  return (
    <CountriesProvider>
      <div className="app">
        {isParentVisible ? (
          <CountriesParentComponent
            goToChild={() => setIsParentVisible(false)}
          />
        ) : (
          <CountriesChildComponent goBack={() => setIsParentVisible(true)} />
        )}
      </div>
    </CountriesProvider>
  );
}

export default App;
