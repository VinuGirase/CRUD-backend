const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dairy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Dairy product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

// CRUD Routes
// Create
app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

// Read
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Update
app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

// Delete
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
