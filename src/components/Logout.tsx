import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navi = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navi("/");
  }, []);

  return <></>;
}

export default Logout;
