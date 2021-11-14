const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
