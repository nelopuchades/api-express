const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
    constructor() {
        this.products = [];
        this.generateProducts();
    }

    generateProducts() {
        for(let i = 0; i < 100; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlocked: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }

        this.products.push(newProduct);

        return newProduct;
    }

    async find() {
        return this.products;
    }

    async findOne(productId) {
        const product = this.products.find(product => product.id === productId);
        if (!product) {
            throw boom.notFound('Product not found');
        } else if (product.isBlocked) {
            throw boom.conflict('Product is blocked');
        }

        return product;
    }

    async update(productId, newProduct) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }

        this.products[index] = {
            ...this.products[index],
            ...newProduct
        };

        return this.products[index];
    }

    async delete(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }

        this.products.slice(index, 1);
        return { id: productId };
    }
}

module.exports = ProductsService;
