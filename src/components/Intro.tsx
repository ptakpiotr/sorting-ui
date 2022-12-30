import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlgorithmInfoStore } from "../App";
import { IAlgorithmCardInfo } from "../Types";
import AlgoBox from "./AlgoBox";

function Intro() {
  const [algorithms, setAlgorithms] = useState<IAlgorithmCardInfo[]>([]);
  const { setAlgos } = useAlgorithmInfoStore((st: any) => st);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/algorithms`)
      .then((data) => {
        setAlgorithms(data.data.data);
        setAlgos(data.data.data);
      });
  }, []);
  return (
    <div className="intro-box">
      {algorithms &&
        algorithms.map((a) => {
          return (
            <AlgoBox
              key={a._id}
              description={a.name}
              title={a.name}
              photo={a.photo}
              complexity={a.complexity}
              link={"algoinfo/1"}
            />
          );
        })}
    </div>
  );
}

export default Intro;
