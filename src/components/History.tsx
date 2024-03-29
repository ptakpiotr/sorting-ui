import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { HistoryWorkerActions, IHistoryItems } from "../Types";
import Loader from "./Universal/Loader";
import NumbersDisplay from "./Universal/NumbersDisplay";

function History() {
  const worker = useMemo(
    () => new Worker(new URL("../workers/historyWorker.ts", import.meta.url)),
    []
  );

  const [data, setData] = useState<IHistoryItems>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window.Worker) {
      worker.postMessage({
        type: HistoryWorkerActions.GETHISTORY,
        token: localStorage.getItem("token"),
      });

      worker.onmessage = (e) => {
        setData(e.data);
        setIsLoading(false);
      };
    }
  }, [worker]);

  return (
    <main>
      <h3
        style={{
          display: "inline-block",
        }}
      >
        History
      </h3>
      {isLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Numbers</th>
              <th>Algorithm</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.nums?.map((dt) => {
              return (
                <tr key={`sorting-${dt.date}`}>
                  <td><NumbersDisplay numbers={dt.numbers} /></td>
                  <td>{dt.algorithm}</td>
                  <td>{new Date(dt.date).toUTCString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default History;
