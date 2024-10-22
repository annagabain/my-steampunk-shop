import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./components/Checkout";
import NotFound from "./pages/NotFound";


const App  = () => {
  return (
    <CartProvider>
    <Router basename="/my-steampunk-shop/"> 
    {/* <Router>  */}

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
