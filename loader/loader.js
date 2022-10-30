const fetch = require('node-fetch');
const amqp = require('amqplib/callback_api');

const {
    user,
    pass,
    WEB_BASE_URL,
} = process.env;

amqp.connect(`amqp://${user}:${pass}@rmq:5672/%2F`, function (error0, connection) {

    // todo в process.env

    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {

        if (error1) throw error1;

        const queue = 'links';

        channel.assertQueue(queue, {

            durable: false,

        });

        channel.consume(queue, function (msg) {
            
            const content = JSON.parse(msg.content.toString());
            fetch(content.name)
                .then((res) => {
                    fetch(`http://${WEB_BASE_URL}/links/${content.id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: JSON.stringify({
                            status: res.status
                        })
                    });
                });

            console.log(" [x] Received %s", msg.content.toString());

        }, {

            noAck: true

        });

    });

});