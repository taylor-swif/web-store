import React, { useState, useContext } from "react";
import "./ManagerPage.css";
import AuthContext from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

const ManagerPage = () => {
  const { authTokens } = useContext(AuthContext);
  const { getProducts } = useContext(ProductContext);
  const [wineForm, setWineForm] = useState({
    name: "Wino pomidorowe",
    description:
      "Doskonałe wino do dań z pomidorów, makaronów, pizzy, a także do dań z ryb i owoców morza.",
    image_url:
      "https://www.wine-express.pl/image/cache/catalog/Hiszpania/Luis%20Canas/joven-red-2016-rioja-luis-canas-hiszpania-96-767x1100.jpg",
    price: 69420.0,
    units_in_stock: 421,
    color_id: 1,
    country_id: "ES",
    year: 1410,
    taste_id: 1,
    volume: 750,
    alcohol: 13.0,
  });
  const [wineList, setWineList] = useState([]);

  const handleInputChange = (e) => {
    setWineForm({ ...wineForm, [e.target.name]: e.target.value });
  };

  const addWine = (e) => {
    e.preventDefault();
    setWineList([...wineList, wineForm]);
    postWine(wineForm);
    // setWineForm({
    //   name: "",
    //   description: "",
    //   image_url: "",
    //   price: "",
    //   units_in_stock: "",
    //   color_id: "",
    //   country_id: "",
    //   year: "",
    //   taste_id: "",
    //   volume: "",
    //   alcohol: "",
    // });
  };

  const postWine = async (e) => {
    try {
      const response = await fetch("http://localhost:8000/api/wines/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(wineForm),
      });
      if (response.ok) {
        const data = await response.json();
        getProducts();
      } else {
        console.error("Failed to post wine:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while posting wine:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel - Add Wine</h2>
      <form className="wineForm" onSubmit={addWine}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={wineForm.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={wineForm.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={wineForm.image_url}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={wineForm.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />

        <label htmlFor="units_in_stock">Units in Stock</label>
        <input
          type="number"
          name="units_in_stock"
          value={wineForm.units_in_stock}
          onChange={handleInputChange}
          placeholder="Units in Stock"
          required
        />

        <label htmlFor="color">Color</label>
        <input
          type="number"
          name="color"
          value={wineForm.color_id}
          onChange={handleInputChange}
          placeholder="Color"
          required
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={wineForm.country_id}
          onChange={handleInputChange}
          placeholder="Country"
          required
        />

        <label htmlFor="year">Year</label>
        <input
          type="number"
          name="year"
          value={wineForm.year}
          onChange={handleInputChange}
          placeholder="Year"
          required
        />

        <label htmlFor="taste">Taste</label>
        <input
          type="number"
          name="taste"
          value={wineForm.taste_id}
          onChange={handleInputChange}
          placeholder="Taste"
          required
        />

        <label htmlFor="volume">Volume</label>
        <input
          type="number"
          name="volume"
          value={wineForm.volume}
          onChange={handleInputChange}
          placeholder="Volume"
          required
        />

        <label htmlFor="alcohol">Alcohol Content</label>
        <input
          type="number"
          name="alcohol"
          value={wineForm.alcohol}
          onChange={handleInputChange}
          placeholder="Alcohol Content"
          required
        />

        <button type="submit">Add Wine</button>
      </form>

      {wineList.length > 0 && (
        <div>
          <h3>Added Wines:</h3>
          <ul>
            {wineList.map((wine, index) => (
              <li key={index}>
                <img
                  src={wine.image_url}
                  alt={wine.name}
                  style={{ width: "100px", height: "auto" }}
                />
                <p>Name: {wine.name}</p>
                <p>Description: {wine.description}</p>
                <p>Price: ${wine.price}</p>
                <p>Units in Stock: {wine.units_in_stock}</p>
                <p>Color: {wine.color_id}</p>
                <p>Country: {wine.country_id}</p>
                <p>Year: {wine.year}</p>
                <p>Taste: {wine.taste_id}</p>
                <p>Volume: {wine.volume}ml</p>
                <p>Alcohol Content: {wine.alcohol}%</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManagerPage;
