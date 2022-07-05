export type TFilter = {
  name: string;
  label: string;
  type: 'range' | 'pickMany';
};

export const filtersList: TFilter[] = [
  { name: 'price', label: 'Цена', type: 'range' },
  { name: 'brand', label: 'Производитель', type: 'pickMany' },
  { name: 'flavor', label: 'Вкус', type: 'pickMany' },
];

export type TFilterValues = {
  range: { type: 'range'; value: { start: number; end: number } };
  pickMany: { type: 'pickMany'; value: string[] };
};

export const parseFilterFromStr = (
  type: TFilter['type'],
  value?: string
): TFilterValues[keyof TFilterValues] => {
  switch (type) {
    case 'pickMany':
      if (!value) return { type: 'pickMany', value: [] };
      return { type: 'pickMany', value: value.split(',') };
    default: {
      if (!value) return { type: 'range', value: { start: 0, end: 0 } };
      const sepIndex = value.indexOf('-');
      return {
        type: 'range',
        value: { start: +value.slice(0, sepIndex), end: +value.slice(sepIndex + 1) },
      };
    }
  }
};

export const parseFilterToStr = (p: TFilterValues[keyof TFilterValues]): string => {
  switch (p.type) {
    case 'pickMany':
      if (p.value.length > 0) return p.value.join(',');
      break;
    default:
      if (p.value.start < p.value.end) return `${p.value.start}-${p.value.end}`;
      break;
  }
  return '';
};
