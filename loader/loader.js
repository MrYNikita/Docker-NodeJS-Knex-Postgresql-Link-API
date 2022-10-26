const fetch = require('node-fetch');
const amqp = require('amqplib/callback_api');

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

        const queue = 'links';

        channel.assertQueue(queue, {

            durable: false,

        });

        channel.consume(queue, function (msg) {
            console.log('msg: ', msg);
            console.log('msg.content.toString()', msg.content.toString());
            const content = JSON.parse(msg.content.toString());
            fetch(content.name)
                .then((res) => {
                    fetch(`http://server:3000/links/${content.id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: JSON.stringify({
                            status: res.status
                        })});
                    });

            console.log(" [x] Received %s", msg.content.toString());

        }, {

            noAck: true

        });

    });

});