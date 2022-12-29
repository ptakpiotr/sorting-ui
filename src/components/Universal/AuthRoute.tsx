import React, { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AuthRoute({ children }: PropsWithChildren) {
  //move these 2 to global state
  const [token, setToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    //validate token
    if (storageToken) {
      setToken(storageToken);
      setIsAuth(true);
    } else {
      setToken("");
      setIsAuth(false);
      navigate("/");
    }
  }, []);
  return <>{isAuth ? <>{children}</> : <></>}</>;
}

export default AuthRoute;
