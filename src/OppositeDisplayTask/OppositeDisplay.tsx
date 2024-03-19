import React from "react";
import "./oppositeDisplay.scss";

type DataItem = {
  image: string;
  paragraph: string;
};

const OppositeDisplay: React.FC<{ data: DataItem[] }> = ({ data }) => {
  return (
    <div className="opposite-display">
      {data.map((item, index) => (
        <div key={index} className="item">
          <div className="paragraph">{item.paragraph}</div>
          <div className="imageContainer">
            <img
              className="image"
              src={item.image}
              alt={`Gaza strip img ${index + 1}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default OppositeDisplay;
