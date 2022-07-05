import { GetServerSidePropsContext } from 'next';
import { graphqlExec } from 'lib/graphql';
import { filtersList, MAX_PAGE_ELEMS, sortList } from './lib';
import { dehydrate, QueryClient } from 'react-query';

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

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  const nonFilters = ['page', 'sort'];
  const queryClient = new QueryClient();

  const sort = sortList[Number(query.sort) || 0].value;
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const filters: { [k: string]: string } = {};
  filtersList.forEach((el) => {
    if (query[el.name]) filters[el.name] = query[el.name] as string;
  });

  const variableValues = {
    pagination: { first: MAX_PAGE_ELEMS, skip: page ? MAX_PAGE_ELEMS * (page - 1) : 0 },
    filters: Object.entries(query)
      .filter((el) => !(el[0] in nonFilters))
      .map(([name, value]) => ({ name, value })),
    sort,
  };

  await queryClient.prefetchQuery(
    ['products-catalog', query],
    async () =>
      (
        (await graphqlExec({
          source: graphqlQuery,
          variableValues,
          req,
        })) as any
      ).data.products
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
