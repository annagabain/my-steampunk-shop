import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../App.css';
import './Cart.css';
import NavBar from '../components/NavBar';
import Checkout from '../components/Checkout';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateItem } = useCart(); 

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (totalItems === 0) {
        return (
            <>
                <div className="empty-cart">
                    <h1>Your cart is empty.</h1>
                    <img className='empty-cart' src="/my-steampunk-shop/images/steampunk-empty-cart.png" alt="Steampunk empty cart" />
                    <Link to="/"><button>Add products</button></Link>
                </div>
                <NavBar />
            </>
        );
    }

    const handleSizeChange = (productId: number, newSize: string) => {
        updateItem(productId, { size: newSize });
        console.log("Updated size for productId", productId, "to", newSize);
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        updateItem(productId, { quantity: newQuantity }); 
    };

    return (
        <div>
            <div className="cart">
                <h2>Place Order</h2>
                <ul>
                    {cart.map(({ product, quantity }) => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>
                                Size:
                                <select
                                    value={product.size}
                                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                                >
                                    {product.availableSizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                Quantity:
                                <select
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </p>
                            <p>Price: {product.price} sek</p>
                            <button className='button-red' onClick={() => removeFromCart(product.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>

                <h3>Total Price: {totalPrice} sek</h3>

                <section className='proceed-to-payment-area'>
                    <Link to="/"><button>Continue shopping</button></Link>
                    <button className='button-red' onClick={clearCart}>Clear Cart</button>
                </section>
                <p>or</p>
                <Checkout />
            </div>
            <NavBar />
        </div>
    );
};

export default Cart;
