import { Request } from 'express';
import Product from '../../../models/product';
import { transpileFilters } from '../utils/filters';

const Sort = {
  PRICE_UP: { price: 1 },
  PRICE_DOWN: { price: -1 },
} as const;

type TGetProducts = (
  args: {
    pagination: { first: number; skip: number };
    filters: Array<{ name: string; value: string }>;
    sort: keyof typeof Sort;
  },
  req: Request
) => void;

export const getProducts: TGetProducts = async ({ pagination, filters, sort }, req) => {

  const aggregate = await Product.aggregate([
    { $match: transpileFilters(filters) },
    { $sort: Sort[sort] },
    {
      $group: {
        _id: 'null',
        items: {
          $push: '$$ROOT',
        },
        totalQty: {
          $sum: 1,
        },
      },
    },
    {
      $addFields: {
        items: {
          $slice: ['$items', pagination.skip, pagination.first],
        },
      },
    },
  ]);

  const items = !aggregate[0]
    ? null
    : (aggregate[0] as { items: { img: string }[]; totalQty: number }).items.map((el) => ({
        ...el,
        img: `http://${req.get('host')}/${el.img}`,
      }));
  return aggregate[0] ? { items, totalQty: aggregate[0].totalQty } : null;
};
