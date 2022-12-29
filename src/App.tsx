import { MathJaxContext } from "better-react-mathjax";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import zustand from "zustand";
import { persist } from "zustand/middleware";
import Enumerable from "linq";
import About from "./components/About";
import AlgoInfo from "./components/AlgoInfo";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SideMenu from "./components/SideMenu";
import { IAlgorithmsInfo, ISettings } from "./Types";
import Settings from "./components/Settings";
import AuthRoute from "./components/Universal/AuthRoute";
import Logout from "./components/Logout";

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

// store w ktorym bede przetrzymywal wyniki z sortowan (a raczej liczby wprowadzone przez usera + mozliwosc randomowego generowania wartosci)
// potem nastapi dump do localStorage
// bedzie rowniez info odnosnie

export const useResultsStore = zustand(
  persist(
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

export const useSettingsStore = zustand((set, get) => ({
  settings: {
    allowAddingItems: true,
    displayAlgorithmsDescription: true,
  },
  setSettingsOption: (settings: ISettings) =>
    set({ settings: { ...settings } }),
}));

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MathJaxContext>
        <BrowserRouter>
          <SideMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/settings"
              element={
                <AuthRoute>
                  <Settings />
                </AuthRoute>
              }
            />
            <Route path="/algoinfo/:id" element={<AlgoInfo />} />
          </Routes>
        </BrowserRouter>
      </MathJaxContext>
    </DndProvider>
  );
}

export default App;
