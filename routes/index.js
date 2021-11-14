const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function setupRoutes(app) {
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
}

module.exports = setupRoutes;
