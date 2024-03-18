import React from "react";
import NatureCard from "../natureCard/NatureCard";
import Nature from "../../interfaces/INature";
import "./natureList.scss";

const NatureList: React.FC<{
  title: string;
  natures: Nature[];
  onAddToVisitedNatureList?: (nature: Nature) => void;
  onRemoveFromVisitedNatureList?: (nature: Nature) => void;
}> = ({ title, natures,  onAddToVisitedNatureList, onRemoveFromVisitedNatureList }) => {
  return (
    <div className="natureList">
      <h2 className="title">{title}</h2>
      {natures.map((nature) => (
        <NatureCard
          key={nature.id}
          nature={nature}
          onAddToVisitedNatureList={
            onAddToVisitedNatureList ? () =>  onAddToVisitedNatureList(nature) : undefined
          }
          onRemoveFromVisitedNatureList={
            onRemoveFromVisitedNatureList
              ? () => onRemoveFromVisitedNatureList(nature)
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default NatureList;
