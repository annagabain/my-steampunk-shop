import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import NavBar from "./NavBar";
import "../App.css"; 
import "./ProductDetails.css";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Add the 'product-details-body' class to the body element
    document.body.classList.add("product-details-body");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("product-details-body");
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
      .then((data: Product[]) => {
        const foundProduct = data.find((p) => p.id === parseInt(id || ""));
        setProduct(foundProduct);
      })
      .catch((error) => console.error("Error fetching product data: ", error));
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    navigate("/cart");  // Navigate to the cart page
  };

  return (
    <div>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <p>Price: {product.price} sek</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <NavBar />
    </div>
  );
};

export default ProductDetails;
