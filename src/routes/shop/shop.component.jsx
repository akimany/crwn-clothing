import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import { Category } from '../category/category.component';

const Shop = () => {
  return (
    <Routes>
      <Route path=":category" element={<Category />} />
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
