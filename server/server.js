require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require('../server/api')
const bodyParser = require('body-parser')

// Middleware for parsing request bodies here:
app.use(bodyParser.json())

//  Middleware for handling CORS requests from index.html
app.use(cors());

// Middleware for api Routes
app.use('/api', apiRouter);

// Enable trust for proxy
app.set('trust proxy', 1)


// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// express-session below:
const session = require("express-session");
const MongoStore = require('connect-mongo');

// session middleware below:
const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  cookie: {
    maxAge: 172800000,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'none',
  },
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Provide the MongoDB connection URL
    touchAfter: 24 * 3600, // Update every 24 hours
  }),});

app.use(sessionMiddleware);


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
