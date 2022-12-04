import React, { useState } from "react";
import { Link } from "react-router-dom";
interface IProps {
  description: string;
  title: string;
  link: string;
}

function AlgoBox({ description, title, link }: IProps) {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>();

  return (
    <Link to={link}>
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
        <div className="algo-box-body">
          {showMoreInfo ? `${description.substring(0, 10)}...` : title}
        </div>
      </div>
    </Link>
  );
}

export default AlgoBox;
