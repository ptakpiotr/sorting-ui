import * as React from "react";
import UserRegister from "../components/UserRegister";
import { init } from "../createPage";

function Register() {
  return (
    <main>
      <UserRegister />
    </main>
  );
}

init(<Register />);
