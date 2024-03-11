const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
 try{ 
    const token =
      req.body.token || req.headers.authorization;
    if (!token) {
      const error = new Error();
      error.message = 'A token is required for authentication';
      error.code = 403;
      throw error;   
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if(!decoded){
      const error = new Error();
      error.message = 'Invalid Token';
      error.code = 401;
      throw error;
    }

    req.session.user = decoded;

    if (!req.session || !req.session.user) {
      const error = new Error();
      error.message = 'User session or token is missing';
      error.code = 403;
      throw error;
    }
    
    next();
  }catch(error){
    console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
  }
};

module.exports = verifyToken;