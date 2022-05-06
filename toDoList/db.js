const pgp = require('pg')();
const config = {
    host: 'localhost', 
    port: 5432, 
    database: '',
    user: 'corcoding'
};

module.exports = pgp;