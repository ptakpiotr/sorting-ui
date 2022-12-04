import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import AlgoDesc from "./AlgoDesc";
import Vis from "./Vis";

function AlgoInfo() {
  const params = useParams();
  useEffect(() => {
    // axios call here
    console.log(params);
  }, []);
  return (
    <main className="algo-info">
      <div>{params.id}</div>
      <div>
        <Vis />
      </div>
      <AlgoDesc />
      {/* here image of example */}
    </main>
  );
}

export default AlgoInfo;
