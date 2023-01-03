import * as React from "react";
import UserBox from "../components/UserBox";
import { init } from "../createPage";

function Login() {
  return (
    <main>
      <UserBox />
    </main>
  );
}

init(<Login />);
