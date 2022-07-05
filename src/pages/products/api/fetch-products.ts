import { sortList, MAX_PAGE_ELEMS, filtersList } from '../lib';
import api from 'shared/api';
import { ParsedUrlQuery } from 'querystring';

export type TProducts = {
  totalQty: number;
  items: Array<{
    _id: string;
    name: string;
    price: number;
    weight: number;
    flavor: string;
    img: string;
  }>;
};

const graphqlQuery = `
 query Products($pagination: ProductPaginationInput!, $filters: [ProductFilterInput!]!, $sort: ProductSortEnum!) {  
    products(pagination: $pagination, filters: $filters, sort: $sort) {
      items {
          _id
          name
          price
          weight
          flavor
          img
      }
      totalQty  
    }
  }
`;

export const fetchProducts = async (query: ParsedUrlQuery) => {
  const sort = sortList[Number(query.sort) || 0].value;
  const page = Number(query.page) || 1;
  const filters: { [k: string]: string } = {};
  filtersList.forEach((el) => {
    if (query[el.name]) filters[el.name] = query[el.name] as string;
  });
  return (
    await api.post<{ data: { products: TProducts } }>('graphql', {
      query: graphqlQuery,
      variables: {
        pagination: { first: MAX_PAGE_ELEMS, skip: MAX_PAGE_ELEMS * (page - 1) },
        filters: Object.entries(filters).map(([name, value]) => ({ name, value })),
        sort,
      },
    })
  ).data.data.products;
};
