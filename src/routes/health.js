'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status:  'ok',
    version: process.env.APP_VERSION || '1.0.0',
    uptime:  Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
