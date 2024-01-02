import { useContext, useState } from "react";
import "./styles/LoginForm.css";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./styles/LoginForm.css";

const LoginForm = () => {
  const { loginUser, registerUser } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={`login-form-container ${isRegistering ? "register" : ""}`}>
      <form
        onSubmit={isRegistering === false ? loginUser : registerUser}
        className="login-form"
      >
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="login-icon" />
          <input
            className="login-input"
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="login-icon" />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        {isRegistering && (
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} className="login-icon" />
            <input
              className="login-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
          </div>
        )}
        <input
          type="submit"
          className="login-button"
          value={isRegistering ? "Register" : "Login"}
        />
      </form>
      <button className="toggle-button" onClick={handleToggleForm}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default LoginForm;
