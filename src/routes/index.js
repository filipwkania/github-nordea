const express = require('express');

// const ping = require('./ping');

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));

// router.use('/ping', ping);

module.exports = router;
