import { createContext, useState } from 'react';

// cart context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

//cart context provider
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
