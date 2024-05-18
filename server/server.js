require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require('./api')
const sessionMiddleware = require('./middleware/session');

const allowedOrigins = ['https://shoopps.netlify.app'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ error: 'CORS error: Not allowed by CORS' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

app.disable("x-powered-by");

app.use(sessionMiddleware);

app.get("/welcome", (req,res)=>{
  res.send("Welcome to SHOOPP api")
})

app.use('/api', apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
