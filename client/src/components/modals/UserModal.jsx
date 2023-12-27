import React, { useContext } from "react";
import "./UserModal.css";
import AuthContext from "../../context/AuthContext";

const UserModal = ({ onClose }) => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="user-modal">
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>

        <button onClick={onClose} className="close-modal">
          Close
        </button>
      </form>
    </div>
  );
};

export default UserModal;
