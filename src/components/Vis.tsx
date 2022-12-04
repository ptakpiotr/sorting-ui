import React, { useRef, useState } from "react";
import p5 from "p5";
import { Actions } from "../Types";
import Enumerable from "linq";
import DropZone from "./DropZone";
import DropItem from "./DropItem";
import { useResultsStore } from "../App";
import DragArea from "./DragArea";

function Vis() {
  const sketchDivRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const numbers = useResultsStore((st: any) => st.numbers);
  let data: number[] = [...numbers];
  const oldData: number[] = [...data];

  const sketch = (p: any) => {
    let chosenIndex = 0;
    p.setup = () => {
      p.createCanvas(800, 500);
      p.frameRate(1);
    };

    function drawNumber(
      i: number,
      value: number,
      height: number,
      state: Actions
    ) {
      p.fill("red");
      p.rect(i * 40 + 5, height, 30, -value * 5);
      p.fill(255);
      p.noStroke();
      p.text(`${value}`, i * 40 + 5, height);
    }

    function bubbleSort(start: number) {
      let i = start;
      for (; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          let temp = data[i];
          if (data[j] < data[i]) {
            data[i] = data[j];
            data[j] = temp;
          }
        }
      }
    }

    function selectionSort(end: number) {
      let i = 0;
      for (; i < end - 1; i++) {
        let min = i;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j] < data[min]) {
            min = j;
          }
          [data[min], data[i]] = [data[i], data[min]];
        }
      }
    }

    function insertionSort(end: number) {
      let key, j;
      for (let i = 1; i < end; i++) {
        key = data[i];
        j = i - 1;
        while (j >= 0 && data[j] > key) {
          data[j + 1] = data[j];
          j = j - 1;
        }
        data[j + 1] = key;
      }
    }

    function countSort(num: number[]) {
      let max = Math.max(...num);
      let min = Math.min(...num);

      let range = max - min + 1;
      let count = Enumerable.repeat(0, range).toArray();
      let output = Enumerable.repeat(0, num.length).toArray();
      for (let i = 0; i < num.length; i++) {
        count[num[i] - min]++;
      }

      for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
      }

      for (let i = num.length - 1; i >= 0; i--) {
        output[count[num[i] - min] - 1] = num[i];
        count[num[i] - min]--;
      }

      for (let i = 0; i < num.length; i++) {
        num[i] = output[i];
      }
      data = num;
    }

    p.draw = () => {
      if (show) {
        p.background(0, 0, 0, 0);
        for (let i = 0; i < oldData.length; i++) {
          drawNumber(i, oldData[i], 100, Actions.COMPARE);
        }
        insertionSort(chosenIndex++);
        p.clear();
        for (let i = 0; i < data.length; i++) {
          drawNumber(i, data[i], p.height - 100, Actions.SORT);
        }
        if (chosenIndex > data.length) {
          console.log("END");
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
          <button>Add</button>
          <button
            onClick={() => {
              setShow((prev) => !prev);
            }}
          >
            Show
          </button>
          <DropZone />
          <DragArea />
        </div>
      </div>
    </div>
  );
}

export default Vis;
