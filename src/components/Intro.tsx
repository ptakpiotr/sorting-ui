import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlgorithmInfoStore } from "../App";
import { IAlgorithmCardInfo, IAlgorithmInfoState } from "../Types";
import AlgoBox from "./AlgoBox";
import Loader from "./Universal/Loader";

function Intro() {
  const [algorithms, setAlgorithms] = useState<IAlgorithmCardInfo[]>([]);
  const { setAlgos } = useAlgorithmInfoStore((st: IAlgorithmInfoState) => st);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/algorithms`)
      .then((data) => {
        setAlgorithms(data.data.data);
        setAlgos(data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="intro-box">
      {algorithms ? (
        algorithms.map((a) => {
          return (
            <AlgoBox
              key={a._id}
              description={a.name}
              title={a.name}
              photo={a.photo}
              complexity={a.complexity}
              link={`algoinfo/${a.name.replace(" ", "-").toLowerCase()}`}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Intro;
