import mongoose from 'mongoose';
import { customerSchema } from './model/customers.js';
import { productSchema } from './model/product.js';
import express from 'express';

const url = 'mongodb://0.0.0.0:27017/shop';

const PORT = 7070;
const app = express();

mongoose.connect(url);

const connection = mongoose.connection;

connection.on('open', () => {
  console.log('Connected to the database!');
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

const Customer = mongoose.model('customers', customerSchema);
const Product = mongoose.model('products', productSchema);

app.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('product_id');
    const html = `
      <h1>Users purchases:</h1>
      ${customers.map(customer => `
          <h2>${customer.name}</h2>
          <h3>${customer.product_id.title}</h3>
          <span>Price: ${customer.product_id.price}</span>
      `).join('')}
    `;
    res.send(html);
  } catch (error) {
    console.error(error);
  }
});