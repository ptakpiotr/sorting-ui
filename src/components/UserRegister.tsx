import React, { useState } from "react";
import * as yup from "yup";

function UserRegister() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validObject, setValidObject] = useState<boolean>(false);

  const shape = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .test({
        name: "equalPasswords",
        message: "{$path} must be equal to password",
        test: (value, ctx) => {
          return value === ctx.parent.password;
        },
      }),
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    shape
      .isValid({
        email,
        password,
        confirmPassword,
      })
      .then((dt) => {
        console.log(dt);
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
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserRegister;
