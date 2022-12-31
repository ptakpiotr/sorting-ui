import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAlgorithmInfoStore } from "../App";
import { IAlgorithmInfoState } from "../Types";
import AlgoDesc from "./AlgoDesc";
import AuthComponent from "./Universal/AuthComponent";
import Loader from "./Universal/Loader";
import Vis from "./Vis";

function AlgoInfo() {
  const { algorithm } = useParams();
  const [description, setDescription] = useState<string>("");
  const { algorithms } = useAlgorithmInfoStore((st: IAlgorithmInfoState) => st);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/algorithms/single?lang=EN&algorithm=${algorithm?.replace(
          "-",
          ""
        )}`,
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
  }, []);
  return (
    <main className="algo-info">
      <article>
        <section>
          <img
            src={
              algorithms.filter((a) =>
                a.name.toLowerCase().startsWith(algorithm?.split("-")[0] || "")
              )[0]?.photo
                ? algorithms.filter((a) =>
                    a.name
                      .toLowerCase()
                      .startsWith(algorithm?.split("-")[0] || "")
                  )[0]?.photo
                : "https://placehold.co/600x400"
            }
            alt={"Algorithm photo"}
          />
          <h1>{algorithm?.split("-").join(" ")}</h1>
        </section>
        <AuthComponent verifyAdmin={false}>
          {description ? <AlgoDesc desc={description} /> : <Loader />}
        </AuthComponent>
        <section>
          <Vis />
        </section>
      </article>
    </main>
  );
}

export default AlgoInfo;
