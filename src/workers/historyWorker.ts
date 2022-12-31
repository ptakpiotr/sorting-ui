import axios from "axios";
import { HistoryWorkerActions, IHistoryWorkerArgs } from "../Types";

/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent<IHistoryWorkerArgs>) => {
  if (e.data.type === HistoryWorkerActions.GETHISTORY) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/numbers`, {
        headers: {
          Authorization: `Bearer ${e.data.token}`,
        },
      })
      .then((dt) => {
        self.postMessage(dt.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export {};
