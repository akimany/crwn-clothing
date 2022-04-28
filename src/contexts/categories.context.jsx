import { createContext, useEffect, useState } from 'react';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';

// CategoriesContext
export const CategoriesContext = createContext({
  categoriesMap: {},
});

//productsProvider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    // when using async, make a new async function in useEffect
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  // ONE OFF: NOT NORMALLY ON THE FRONTEND - STORING VALUES IN DB:
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // });

  const value = { categoriesMap };

  // Provider
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
