import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import Movie from "../../interfaces/IMovie";
import "./movieCard.scss";

const MovieCard: React.FC<{
  movie: Movie;
  onAddToWatchedList?: () => void;
  onRemoveFromWatchedList?: () => void;
}> = ({ movie, onAddToWatchedList, onRemoveFromWatchedList }) => {
  return (
    <Card key={movie.id} className="movieCard">
      <CardMedia
        component="img"
        alt={movie.title}
        image={movie.poster}
        title={movie.title}
        className="movieImage"
      />
      <CardContent className="cardContent">
        <Typography variant="h6" component="h6" className="movieTitle">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className="movieOverview">
          {movie.overview}
        </Typography>
        <div className="cardFooter">
          <Typography variant="body2" color="textSecondary" component="p" className="releaseDate">
            {new Date(movie.release_date * 1000).toLocaleDateString()}
          </Typography>
          {onAddToWatchedList && (
            <Button
              onClick={onAddToWatchedList}
              variant="contained"
              className="addButton"
            >
              Watch
            </Button>
          )}
          {onRemoveFromWatchedList && (
            <Button
              onClick={onRemoveFromWatchedList}
              variant="contained"
              color="secondary"
              className="removeButton"
            >
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
