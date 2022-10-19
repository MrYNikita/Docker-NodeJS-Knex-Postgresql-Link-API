const knex = require('knex');
const express = require('express');
const router = express.Router();

router.get('/:id', function (req, res, next) {

    res.json(req.params);

});

module.exports = router;
