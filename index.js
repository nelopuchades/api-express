const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world from Express!');
});

app.get('/new-route', (req, res) => {
    res.send('Hi! I\'m a new route!');
});

app.get('/products', (req, res) => {
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

app.get('/products/:productId', (req, res) => {
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
    
    res.json(product);
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
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

app.get('/users', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({
            limit,
            offset,
        });
    } else {
        res.json({
            error: true,
            message: 'There are no params to get',
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
