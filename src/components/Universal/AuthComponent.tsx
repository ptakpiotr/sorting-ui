import * as React from "react";
import axios from "axios";
import { PropsWithChildren, useEffect, useState } from "react";
interface IProps {
  verifyAdmin: boolean;
}
function AuthComponent({ children, verifyAdmin }: PropsWithChildren<IProps>) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify`, {
          token,
          verifyAdmin,
        })
        .then((dt) => {
          setAuthorized(dt.status === 200);
        })
        .catch((err) => {
          setAuthorized(false);
        });
    }
  }, []);
  return (
    <>
      {authorized ? (
        children
      ) : (
        <div className="not-authorized-msg">
          You are not authorized to access this resource. Please log in or
          register.
          <br />
          <a href="/login.html">Login</a> <a href="/register.html">Register</a>
        </div>
      )}
    </>
  );
}

export default AuthComponent;
