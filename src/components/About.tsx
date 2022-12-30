import React, { useEffect, useState } from "react";
import { MathJax } from "better-react-mathjax";
import { useAlgorithmStore } from "../App";
import {
  SiReact,
  SiTypescript,
  SiJsonwebtokens,
  SiMicrosoftazure,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";
import { io } from "socket.io-client";

import LeaveOpinion from "./LeaveOpinion";
import Rate from "./Rate";
import AuthComponent from "./Universal/AuthComponent";
const socket = io(process.env.REACT_APP_BACKEND_URL!, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

function About() {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const algorithms = useAlgorithmStore((state) => state.algorithms);

  const handleClick = () => {
    socket.emit("newOpinion", {
      text,
      rating,
    });
    setText("");
  };

  useEffect(() => {
    socket.on("opinions", () => {
      console.log("Opinion succesfully added");
    });
    return () => {
      socket.off("opinions");
    };
  }, []);

  return (
    <main className="about-main">
      <p>This is the site made for Internet Techinques project</p>
      <div>
        <p>Sorting algorithms time complexity summary:</p>
        <table>
          <thead>
            <tr>
              <th scope="column">Algorithm name</th>
              <th scope="column">Time complexity (average)</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((a) => (
              <tr>
                <td>{a.algorithmName}</td>
                <td>
                  <MathJax style={{ display: "inline-block" }}>
                    {a.complexity}
                  </MathJax>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Technologies used in this project:</p>

        <div className="technologies">
          <SiNodedotjs />
          <SiReact />
          <SiTypescript />
          <SiMongodb />
          <SiJsonwebtokens />
          <SiMicrosoftazure />
        </div>
      </div>
      <AuthComponent verifyAdmin={false}>
        <div className="rate-section">
          <LeaveOpinion
            minLength={1}
            maxLength={60}
            text={text}
            setText={setText}
          />
          <Rate
            maxScore={5}
            fun={(a) => {
              setRating(a);
            }}
          />
          <button onClick={handleClick}>Submit opinion</button>
        </div>
      </AuthComponent>
    </main>
  );
}

export default About;
