import React from "react";
import MovieCard from "../movieCard/MovieCard";
import Movie from "../../interfaces/IMovie";
import "./watchList.scss";

const WatchingList: React.FC<{
  title: string;
  movies: Movie[];
  onAddToWatchedList?: (movie: Movie) => void;
  onRemoveFromWatchedList?: (movie: Movie) => void;
}> = ({ title, movies, onAddToWatchedList, onRemoveFromWatchedList }) => {
  return (
    <div className="watchingList">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToWatchedList={
            onAddToWatchedList ? () => onAddToWatchedList(movie) : undefined
          }
          onRemoveFromWatchedList={
            onRemoveFromWatchedList
              ? () => onRemoveFromWatchedList(movie)
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default WatchingList;
