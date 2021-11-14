const express = require('express');
const setupRoutes = require('./routes/index');

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

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
