const express = require('express');
const apiRouter = express.Router();
const regRouter = require('./database/routes/regRouter');
const cartRouter = require('./database/routes/cartRouter');
const likedRouter = require('./database/routes/likedItemsRouter')

apiRouter.use('/reg', regRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/liked', likedRouter);

module.exports = apiRouter;