import React from "react";
import { MathJax } from "better-react-mathjax";
import { useAlgorithmStore } from "../App";
import {
  SiNestjs,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiJsonwebtokens,
  SiMicrosoftazure,
} from "react-icons/si";
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
          <SiNestjs />
          <SiReact />
          <SiTypescript />
          <SiPostgresql />
          <SiJsonwebtokens />
          <SiMicrosoftazure />
        </div>
      </div>
    </main>
  );
}

export default About;
