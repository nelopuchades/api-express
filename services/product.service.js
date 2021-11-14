const faker = require('faker');

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
    
    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        });
        // return this.products;
    }

    async findOne(productId) {
        return this.products.find(product => product.id === productId);
    }

    async update(productId, newProduct) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw new Error('Product not found');
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
            throw new Error('Product not found');
        }

        this.products.slice(index, 1);
        return { id: productId };
    }
}

module.exports = ProductsService;
