import React, { useEffect } from "react";
import AlgoBox from "./AlgoBox";

function Intro() {
  return (
    <div className="intro-box">
      <AlgoBox description="Tsst" title="Test" link="/algoinfo/1" />
      <AlgoBox description="Tsst" title="Test" link="/algoinfo/2" />
      <AlgoBox description="Tsst" title="Test" link="/algoinfo/3" />
    </div>
  );
}

export default Intro;
