import React, { useState } from "react";

function AlgoBox() {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>();
  const desc = "Some description...";
  const title = "Bubble sort";

  return (
    <div
      className="algo-box"
      onMouseEnter={() => {
        setShowMoreInfo(true);
      }}
      onMouseLeave={() => {
        setShowMoreInfo(false);
      }}
    >
      <div className="algo-box-top">
        <img
          src="https://via.placeholder.com/350x180"
          alt={"Algorithm photo"}
        />
      </div>
      <div className="algo-box-body">{showMoreInfo ? desc : title}</div>
    </div>
  );
}

export default AlgoBox;
