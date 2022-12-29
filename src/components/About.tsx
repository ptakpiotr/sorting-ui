import React from "react";
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
import LeaveOpinion from "./LeaveOpinion";
import Rate from "./Rate";
function About() {
  const algorithms = useAlgorithmStore((state) => state.algorithms);
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
      <div className="rate-section">
        <LeaveOpinion minLength={10} maxLength={60} />
        <Rate
          maxScore={5}
          fun={(a) => {
            console.log(a);
          }}
        />
        <button>Submit opinion</button>
      </div>
    </main>
  );
}

export default About;
