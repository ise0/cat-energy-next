import { filtersList, parseFilterFromStr, TFilter } from '../lib';

export const getFiltersQueryObj = (filters: { [k: string]: string }) => {
  const foundedFilters: Record<string, TFilter> = {};
  filtersList.forEach((el) => {
    if (filters[el.name]) foundedFilters[el.name] = el;
  });

  const parsedFilters = Object.entries(filters).map((el) => ({
    name: el[0],
    ...parseFilterFromStr(foundedFilters[el[0]].type, el[1]),
  }));

  const nonNullFilters = parsedFilters.filter((el) => {
    if (!el) return false;
    if (el.type === 'range' && el.value.end > 0) return true;
    if (el.type === 'pickMany' && el.value.length > 0) return true;
    return false;
  });

  return nonNullFilters;
};
