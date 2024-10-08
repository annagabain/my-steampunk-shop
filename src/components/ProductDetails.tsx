import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import "../App.css"; 


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    fetch("/my-steampunk-shop/data/products.json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        const foundProduct = data.find((p) => p.id === parseInt(id || ""));
        setProduct(foundProduct);
      })
      .catch((error) => console.error("Error fetching product data: ", error));
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price} sek</p>
    </div>
  );
};

export default ProductDetails;
