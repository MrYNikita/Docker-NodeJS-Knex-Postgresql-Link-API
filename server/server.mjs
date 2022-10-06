import pg from 'pg';
import knex from 'knex';
import express from 'express';
import { readFileSync } from 'fs';

const {

    dbName,
    dbUser,
    dbPass,
    dbPort,
    serverPort = '8000',

} = process.env;

const db = knex({

    client: 'pg',
    connection: `postgres://${dbUser}:${dbPass}@db:${dbPort}/${dbName}`,

});

const app = express(), urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/html')
    res.end(readFileSync('public/index.html'));

}).get('/links/:id', (req, res) => {

    db('links').where({ id: req.params.id }).first().then((link) => {

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(link));

    });

}).post('/links', urlencodedParser, (req, res) => {

    console.log(req.body);

    db('links').insert({ link: req.body.link }).then(() => {

        res.statusCode = 200;
        res.end(``);

    });

}).listen(serverPort,  () => {

    console.log(`Server listen port: ${serverPort}`);

});