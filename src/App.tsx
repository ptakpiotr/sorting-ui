import * as React from "react";
import zustand from "zustand";
import { persist } from "zustand/middleware";
import Enumerable from "linq";
import SideMenu from "./components/SideMenu";
import {
  IAlgorithmCardInfo,
  IAlgorithmInfoState,
  IAlgorithmsInfo,
  IResultsState,
  ISettings,
  ISettingsState,
} from "./Types";

export const useAlgorithmStore = zustand<IAlgorithmsInfo>(() => ({
  algorithms: [
    {
      algorithmName: "Selection sort",
      complexity: "\\(\\theta{(n^2)}\\)",
    },
    {
      algorithmName: "Bubble sort",
      complexity: "\\(\\theta{(n^2)}\\)",
    },
    {
      algorithmName: "Insertion sort",
      complexity: "\\(\\theta{(n^2)}\\)",
    },
    {
      algorithmName: "Counting sort",
      complexity: "\\(\\theta{(n + k)}\\)",
    },
    {
      algorithmName: "Quick sort",
      complexity: "\\(\\theta{(nlog(n))}\\)",
    },
  ],
}));

export const useResultsStore = zustand(
  persist<IResultsState>(
    (set, get) => ({
      numbers: Enumerable.range(0, 10)
        .toArray()
        .map(() => Math.floor(Math.random() * 20) - 25),
      setNumbers: (nums: number[]) => set({ numbers: nums }),
    }),
    {
      name: "numbers",
      getStorage: () => localStorage,
    }
  )
);

export const useSettingsStore = zustand(
  persist<ISettingsState>(
    (set, get) => ({
      settings: {
        ...JSON.parse(
          localStorage.getItem("profile") ||
            '{"allowAddingItems":true,"displayAlgorithmsDescription":true,"__v":0}'
        ),
      },
      setSettingsOption: (st: ISettings) => set({ settings: { ...st } }),
    }),
    {
      name: "profile",
      getStorage: () => localStorage,
    }
  )
);

export const useAlgorithmInfoStore = zustand(
  persist<IAlgorithmInfoState>(
    (set, get) => ({
      algorithms: [],
      setAlgos: (algos: IAlgorithmCardInfo[]) => set({ algorithms: algos }),
    }),
    {
      name: "algorithms",
      getStorage: () => localStorage,
    }
  )
);

function App() {
  return (
    <>
      <SideMenu />
    </>
  );
}

export default App;
