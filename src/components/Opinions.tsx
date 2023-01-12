import * as React from "react";
import { useEffect, useState } from "react";
import { IOpinion } from "../Types";
import Rate from "./Rate";

function Opinions() {
  const [opinions, setOpinions] = useState<IOpinion[]>([
    {
      id: "opinion-1",
      author: "p@p.com",
      rating: 4,
      text: "test test",
    },
  ]);
  useEffect(() => {}, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Author</td>
            <td>Text</td>
            <td>Rating</td>
          </tr>
        </thead>
        <tbody>
          {opinions.map((o) => {
            return (
              <tr key={o.id}>
                <td>{o.author}</td>
                <td>{o.text}</td>
                <td><Rate fun={(_)=>{}}  maxScore={5} actualScore={o.rating} notEditable={true}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Opinions;
