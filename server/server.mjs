import pg from 'pg';
import knex from 'knex';
import exporess from 'express';

const {

    dbName,
    dbUser,
    dbPass,
    dbHost,
    serverHost = '127.0.0.1',
    serverPort = '8000',

} = process.env;

const db = knex({

    client: 'pg',
    connection: {

        db: dbName,
        user: dbUser,
        host: dbHost,
        pass: dbPass,

    },

});

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
    .listen(port, 'localhost', () => {

        console.log(`Server listen port: ${port}`);

    });