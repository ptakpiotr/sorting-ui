import React, { useState } from "react";
import * as yup from "yup";

function UserBox() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validObject, setValidObject] = useState<boolean>(false);

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
        setValidObject(dt);
      })
      .catch((err) => {
        setValidObject(false);
      });
  };
  return (
    <div className="user-box">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserBox;
