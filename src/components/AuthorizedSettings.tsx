import React from "react";
import Settings from "./Settings";
import AuthComponent from "./Universal/AuthComponent";

function AuthorizedSettings() {
  return (
    <AuthComponent verifyAdmin={true}>
      <Settings />
    </AuthComponent>
  );
}

export default AuthorizedSettings;
