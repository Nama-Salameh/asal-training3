import React, { useState, useEffect } from "react";
import "./natureList.scss";
import { Nature } from "../../../NatureTask/natureListManager/NatureListManger";

const NatureList: React.FC<{
  title: string;
  natures: Nature[];
  onAddToVisitedNatureList?: (natureId: string) => void;
  onRemoveFromVisitedNatureList?: (natureId: string) => void;
  searchQuery: string;
  listEndRef: React.RefObject<HTMLDivElement>;
}> = ({
  title,
  natures,
  onAddToVisitedNatureList,
  onRemoveFromVisitedNatureList,
  searchQuery,
  listEndRef,
}) => {
  const [filteredNatureList, setFilteredNatureList] = useState<Nature[]>([]);

  useEffect(() => {
    const filteredNatureList = natures.filter((nature) =>
      nature.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNatureList(filteredNatureList);
  }, [searchQuery, natures]);

  return (
    <div className="natureList">
      <h2 className="title">{title}</h2>
      {filteredNatureList.map((nature) => (
        <div key={nature.id} className="natureCard">
          <img src={nature.avatar} alt={nature.title} className="natureImage" />
          <div className="cardContent">
            <h3 className="natureTitle"> {nature.title}</h3>
            <p className="natureOverview"> {nature.overview}</p>
            {onAddToVisitedNatureList && (
              <button
                onClick={() => onAddToVisitedNatureList(nature.id)}
                className="addButton"
              >
                Visit
              </button>
            )}
            {onRemoveFromVisitedNatureList && (
              <button
                onClick={() => onRemoveFromVisitedNatureList(nature.id)}
                color="secondary"
                className="removeButton"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <div ref={listEndRef} style={{ height: "1px" }} />
    </div>
  );
};

export default NatureList;
