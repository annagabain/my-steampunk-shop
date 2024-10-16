import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import NotFound from "./pages/404";


const App  = () => {
  return (
    <CartProvider>
    <Router basename="/my-steampunk-shop/"> 
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </Router>
</CartProvider>

  );
};

export default App;
