import React, { useState, useEffect, useRef } from "react";
import "./natureListManger.scss";
import NatureList from "../natureList/NatureList";
import Nature from "../../interfaces/INature";
import SearchBar from "../SearchBar";

const NatureListManager = () => {
  const [natureList, setNatureList] = useState<Nature[]>([]);
  const [visitedNatureList, setVisitedNatureList] = useState<Nature[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNatureList, setFilteredNatureList] = useState<Nature[]>([]);
  const [filteredVisitedNatureList, setFilteredVisitedNatureList] = useState<
    Nature[]
  >([]);
  const natureListEndRef = useRef<HTMLDivElement>(null);
  const visitedNatureListEndRef = useRef<HTMLDivElement>(null);
  const [natureListLoadedItemCount, setNatureListLoadedItemCount] =
    useState(10);
  const [
    visitedNatureListLoadedItemCount,
    setVisitedNatureListLoadedItemCount,
  ] = useState(10);

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
    const filteredNatureList = natureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredVisitedNatureList = visitedNatureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNatureList(filteredNatureList);
    setFilteredVisitedNatureList(filteredVisitedNatureList);
  }, [searchQuery, natureList, visitedNatureList]);

  const isElementAtViewportBottom = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    return elementRect.bottom <= window.innerHeight;
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        natureListEndRef.current &&
        isElementAtViewportBottom(natureListEndRef.current)
      ) {
        setNatureListLoadedItemCount((prevCount) => prevCount + 10);
      }
      if (
        visitedNatureListEndRef.current &&
        isElementAtViewportBottom(visitedNatureListEndRef.current)
      ) {
        setVisitedNatureListLoadedItemCount((prevCount) => prevCount + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="natureListManager">
      <SearchBar onSearch={handleSearch} />
      <div className="natureListContainer">
        <NatureList
          title="Nature List"
          natures={filteredNatureList.slice(0, natureListLoadedItemCount)}
          onAddToVisitedNatureList={addToVisitedNatureList}
          listEndRef={natureListEndRef}
        />
        <NatureList
          title="Visited Nature List"
          natures={filteredVisitedNatureList.slice(
            0,
            visitedNatureListLoadedItemCount
          )}
          onRemoveFromVisitedNatureList={removeFromVisitedNatureList}
          listEndRef={visitedNatureListEndRef}
        />
      </div>
    </div>
  );
};

export default NatureListManager;
