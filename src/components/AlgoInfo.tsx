import React, { useEffect } from "react";
import { useParams } from "react-router";
import Vis from "./Vis";

function AlgoInfo() {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <main>
      <div>{params.id}</div>
      <div>
        <Vis />
      </div>
    </main>
  );
}

export default AlgoInfo;
