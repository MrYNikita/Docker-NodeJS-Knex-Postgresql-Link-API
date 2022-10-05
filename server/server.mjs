import pg from 'pg';
import knex from 'knex';
import express from 'express';

const {

    dbName,
    dbUser,
    dbPass,
    dbHost,
    dbPort,
    serverHost = '127.0.0.1',
    serverPort = '8000',

} = process.env;

const db = knex({

    client: 'pg',
    connection: `postgres://${dbUser}:${dbPass}@db:${dbPort}/${dbName}`,

});

db('links').insert({ link: 'other/link' }).then(() => {});

const app = express(), urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/html')
    res.end(readFileSync('public/index.html'));

})
    .get('/links/:id', (req, res) => {



    })
    .post('/links', urlencodedParser, (req, res) => {




    })
    .listen(serverPort, 'localhost', () => {

        console.log(`Server listen port: ${serverPort}`);

    });