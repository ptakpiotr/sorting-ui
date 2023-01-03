import * as React from "react";
import Settings from "../components/Settings";
import AuthComponent from "../components/Universal/AuthComponent";
import { init } from "../createPage";

function AuthorizedSettings() {
  return (
    <AuthComponent verifyAdmin={false}>
      <Settings />
    </AuthComponent>
  );
}

init(<AuthorizedSettings />);
