import { Link } from "react-router-dom";
import "../App.css"; 

const NavBar = () => {
  return (
    <nav>
      <Link to="/"><i className="fa-solid fa-house"></i> Home</Link>
      <Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
      {/* <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link> */}
    </nav>
  );
};

export default NavBar;
