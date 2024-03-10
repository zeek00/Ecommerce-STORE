const express = require('express');
const apiRouter = express.Router();
const regRouter = require('./database/regRouter');
const cartRouter = require('./database/cartRouter');

apiRouter.use('/reg', regRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;