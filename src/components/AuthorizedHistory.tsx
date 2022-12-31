import React from "react";
import AuthComponent from "./Universal/AuthComponent";
import History from "./History";

function AuthorizedHistory() {
  return (
    <AuthComponent verifyAdmin={false}>
      <History />
    </AuthComponent>
  );
}

export default AuthorizedHistory;
