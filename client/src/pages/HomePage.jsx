import React, { useState, useEffect, useContext } from "react";
import Slider from "../components/Slider";
import CategoryMenu from "../components/CategoryMenu";
import ProductCard from "../components/ProductCard";
import dummyData from "../assets/dummyData";
import "./HomePage.css";

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

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="app-layout">
      <div style={{ display: "flex" }}>
        <CategoryMenu />
        <Slider />
      </div>
      <div className="bestsellers">
        <h1>Bestsellers</h1>
        <div className="product-list">
          {dummyData.slice(0, 4).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="new-arrivals"></div>
      <h1>New arrivals</h1>
      <div className="product-list">
        {dummyData.slice(7, 11).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <div className="about-us">
        <h1>About us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam voluptatibus, voluptas, quod quae dolorum
          voluptates nulla quia voluptatem repellendus. Quisquam voluptatum,
          quibusdam voluptatibus, voluptas, quod quae dolorum voluptates nulla
          quia voluptatem repellendus. Quisquam voluptatum, quibusdam
          voluptatibus, voluptas, quod quae dolorum voluptates nulla quia
          voluptatem repellendus.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
