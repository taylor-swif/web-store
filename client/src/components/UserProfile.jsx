import { useContext } from "react";
import "./styles/UserProfile.css";
import AuthContext from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <p>Username: {user.username}</p>;
};

export default UserProfile;
