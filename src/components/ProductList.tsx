import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import "../App.css"; 


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/my-steampunk-shop/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching product data: ", error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: {product.price} sek</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
