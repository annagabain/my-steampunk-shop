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

  // const sizes = ["Adjustable", "Medium", "One Size", "Large", "Standard"]; 
  // const [selectedSize, setSelectedSize] = useState(sizes[0]); 

  const [selectedSize, setSelectedSize] = useState<string>("");

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
    addToCart({ ...product, size: selectedSize }); 
    navigate("/cart");  
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value); 
  };

  return (
    <div>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <h1 className="big-price">{product.price} <span className="big-price-name">sek</span></h1>

        {/* Size Selection Dropdown */}
        <div>
          <label htmlFor="size-select">Select Size: </label>
          <select id="size-select" value={selectedSize} onChange={handleSizeChange}>

            {/* {sizes.map((size, index) => ( */}
            {product.availableSizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>


        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <NavBar />
    </div>
  );
};

export default ProductDetails;
