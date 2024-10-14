import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../App.css';
import './Cart.css';
import NavBar from './NavBar';


const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (totalItems === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div>
            <div className="cart">
                <h2>Place Order</h2>
                <ul>
                    {cart.map(({ product, quantity }) => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Quantity: {quantity}</p>
                            <p>Price: {product.price} sek</p>
                            <button onClick={() => removeFromCart(product.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p>Total Price: {totalPrice} sek</p>
                <button onClick={clearCart}>Clear Cart</button>
                <button className='button-white'>Update Address</button>

                <Link to="/checkout"><button>Pay now</button></Link>
            </div>

            <NavBar/>
        </div>
    );
};

export default Cart;
