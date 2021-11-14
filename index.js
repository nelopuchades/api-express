const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world from Express!');
});

app.get('/new-route', (req, res) => {
    res.send('Hi! I\'m a new route!');
});

app.get('/products', (req, res) => {
    res.json({
        name: 'Coca Cola',
        price: 1000
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
