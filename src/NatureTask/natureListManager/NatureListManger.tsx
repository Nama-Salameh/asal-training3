import React, { useState, useEffect, useRef } from "react";
import "./natureListManger.scss";
import NatureList from "../../components/NatureTaskComponents/natureList/NatureList";
import SearchBar from "../../components/NatureTaskComponents/searchBar/SearchBar";

export interface Nature {
  id: string;
  title: string;
  avatar: string;
  overview: string;
  release_date: number;
}

const NatureListManager = () => {
  const [natureList, setNatureList] = useState<Nature[]>([]); // all natures
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const natureListEndRef = useRef<HTMLDivElement>(null);
  const visitedNatureListEndRef = useRef<HTMLDivElement>(null);
  const [natureListLoadedItemCount, setNatureListLoadedItemCount] =
    useState(10);
  const [
    visitedNatureListLoadedItemCount,
    setVisitedNatureListLoadedItemCount,
  ] = useState(10);

  const addToVisitedNatureList = (natureId: string) => {
    setVisitedIds((prevState) => [natureId, ...prevState]);
  };

  const removeFromVisitedNatureList = (natureId: string) => {
    setVisitedIds(visitedIds.filter((item) => item !== natureId));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isElementAtViewportBottom = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    return elementRect.bottom <= window.innerHeight;
  };

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
  /*
  useEffect(() => {
    const filteredNatureList = natureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredVisitedNatureList = visitedNatureList.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNatureList(filteredNatureList);
    setFilteredVisitedNatureList(filteredVisitedNatureList);
  }, [searchQuery, natureList]);
*/
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

  useEffect(() => {
    const c = containerRef.current;
    //c?.scrollTop
  }, []);
  return (
    <div className="natureListManager" ref={containerRef}>
      <SearchBar onSearch={handleSearch} />
      <div className="natureListContainer">
        <NatureList
          title="Nature List"
          natures={natureList.filter((item) => !visitedIds.includes(item.id))}
          onAddToVisitedNatureList={addToVisitedNatureList}
          searchQuery={searchQuery}
          listEndRef={natureListEndRef}
        />
        <NatureList
          title="Visited Nature List"
          natures={natureList.filter((item) => visitedIds.includes(item.id))}
          onRemoveFromVisitedNatureList={removeFromVisitedNatureList}
          searchQuery={searchQuery}
          listEndRef={visitedNatureListEndRef}
        />
      </div>
    </div>
  );
};

export default NatureListManager;
