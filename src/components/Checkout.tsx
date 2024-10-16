import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Checkout.css';


const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    console.log('Order placed:', { name, address, cart });
    clearCart();
    navigate('/');  // Redirect after checkout
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
        <label>
          Name: 
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address: 
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
