import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { CategoryPreview } from '../../components/category-preview/category-preview.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {
        // outputs the property names, so 'hats'...
        Object.keys(categoriesMap).map((title) => {
          // selecting each array using it's name (title)
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      }
    </Fragment>
  );
};

export default CategoriesPreview;
