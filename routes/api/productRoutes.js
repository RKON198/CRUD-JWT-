const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 3001;

const products = [
    { id: 1, name: 'iphone 15', description: 'Apple Product', price: 135000 },
    { id: 2, name: 'google 7a', description: 'Google Product', price: 40000 },
    { id: 3, name: 'nothing phone 2', description: 'Nothing Product', price: 42000 }
];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id); 

    const product = products.find(product => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

router.post('/', (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        return res.status(404).json({ error: 'Name, description, and price are required' });
    }

    const id = products.length + 1;

    const newProduct = {
        id,
        name,
        description,
        price
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price } = req.body;

    const index = products.findIndex(product => product.id === productId);

    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = {
        id: productId,
        name: name || products[index].name, 
        description: description || products[index].description,
        price: price || products[index].price
    };

    res.json(products[index]);
});

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const index = products.findIndex(product => product.id === productId);

    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(index, 1);

    res.json({ message: 'Product deleted successfully' });
});

module.exports = router;