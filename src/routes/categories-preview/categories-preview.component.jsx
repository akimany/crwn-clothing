import { Fragment, useContext } from 'react';
import { CategoryPreview } from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

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
