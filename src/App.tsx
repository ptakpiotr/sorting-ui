import { MathJaxContext } from "better-react-mathjax";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import zustand from "zustand";
import About from "./components/About";
import AlgoInfo from "./components/AlgoInfo";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SideMenu from "./components/SideMenu";
import { IAlgorithmsInfo } from "./Types";

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

export const useResultsStore = zustand((set, get) => {});

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
            <Route path="/register" element={<Register />} />
            <Route path="/algoinfo/:id" element={<AlgoInfo />} />
          </Routes>
        </BrowserRouter>
      </MathJaxContext>
    </DndProvider>
  );
}

export default App;
