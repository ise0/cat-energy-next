import Product from '../../../models/product';

export const getProduct = ({ id }: { id: string }) => Product.findById(id);
