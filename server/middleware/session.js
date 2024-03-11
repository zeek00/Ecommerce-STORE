const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  cookie: {
    maxAge: 172800000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  },
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    touchAfter: 24 * 3600,
  }),
});

module.exports = sessionMiddleware;
