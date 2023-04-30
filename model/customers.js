import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({
    name: String,
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    }
  });

const Customer = mongoose.model('customers', customerSchema);

export {Customer, customerSchema};