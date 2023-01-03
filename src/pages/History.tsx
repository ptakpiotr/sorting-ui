import * as React from "react";
import AuthComponent from "../components/Universal/AuthComponent";
import History from "../components/History";
import { init } from "../createPage";

function AuthorizedHistory() {
  return (
    <AuthComponent verifyAdmin={false}>
      <History />
    </AuthComponent>
  );
}

init(<AuthorizedHistory />);
