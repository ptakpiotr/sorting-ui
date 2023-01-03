import { MathJaxContext } from "better-react-mathjax";
import * as React from "react";
import Intro from "../components/Intro";
import { init } from "../createPage";

function Index() {
  return (
    <main>
      <MathJaxContext>
        <Intro />
      </MathJaxContext>
    </main>
  );
}

init(<Index />);
