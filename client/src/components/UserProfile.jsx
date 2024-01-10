import { useContext } from "react";
import "./styles/UserProfile.css";
import AuthContext from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <p>Username: {user.username}</p>
      <p>Email: </p>
      <h1>Orders History</h1>
    </>
  );
};

export default UserProfile;
