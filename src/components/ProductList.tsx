import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/src/data/products.json")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching product data: ", error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
