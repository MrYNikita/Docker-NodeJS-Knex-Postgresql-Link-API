const express = require('express');

const db = require('../db/index');

const router = express.Router();

router.get('/:id', function (req, res) {
    db('links').where({ id: req.params.id }).first().then((link) => {
        res.json(link || {result: 'Not found'});
    });
});

router.post('', function (req, res) {
    db('links').insert(req.body).then((test) => {
        db('links').max('id').first().then(link => {
            console.log('link: ', link.max);

            const sendObj = {
                id: link.max,
                name: req.body.name,
            };
        });


        res.statusCode = 200;
        res.end(``);
    });
});

router.put('/:id', function (req, res) {
    const linkBody = req.body;
    const id = req.params.id;
    db('links')
        .where({id})
        .update(linkBody)
        .then(() => {
            res.statusCode = 200;
            res.end(``);
        });
});

module.exports = router;
