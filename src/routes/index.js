const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));
router.get('/lol', (req, res) => res.send('hello world'));

module.exports = router;
