import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import { Category } from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // when using async, make a new async function in useEffect
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      // dispatch, dispatches it
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);
  return (
    <Routes>
      <Route path=":category" element={<Category />} />
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
