import Product from '../../../models/product';
import AppError from '../../../utils/appError';
import { AvailableFilters, transpileFilters } from '../utils/filters';

type TGetFilter = (args: {
  filterName: keyof typeof AvailableFilters;
  filters: Array<{ name: string; value: string }>;
}) => void;

export const getFilter: TGetFilter = async ({ filterName, filters }) => {
  if (!AvailableFilters[filterName]) {
    throw new AppError(400, `filter with name "${filterName}" is not defined`);
  }

  const dbTranspiledFilters = transpileFilters(filters);

  const aggregate = Product.aggregate([{ $match: { ...dbTranspiledFilters } }]);

  let filter;
  switch (AvailableFilters[filterName]) {
    case 'pickMany':
      filter = {
        pickMany: {
          type: 'pickMany',
          value: await aggregate.append([
            { $group: { _id: `$${filterName}`, qty: { $sum: 1 } } },
            { $addFields: { name: '$_id' } },
            { $sort: { qty: -1 } },
          ]),
        },
      };
      break;
    case 'range':
      filter = {
        range: {
          type: 'range',
          value: (
            await aggregate.append([
              {
                $group: {
                  _id: null,
                  min: { $min: `$${filterName}` },
                  max: { $max: `$${filterName}` },
                },
              },
            ])
          )[0],
        },
      };
      break;
    default:
      break;
  }

  return filter;
};
