'use strict';

const requestLogger = (req, _res, next) => {
  console.log(JSON.stringify({
    timestamp:  new Date().toISOString(),
    method:     req.method,
    path:       req.path,
    userAgent:  req.headers['user-agent'] || 'unknown'
  }));
  next();
};

module.exports = { requestLogger };
