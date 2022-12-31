import React from "react";
import shallow from "zustand/shallow";
import { useSettingsStore } from "../App";
import { ISettingsState } from "../Types";

interface IProps {
  desc: string;
}

function AlgoDesc({ desc }: IProps) {
  const settings = useSettingsStore(
    (st: ISettingsState) => ({
      allowAddingItems: st.settings.allowAddingItems,
      displayAlgorithmsDescription: st.settings.displayAlgorithmsDescription,
    }),
    shallow
  );
  return <p>{settings.displayAlgorithmsDescription ? <>{desc}</> : <></>}</p>;
}

export default AlgoDesc;
