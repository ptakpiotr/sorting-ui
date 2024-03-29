import * as React from "react";
import { MathJax } from "better-react-mathjax";
import { useState } from "react";
interface IProps {
  description: string;
  title: string;
  link: string;
  photo?: string;
  complexity?: string;
}

function AlgoBox({ description, title, link, photo, complexity }: IProps) {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>();

  return (
    <a href={link}>
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
            src={photo ? photo : "https://via.placeholder.com/350x180"}
            alt={"Algorithm photo"}
            style={{
              maxWidth: "350px",
            }}
          />
        </div>
        <div className="algo-box-body">
          {showMoreInfo ? (
            <>
              <>{`${description.substring(0, 15)}  `}</>
              <MathJax style={{ display: "inline-block" }}>
                {`\\(\\theta{(${complexity})}\\) ...`}
              </MathJax>
            </>
          ) : (
            title
          )}
        </div>
      </div>
    </a>
  );
}

export default AlgoBox;
