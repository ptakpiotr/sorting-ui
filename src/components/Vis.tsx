import React, { useRef, useState } from "react";
import p5 from "p5";
import { Actions, IResultsState, ISettingsState } from "../Types";
import DropZone from "./DropZone";
import { useResultsStore, useSettingsStore } from "../App";
import DragArea from "./DragArea";
import shallow from "zustand/shallow";
import AuthComponent from "./Universal/AuthComponent";
import axios from "axios";
import algorithms from "../algorithms";
import { useParams } from "react-router";

function Vis() {
  const sketchDivRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const { algorithm } = useParams();

  const numbers = useResultsStore((st: IResultsState) => st.numbers);
  const settings = useSettingsStore(
    (st: ISettingsState) => ({
      allowAddingItems: st.settings.allowAddingItems,
      displayAlgorithmsDescription: st.settings.displayAlgorithmsDescription,
    }),
    shallow
  );

  let data: number[] = [...numbers];
  const oldData: number[] = [...data];

  const addNumbers = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/numbers`,
        {
          numbers: oldData,
          algorithm: algorithm?.split("-").join(" "),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        alert("Succesfully added numbers");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sketch = (p: any) => {
    let chosenIndex = 0;
    p.setup = () => {
      p.createCanvas(600, 200);
      p.frameRate(1);
    };

    function drawNumber(
      i: number,
      value: number,
      height: number,
      state: Actions
    ) {
      p.fill("red");
      p.rect(i * 40 + 5, height, 30, -value * 2);
      p.fill(255);
      p.noStroke();
      p.text(`${value}`, i * 40 + 5, height);
    }

    p.draw = () => {
      if (show) {
        p.background(0, 0, 0, 0);
        for (let i = 0; i < oldData.length; i++) {
          drawNumber(i, oldData[i], 100, Actions.COMPARE);
        }

        algorithms.get(algorithm)(chosenIndex++, data);

        p.clear();

        for (let i = 0; i < data.length; i++) {
          drawNumber(i, data[i], p.height - 100, Actions.SORT);
        }
        if (chosenIndex > data.length) {
          p.noLoop();
        }
      }
    };
  };
  const p5Sketch = new p5(sketch, sketchDivRef.current!);
  return (
    <div>
      <div>
        <div ref={sketchDivRef} className="sketch-div"></div>
        <div>
          {!show ? (
            <span>
              <button
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              >
                Show
              </button>
              <AuthComponent verifyAdmin={false}>
                <button onClick={addNumbers}>Add</button>
              </AuthComponent>
            </span>
          ) : (
            <></>
          )}
          {settings.allowAddingItems && !show ? (
            <>
              <div>
                Aby dodać liczbę do sortowania upuść w obszarze poniżej:
              </div>
              <DropZone />
              <DragArea />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vis;
