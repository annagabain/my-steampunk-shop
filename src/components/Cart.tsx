import { useCart } from '../context/CartContext';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import './Cart.css';
import NavBar from './NavBar';
import Checkout from './Checkout';


const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (totalItems === 0) {
        return (
            <>
                <div className="cart">
                    <h1>Your cart is empty.</h1>;
                    <Link to="/"><button>Add producs</button></Link>
                </div>

                <NavBar />
            </>
        );
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
                            <p>Size: {product.size} </p>
                            <p>Quantity: {quantity}</p>

                            <p>Price: {product.price} sek</p>
                            <button className='button-white' ><i className="fa-solid fa-pen-to-square"></i></button>
                            <button className='button-red' onClick={() => removeFromCart(product.id)}><i className="fa-solid fa-trash"></i></button>
                        </li>
                    ))}
                </ul>

                <p>Total Price: {totalPrice} sek</p>

                <section className='proceed-to-payment-area'>
                    <button className='button-red' onClick={clearCart}>Clear Cart</button>

                    {/* <button className='button-white'>Update Address</button> */}

                    {/* <Link to="/checkout"><button>Pay now</button></Link> */}

                    {/* <Link to="/checkout"><button>Check out</button></Link> */}

                </section>
                <p>or</p>
                <Checkout />
            </div>

            <NavBar />
        </div>
    );
};

export default Cart;
