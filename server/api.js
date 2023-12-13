const express = require('express');
const apiRouter = express.Router();
const regRouter = require('./database/regRouter');

apiRouter.use('/reg', regRouter);

module.exports = apiRouter;