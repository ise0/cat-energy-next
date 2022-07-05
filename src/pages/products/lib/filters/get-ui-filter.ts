import { TAvailableFilterValues } from 'pages/products/api/fetch-available-filter-values';
import { TFilterValues } from './get-filters-list';

type TUIFilters = {
  range: {
    type: 'range';
    value: {
      start: { value: number; min: number };
      end: { value: number; max: number };
    };
  };
  pickMany: { type: 'pickMany'; value: Array<{ name: string; active: boolean; qty: number }> };
};

export const generateUIFilter = <T extends keyof TFilterValues>(
  filter: TFilterValues[T],
  avaiableFilters: Exclude<TAvailableFilterValues[T], undefined>
): TUIFilters[T] | undefined => {
  let UIFilter;
  if (filter.type === 'pickMany' && avaiableFilters.type === 'pickMany') {
    UIFilter = avaiableFilters.value.map((el) => ({
      ...el,
      active: !!filter.value.find((el2) => el2 === el.name),
    }));
  } else if (filter.type === 'range' && avaiableFilters.type === 'range') {
    UIFilter = {
      start: { value: filter.value.start, min: avaiableFilters.value.min },
      end: { value: filter.value.end, max: avaiableFilters.value.max },
    };
  }
  return UIFilter ? ({ type: filter.type, value: UIFilter } as TUIFilters[T]) : undefined;
};
