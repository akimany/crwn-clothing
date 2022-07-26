import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import { Category } from '../category/category.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);
  return (
    <Routes>
      <Route path=":category" element={<Category />} />
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
