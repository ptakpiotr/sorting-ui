import * as React from "react";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";

function UserBox() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const shape = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    shape
      .isValid({
        email,
        password,
      })
      .then((dt) => {
        if (dt) {
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
              email,
              password,
            })
            .then((dt) => {
              localStorage.removeItem("token");
              localStorage.setItem("token", dt.data.token);
              localStorage.setItem("profile", JSON.stringify(dt.data.profile));
              setMessage("");
              
              window.location.reload();
            })
            .catch((err) => {
              setMessage("Account doesn't exist or credentials invalid");
            });
        }

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setMessage(err);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="user-box">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
        <span className="err-message">{message}</span>
      </form>
    </div>
  );
}

export default UserBox;
