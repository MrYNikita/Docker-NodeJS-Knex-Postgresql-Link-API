import pg from 'pg';
import knex from 'knex';
import exporess from 'express';

const {

    dbUser,
    dbPass,
    dbHost,
    serverHost = '127.0.0.1',
    serverPort = '8000',

} = process.env;

console.log(serverHost, serverPort);