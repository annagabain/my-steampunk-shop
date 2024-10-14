import { Link } from "react-router-dom";
import "../App.css"; // Assuming styles are in App.css or relevant file

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {/* <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link> */}
    </nav>
  );
};

export default NavBar;
