import React from "react";
import NatureCard from "../natureCard/NatureCard";
import Nature from "../../interfaces/INature";
import "./natureList.scss";

const NatureList: React.FC<{
  title: string;
  natures: Nature[];
  onAddToVisitedNatureList?: (nature: Nature) => void;
  onRemoveFromVisitedNatureList?: (nature: Nature) => void;
  listEndRef: React.RefObject<HTMLDivElement>;
}> = ({
  title,
  natures,
  onAddToVisitedNatureList,
  onRemoveFromVisitedNatureList,
  listEndRef,
}) => {
  return (
    <div className="natureList">
      <h2 className="title">{title}</h2>
      {natures.map((nature) => (
        <NatureCard
          key={nature.id}
          nature={nature}
          onAddToVisitedNatureList={
            onAddToVisitedNatureList
              ? () => onAddToVisitedNatureList(nature)
              : undefined
          }
          onRemoveFromVisitedNatureList={
            onRemoveFromVisitedNatureList
              ? () => onRemoveFromVisitedNatureList(nature)
              : undefined
          }
        />
      ))}
      <div ref={listEndRef} style={{ height: "1px" }} />
    </div>
  );
};

export default NatureList;
