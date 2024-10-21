import { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface UpdateItemFields {
  quantity?: number; // Optional
  size?: string; // Optional
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateItem: (productId: number, updatedFields: UpdateItemFields) => void; // Ensure this is declared
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateItem = (productId: number, updatedFields: { size?: string; quantity?: number }) => {
    setCart(prevCart => {
        const newCart = prevCart.map(item =>
            item.product.id === productId
                ? { ...item, ...updatedFields }
                : item
        );
        console.log(newCart); // Check the new cart state here
        return newCart;
    });
};



  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  // Ensure updateItem is included in the value provided to the context
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
