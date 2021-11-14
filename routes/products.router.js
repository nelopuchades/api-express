const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
    const products = [];
    const { size } = req.query;
    const limit = size || 10;

    for(let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
        });
    }

    res.json(products);
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const products = [
        {
            id: 1,
            name: 'Coca Cola',
            price: 1000
        },
        {
            id: 2,
            name: 'Fanta',
            price: 1500
        }
    ];

    const product = products.find(prod => prod.id === parseInt(productId));
    if (!product) {
        res.status(404).json({
            message: 'Not Found'
        });
    } else {
        res.status(200).json(product);
    }
});

router.get('/:productId/categories/:categoryId', (req, res) => {
    const { categoryId, productId } = req.params;
    const products = [
        {
            id: 1,
            name: 'Coca Cola',
            category: 'Drink',
            price: 1000
        },
        {
            id: 2,
            name: 'Fanta',
            category: 'Beberage',
            price: 1500
        }
    ];

    const product = products.find(prod => prod.id === parseInt(productId) && prod.category === categoryId);
    if (!product) {
        res.json({
            error: true,
            message: `Couldn't find product with id ${productId} and category ${categoryId}`,
        });
    } else {
        res.json(product);
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    res.status(201).json({
        message: 'Created',
        data: body
    });
});

router.patch('/:productId', (req, res) => {
    const { productId } = req.params;
    console.log('req.params', req.params);
    const body = req.body;
    res.json({
        message: 'Updated',
        data: body,
        id: productId,
    });
});

router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    res.json({
        message: 'Deleted',
        productId,
    });
});

module.exports = router;
