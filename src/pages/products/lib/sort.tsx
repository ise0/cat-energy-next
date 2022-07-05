export type TSort = { label: string; value: string };

type TSortList = TSort[];

export const sortList: TSortList = [
  { label: 'Сначала недорогие', value: 'PRICE_UP' },
  { label: 'Сначала дорогие', value: 'PRICE_DOWN' },
];