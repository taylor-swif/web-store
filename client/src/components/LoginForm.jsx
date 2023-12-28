import React from "react";
import "./LoginForm.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginForm = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="login-form-container">
      <form onSubmit={loginUser} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <input type="submit" className="login-button" />
      </form>
    </div>
  );
};

export default LoginForm;
