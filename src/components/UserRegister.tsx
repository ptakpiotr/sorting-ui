import * as React from "react";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";

function UserRegister() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
        if (dt) {
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, {
              email,
              password,
              confirmPassword,
            })
            .then((dt) => {
              localStorage.removeItem("token");
              localStorage.setItem("token", dt.data.token);
              window.location.reload();
            })
            .catch((err) => {
              console.error(err);
            });
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
