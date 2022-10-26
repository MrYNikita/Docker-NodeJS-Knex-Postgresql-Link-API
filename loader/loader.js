const amqp = require('amqplib');

const {

    user,
    pass,

} = process.env;

console.log(`

    --------------

    USER: ${user}
    PASS: ${pass}

    -------------

`);

amqp.connect(`amqp://${user}:${pass}@rmq:5672/%2F`, function (error0, connection) {

    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {

        if (error1) throw error1;

        channel.assertQueue('links ', {

            durable: false,

        });

        channel.consume(queue, function (msg) {

            console.log(" [x] Received %s", msg.content.toString());

        }, {

            noAck: true

        });

    });

});