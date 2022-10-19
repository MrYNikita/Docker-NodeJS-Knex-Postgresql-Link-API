const knex = require("knex");

const {
    dbName,
    dbUser,
    dbPass,
    dbPort,
    dbHost,
} = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: dbHost || 'localhost',
        user: dbUser || 'postgres',
        password: dbPass || 'postgres',
        database: dbName || 'links',
        port: dbPort || '5432',
        charset: 'utf8',
    },
});

module.exports = db;