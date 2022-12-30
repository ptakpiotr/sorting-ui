import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAlgorithmInfoStore, useResultsStore } from "../App";
import AlgoDesc from "./AlgoDesc";
import AuthComponent from "./Universal/AuthComponent";
import Vis from "./Vis";

function AlgoInfo() {
  const params = useParams();
  const { numbers } = useResultsStore((st: any) => st);
  const [description, setDescription] = useState<string>("");
  const { algorithms } = useAlgorithmInfoStore((st: any) => st);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/algorithms/single?lang=PL&algorithm=Sortowanie_szybkie`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((dt) => {
        const { description } = dt.data;
        setDescription(description);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(params);
  }, []);
  return (
    <main className="algo-info">
      <article>
        <section>
          <img
            src={
              algorithms[0]?.photo
                ? algorithms[0]?.photo
                : "https://placehold.co/600x400"
            }
            alt={"1111"}
          />
          <h1>Bubble sort</h1>
        </section>
        <AuthComponent verifyAdmin={false}>
          <AlgoDesc desc={description} />
        </AuthComponent>
        <section>
          <Vis />
        </section>
      </article>
    </main>
  );
}

export default AlgoInfo;
