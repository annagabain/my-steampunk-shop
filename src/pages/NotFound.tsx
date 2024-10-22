import NavBar from "../components/NavBar";
import "../App.css";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Nothing to see here</h1>
        <img src="/my-steampunk-shop/images/404-image.webp" alt="Steampunk Not Found image" />
      </div>
      <NavBar />
    </div>
  );
};

export default NotFound;
