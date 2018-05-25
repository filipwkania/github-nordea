const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes');

const PORT = process.env.PORT || 4000;

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.status(err.status || 500).json({ error: err }));

const server = app.listen(PORT, () => {
  console.log('-============================-');
  console.log(`Server listening on port ${PORT}`);
  console.log('-============================-');
});

const gracefulShutdown = () => {
  server.close(() => process.exit());
  setTimeout(() => process.exit(), 10000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
