'use strict';

const app    = require('./app');
const port   = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port} | env: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;
