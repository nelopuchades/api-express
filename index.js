const express = require('express');
const setupRoutes = require('./routes/index');

const { errorLogger, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world from Express!');
});

app.get('/new-route', (req, res) => {
    res.send('Hi! I\'m a new route!');
});

setupRoutes(app);

app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
