const Verifalia = require('verifalia');

const verifalia = new Verifalia.VerifaliaRestClient({
    username: process.env.VERIFALIA_USER,
    password: process.env.VERIFALIA_PASS
});


module.exports = verifalia;