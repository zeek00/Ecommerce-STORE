require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require('../server/api')
const sessionMiddleware = require('./middleware/session');

const allowedOrigins = ['http://localhost:3000', 'https://zeekdevs.com/shoopp'];


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
  origin: (origin, callback) => {
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




app.set('trust proxy', 1)

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

app.disable("x-powered-by");

app.use(sessionMiddleware);

app.use('/api', apiRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
