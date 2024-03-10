require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require('../server/api')
const sessionMiddleware = require('./middleware/session');
require('./utilities/cleanUpExpFIles');

const allowedOrigins = ['http://localhost:3000', 'https://yourproductionapp.com'];


// Middleware for parsing request bodies here:
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

//  Middleware for handling CORS requests from index.html
const corsOptions = {
  origin: (origin, callback) => {
    // Checking if the origin is in the allowedOrigins array or if it's undefined (for same-origin requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));




// Enable trust for proxy
app.set('trust proxy', 1)

// Security Headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// express-session below:


// session middleware
app.use(sessionMiddleware);


// Middleware for api Routes
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
