import { getFilter } from './resolvers/getFilter';
import { getProduct } from './resolvers/getProduct';
import { getProducts } from './resolvers/getProducts';

export const queryResolvers = {
  product: getProduct,
  products: getProducts,
  productAvailableFilterValues: getFilter,
};
