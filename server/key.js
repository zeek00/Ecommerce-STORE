const crypto = require('crypto');

const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

const secretKey = generateSecretKey();
module.exports = secretKey;