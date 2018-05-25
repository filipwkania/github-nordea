const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));
router.get('/test', (req, res) => res.send('hello test'));

module.exports = router;
