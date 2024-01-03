import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext(null);

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      // Temporary solution to match previously used format of wines
      setProducts(
        data.map((wine) => {
          return {
            name: wine.name,
            type: wine.taste.taste + "/" + wine.color.color,
            country: wine.country.name,
            description: wine.description,
            id: wine.id,
            imageUrl: wine.image_url,
            price: wine.price,
            rating: wine.rating,
            inStock: wine.units_in_stock > 0,
            amount: wine.units_in_stock,
            year: wine.year,
            alcohol: wine.alcohol,
            volume: wine.volume,
          };
        })
      );
      setLoading(false);
    } else {
      console.log("Error");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}
