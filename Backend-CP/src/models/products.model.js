import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: String, required: true }
});

const Product = mongoose.model('product', productSchema);

export default Product;