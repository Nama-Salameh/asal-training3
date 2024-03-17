import React, { useState, useEffect } from "react";
import "./watchListManger.scss";
import WatchingList from "../watchList/WatchList";
import Movie from "../../interfaces/IMovie";
import SearchBar from "../SearchBar";
import { VirtualScroller } from "primereact/virtualscroller";

const WatchListManager = () => {
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [watchedList, setWatchedList] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredWatchList, setFilteredWatchList] = useState<Movie[]>([]);
  const [filteredWatchedList, setFilteredWatchedList] = useState<Movie[]>([]);
  const [loadedItemCount, setLoadedItemCount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/26cead06-d092-41d0-9317-d964faa232ee"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWatchList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToWatchedList = (movie: Movie) => {
    setWatchedList((prevState) => [movie, ...prevState]);
    setWatchList((prevState) =>
      prevState.filter((item) => item.id !== movie.id)
    );
  };

  const removeFromWatchedList = (movie: Movie) => {
    setWatchedList((prevState) =>
      prevState.filter((item) => item.id !== movie.id)
    );
    setWatchList((prevState) => [...prevState, movie]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredWatchList = watchList.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredWatchedList = watchedList.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredWatchList(filteredWatchList);
    setFilteredWatchedList(filteredWatchedList);
  }, [searchQuery, watchList, watchedList]);

  const onLoadMore = () => {
    console.log("count ", loadedItemCount);
    setLoadedItemCount((prevCount) => prevCount + 10);
    console.log("after add ", loadedItemCount);
  };

  return (
    <div className="watchListManager">
      <SearchBar onSearch={handleSearch} />
      <div className="watchingListContainer">
        <div className="listContainer">
          <h2 className="watchListTitle">Watch List</h2>
          <VirtualScroller
            items={filteredWatchList.slice(0, loadedItemCount)}
            itemSize={200}
            itemTemplate={(movie: Movie) => (
              <WatchingList
                title="Watch List"
                movies={[movie]}
                onAddToWatchedList={addToWatchedList}
              />
            )}
            className="border-1 surface-border border-round"
            style={{ height: "650px" }}
            onLazyLoad={onLoadMore}
          />
        </div>

        <div className="listContainer">
          <h2 className="watchedListTitle">Watched List</h2>
          <VirtualScroller
            items={filteredWatchedList.slice(0, loadedItemCount)}
            itemSize={200}
            itemTemplate={(movie: Movie) => (
              <WatchingList
                title="Watch List"
                movies={[movie]}
                onRemoveFromWatchedList={removeFromWatchedList}
              />
            )}
            className="border-1 surface-border border-round"
            style={{ height: "650px" }}
            onLazyLoad={onLoadMore}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchListManager;
