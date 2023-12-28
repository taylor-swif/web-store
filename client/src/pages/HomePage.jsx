import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  // const { authTokens, logoutUser } = useContext(AuthContext);

  // Jak fetchować z tokenem:
  // let [profile, setProfile] = useState([])

  // useEffect(() => {
  //     getProfile()
  // },[])

  // const getProfile = async() => {
  //     let response = await fetch('http://127.0.0.1:8000/api/profile', {
  //     method: 'GET',
  //     headers:{
  //         'Content-Type': 'application/json',
  //         'Authorization':'Bearer ' + String(authTokens.access)
  //     }
  //     })
  //     let data = await response.json()
  //     console.log(data)
  //     if(response.status === 200){
  //         setProfile(data)
  //     } else if(response.statusText === 'Unauthorized'){
  //         logoutUser()
  //     }
  // }

  return (
    <div>
      <p>You are on the homepage, available to all users!</p>
    </div>
  );
};

export default HomePage;
