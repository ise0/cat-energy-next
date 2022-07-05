import { Schema, model, models } from 'mongoose';

type TProduct = {
  name: string;
  price: number;
  flavor: string;
  weight: string;
  brand: string;
  img: string;
};

const productSchema = new Schema<TProduct>({
  name: { type: String, unique: true, required: true },
  price: { type: Number },
  flavor: { type: String },
  weight: { type: String },
  brand: { type: String, required: true },
  img: { type: String, required: true },
});

const Product = models.Product || model('Product', productSchema);

export default Product;
