import { createContext, useEffect, useState } from 'react';
import PRODUCTS from '../shop-data.json';

// productsContext
export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
});

//productsProvider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  // setup state
  // useEffect
  useEffect(() => {}, []);
  // Provider
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
