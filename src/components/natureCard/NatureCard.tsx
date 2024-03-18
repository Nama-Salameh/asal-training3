import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import Nature from "../../interfaces/INature";
import "./natureCard.scss";

const NatureCard: React.FC<{
  nature: Nature;
  onAddToVisitedNatureList?: () => void;
  onRemoveFromVisitedNatureList?: () => void;
}> = ({ nature, onAddToVisitedNatureList, onRemoveFromVisitedNatureList }) => {
  return (
    <Card key={nature.id} className="natureCard">
      <CardMedia
        component="img"
        alt={nature.title}
        image={nature.avatar}
        title={nature.title}
        className="natureImage"
      />
      <CardContent className="cardContent">
        <Typography variant="h6" component="h6" className="natureTitle">
          {nature.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="natureOverview"
        >
          {nature.overview}
        </Typography>
        <div className="cardFooter">
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="releaseDate"
          >
            {new Date(nature.release_date * 1000).toLocaleDateString()}
          </Typography>
          {onAddToVisitedNatureList && (
            <Button
              onClick={onAddToVisitedNatureList}
              variant="contained"
              className="addButton"
            >
              Visit
            </Button>
          )}
          {onRemoveFromVisitedNatureList && (
            <Button
              onClick={onRemoveFromVisitedNatureList}
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

export default NatureCard;
