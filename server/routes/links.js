const express = require('express');

const db = require('../db/index');

const router = express.Router();

router.get('/:id', function (req, res, next) {
    db('links').where({ id: req.params.id }).first().then((link) => {
        console.log('LINK: ', link)
        res.json(link || {result: 'Not found'});
    });
});

router.put('', function (req, res, next) {
    db('links').insert({status: req.body.status}).then(() => {
        res.statusCode = 200;
        res.end(``);
    });
});

module.exports = router;
