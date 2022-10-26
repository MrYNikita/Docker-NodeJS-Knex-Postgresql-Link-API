#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

// Подлкючение к серверу
amqp.connect('amqp://rmq', function(error0, connection) {

    if (error0) throw error0;

    connection.createChannel(function(error1, channel) {

        if (error1) throw error1;

        const q = [];
        const m = '';

        channel.assertQueue(q, {

            durable: true,

        });
        channel.sendToQueue(q, Buffer.from(m));

    });

});

