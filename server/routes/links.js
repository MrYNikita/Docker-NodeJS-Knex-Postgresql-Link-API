const db = require('../db/index');
const amqp = require('amqplib/callback_api');
const express = require('express');

const {

    rabbitUser,
    rabbitPass,

} = process.env;

const router = express.Router();

router.get('/:id', function (req, res) {
    db('links').where({ id: req.params.id }).first().then((link) => {
        res.json(link || { result: 'Not found' });
    });
});

router.post('', function (req, res) {
    db('links').insert(req.body).then((test) => {
        db('links').max('id').first().then(link => {
            const sendObj = {
                id: link.max,
                name: req.body.name,
            };

            // todo один instance на всё приложение

            amqp.connect(`amqp://${rabbitUser}:${rabbitPass}@rmq:5672/%2F`, (err, connect) => {
                if (err) throw err;
                connect.createChannel((err1, chanel) => {

                    if (err1) throw err1;

                    chanel.sendToQueue('links', Buffer.from(JSON.stringify(sendObj)));
                });
            });
        });


        res.statusCode = 200;
        res.end(``);
    });
});

router.put('/:id', function (req, res) {
    const linkBody = req.body;
    const id = req.params.id;
    db('links')
        .where({ id })
        .update(linkBody)
        .then(() => {
            res.statusCode = 200;
            res.end(``);
        });
});

module.exports = router;
