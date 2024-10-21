import { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface UpdateItemFields {
  quantity?: number; 
  size?: string; 
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateItem: (productId: number, updatedFields: UpdateItemFields) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Check if a cart item exists with the same product ID and size
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && item.product.size === product.size
      );
  
      if (existingItem) {
        // If an item with the same ID and size exists, increase the quantity
        return prevCart.map((item) =>
          item.product.id === product.id && item.product.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
  
      // If no existing item with the same ID and size, add new item
      return [...prevCart, { product, quantity: 1 }];
    });
  };
  



const updateItem = (productId: number, updatedFields: { size?: string; quantity?: number }) => {
  setCart(prevCart =>
    prevCart.map(item => {
      if (item.product.id === productId) {
       
        const updatedProduct = { 
          ...item.product, 
          size: updatedFields.size ? updatedFields.size : item.product.size 
        };
        return { 
          ...item, 
          product: updatedProduct, 
          quantity: updatedFields.quantity !== undefined ? updatedFields.quantity : item.quantity 
        };
      }
      return item;
    })
  );
};


  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
