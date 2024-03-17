import React, { useState, useEffect } from "react";
import "./watchListManger.scss";
import WatchingList from "../watchList/WatchList";
import Movie from "../../interfaces/IMovie";
import SearchBar from "../SearchBar";

const WatchListManager = () => {
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [watchedList, setWatchedList] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredWatchList, setFilteredWatchList] = useState<Movie[]>([]);
  const [filteredWatchedList, setFilteredWatchedList] = useState<Movie[]>([]);

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

  return (
    <div className="watchListManager">
      <SearchBar onSearch={handleSearch} />
      <div className="watchingListContainer">
        <WatchingList
          title="Watch List"
          movies={filteredWatchList.slice(0, 10)}
          onAddToWatchedList={addToWatchedList}
        />
        <WatchingList
          title="Watched List"
          movies={filteredWatchedList.slice(0, 10)}
          onRemoveFromWatchedList={removeFromWatchedList}
        />
      </div>
    </div>
  );
};

export default WatchListManager;
