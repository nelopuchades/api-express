const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createProductSchema,
    updateProductSchema,
    getProductSchema
} = require('../schemas/product.schema');

const router = express.Router();
const ProductService = new ProductsService();

router.get('/', async (req, res) => {
    const products = await ProductService.find();

    res.json(products);
});

router.get('/:productId',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { productId } = req.params;
            const product = await ProductService.findOne(productId);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

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

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const productCreated = await ProductService.create(req.body);
        res.status(201).json(productCreated);
    }
);

router.patch('/:productId', 
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
    try {
        const { productId } = req.params;
        const patchedProduct = await ProductService.update(productId, req.body);
        res.json(patchedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await ProductService.delete(productId);
    res.json(deletedProduct);
});

module.exports = router;
