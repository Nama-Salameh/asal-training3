import React, { useState, useEffect } from "react";
import "./natureListManger.scss";
import NatureList from "../natureList/NatureList";
import Nature from "../../interfaces/INature";
import SearchBar from "../SearchBar";

const NatureListManager = () => {
  const [natureList, setNatureList] = useState<Nature[]>([]);
  const [visitedNatureList, setVisitedNatureList] = useState<Nature[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNatureList, setFilteredNatureList] = useState<Nature[]>([]);
  const [filteredVisitedNatureList, setfilteredVisitedNatureList] = useState<Nature[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65f7f6dfb4f842e808867e5f.mockapi.io/Asal/movies"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNatureList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToVisitedNatureList = (nature: Nature) => {
    setVisitedNatureList((prevState) => [nature, ...prevState]);
    setNatureList((prevState) =>
      prevState.filter((item) => item.id !== nature.id)
    );
  };

  const removeFromVisitedNatureList = (nature: Nature) => {
    setVisitedNatureList((prevState) =>
      prevState.filter((item) => item.id !== nature.id)
    );
    setNatureList((prevState) => [...prevState, nature]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredWatchList = natureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredVisitedNatureList = visitedNatureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNatureList(filteredWatchList);
    setfilteredVisitedNatureList(filteredVisitedNatureList);
  }, [searchQuery, natureList, visitedNatureList]);

  return (
    <div className="natureListManager">
      <SearchBar onSearch={handleSearch} />
      <div className="natureListContainer">
        <NatureList
          title="Nature List"
          natures={filteredNatureList.slice(0, 10)}
          onAddToVisitedNatureList={addToVisitedNatureList}
        />
        <NatureList
          title="Visited nature List"
          natures={filteredVisitedNatureList.slice(0, 10)}
          onRemoveFromVisitedNatureList={removeFromVisitedNatureList}
        />
      </div>
    </div>
  );
};

export default NatureListManager;
