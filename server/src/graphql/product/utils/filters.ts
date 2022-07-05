export type TFilterTypes = {
  pickMany: string[];
  range: { min: number; max: number };
};

export const AvailableFilters = {
  brand: 'pickMany',
  flavor: 'pickMany',
  price: 'range',
} as const;

export const transpileFilters = (
  filters: Array<{ name: string; value: string }>
) => {
  const preparedFilters: Record<string, unknown> = {};
  filters.forEach(({ name, value }) => {
    switch (AvailableFilters[name as keyof typeof AvailableFilters]) {
      case 'pickMany':
        preparedFilters[name] = { $in: value.split(',') };
        break;
      case 'range': {
        const sepIndex = value.indexOf('-');
        preparedFilters[name] = { $gte: +value.slice(0, sepIndex), $lte: +value.slice(sepIndex + 1) };
        break;
      }
      default:
    }
  });
  return preparedFilters;
};
