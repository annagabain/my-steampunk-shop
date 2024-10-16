import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import ProductListHeader from "./ProductListHeader";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Add the 'product-list-body' class to the body element
    document.body.classList.add("product-list-body");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("product-list-body");
    };
  }, []);

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
    <div className="product-list-container">
      <ProductListHeader />
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-name-price-container">
                <h2>{product.name}</h2>
                <p>Price: {product.price} sek</p>
              </div>

            </Link>
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default ProductList;
