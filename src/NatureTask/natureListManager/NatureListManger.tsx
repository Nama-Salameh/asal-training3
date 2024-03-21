import { useEffect, useRef, useState } from "react";
import NatureList from "../../components/NatureTaskComponents/natureList/NatureList";
import SearchBar from "../../components/NatureTaskComponents/searchBar/SearchBar";
import "./natureListManger.scss";

export interface Nature {
  id: string;
  title: string;
  avatar: string;
  overview: string;
  release_date: number;
}

const NatureListManager = () => {
  const [natureList, setNatureList] = useState<Nature[]>([]);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [natureListLoadedItemCount, setNatureListLoadedItemCount] =
    useState(10);

  const addToVisitedNatureList = (natureId: string) => {
    setVisitedIds((prevState) => [natureId, ...prevState]);
  };

  const removeFromVisitedNatureList = (natureId: string) => {
    setVisitedIds(visitedIds.filter((item) => item !== natureId));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { scrollTop, clientHeight, scrollHeight } = container;

      if (scrollHeight - (scrollTop + clientHeight) <= 1) {
        setNatureListLoadedItemCount((prevCount) => prevCount + 10);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
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
          loadedItemsCount={natureListLoadedItemCount}
        />
        <NatureList
          title="Visited Nature List"
          natures={natureList.filter((item) => visitedIds.includes(item.id))}
          onRemoveFromVisitedNatureList={removeFromVisitedNatureList}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default NatureListManager;
