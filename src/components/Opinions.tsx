import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IOpinion } from "../Types";
import Rate from "./Rate";
import {io} from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL!,{
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

function Opinions() {
  const [opinions, setOpinions] = useState<IOpinion[]>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    socket.on("allOpinions",(data)=>{
      setOpinions(data);
    });

    if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify`, {
          token,
          verifyAdmin: true,
        })
        .then((dt) => {
          socket.emit("getOpinions");
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Text</td>
            <td>Rating</td>
          </tr>
        </thead>
        <tbody>
          {opinions?.map((o) => {
            return (
              <tr key={o._id}>
                <td>{o.text}</td>
                <td>
                  <Rate
                    fun={(_) => {}}
                    maxScore={5}
                    actualScore={o.rating}
                    notEditable={true}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Opinions;
