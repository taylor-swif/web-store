import { useContext } from "react";
import "./styles/UserProfile.css";
import AuthContext from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return <p>Username: {user.username}</p>;
};

export default UserProfile;
