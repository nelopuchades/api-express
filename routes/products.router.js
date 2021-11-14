const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const ProductService = new ProductsService();

router.get('/', (req, res) => {
    const products = ProductService.find();

    res.json(products);
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;

    const product = ProductService.findOne(productId);

    res.json(product);
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
    const productCreated = ProductService.create(req.body);
    res.status(201).json(productCreated);
});

router.patch('/:productId', (req, res) => {
    const { productId } = req.params;
    const patchedProduct = ProductService.update(productId, req.body);
    res.json(patchedProduct);
});

router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    const deletedProduct = ProductService.delete(productId);
    res.json(deletedProduct);
});

module.exports = router;
