import * as React from "react";
import { useEffect, useState } from "react";

import Enumerable from "linq";
import { AiTwotoneStar } from "react-icons/ai";

interface IProps {
  maxScore: number;
  fun: (score: number) => any;
  notEditable?: boolean;
  actualScore?:number;
}
function Rate({ maxScore, fun, notEditable,actualScore }: IProps) {
  const [score, setScore] = useState<number>(0);
  useEffect(()=>{
    if(notEditable && actualScore){
      setScore(actualScore);
    }
  },[]);
  useEffect(() => {
    fun(score);
  }, [score]);

  return (
    <div className="rate">
      {Enumerable.range(0, score)
        .toArray()
        .map((s) => {
          return (
            <AiTwotoneStar
              key={`star-${s}-yellow`}
              className="singleBean"
              onMouseEnter={() => {
                if (!notEditable) {
                  setScore(s + 1);
                }
              }}
            />
          );
        })}
      {Enumerable.range(0, maxScore - score)
        .toArray()
        .map((s) => {
          return (
            <AiTwotoneStar
              key={`star-${s}-dark`}
              className="singleBeanInactive"
              onMouseEnter={() => {
                if (!notEditable) {
                  setScore((prev) => prev + s + 1);
                }
              }}
            />
          );
        })}
    </div>
  );
}

export default Rate;
