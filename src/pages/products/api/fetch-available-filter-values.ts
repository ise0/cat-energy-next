import axios from 'axios';

export type TAvailableFilterValues = {
  pickMany?: { type: 'pickMany'; value: Array<{ name: string; qty: number }> };
  range?: { type: 'range'; value: { min: number; max: number } };
};

const query = `
  query ProductAvailableFilterValues($filterName: String!, $filters: [ProductFilterInput!]!) {
    productAvailableFilterValues(filterName: $filterName, filters: $filters) {
      range {
        type
        value {min max}
      } 
      pickMany {
        type
        value {name qty}
      }  
    }
  }
`;

export const fetchAvailableFilterValues = async (
  filterName: string,
  filters: { [k: string]: string }
) => {
  const filtersWithoutTargetFilter = { ...filters };
  delete filtersWithoutTargetFilter[filterName];
  const response = await axios.post<{
    data: { productAvailableFilterValues: TAvailableFilterValues };
  }>('graphql', {
    query,
    variables: {
      filterName,
      filters: Object.entries(filtersWithoutTargetFilter).map(([name, value]) => ({ name, value })),
    },
  });

  return Object.values(response.data.data.productAvailableFilterValues).find((el) => el);
};
