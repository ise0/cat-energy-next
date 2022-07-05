import { queryResolvers } from './queries';
import { queryTypes, typeDefs } from './types';

const productQL = {
  queryTypes,
  typeDefs,
  queryResolvers,
};

export default productQL;
