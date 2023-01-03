import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlgorithmInfoStore } from "../App";
import { IAlgorithmInfoState } from "../Types";
import AlgoDesc from "../components/AlgoDesc";
import AuthComponent from "../components/Universal/AuthComponent";
import Loader from "../components/Universal/Loader";
import Vis from "../components/Vis";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { init } from "../createPage";

function AlgoInfo() {
  const algorithm = new URLSearchParams(window.location.search).get("algo");
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
          "_"
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
    <DndProvider backend={HTML5Backend}>
      <main className="algo-info">
        <article>
          <section>
            <img
              src={
                algorithms.filter((a) =>
                  a.name
                    .toLowerCase()
                    .startsWith(algorithm?.split("-")[0] || "")
                )[0]?.photo
                  ? algorithms.filter((a) =>
                      a.name
                        .toLowerCase()
                        .startsWith(algorithm?.split("-")[0] || "")
                    )[0]?.photo
                  : "https://placehold.co/600x400"
              }
              className="main-img"
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
    </DndProvider>
  );
}

init(<AlgoInfo />);
