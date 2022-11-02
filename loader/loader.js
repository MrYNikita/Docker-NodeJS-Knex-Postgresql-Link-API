const fetch = require('node-fetch');
const { createClient } = require('redis');
const amqp = require('amqplib/callback_api');

const {
    user,
    pass,
    WEB_BASE_URL,
    REDIS_NAME,
} = process.env;

const getStatusFromRedis = async (client, link) => {
    return await client.get(link);
}

const updateLink = (id, status) => {
    fetch(`http://${WEB_BASE_URL}/links/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            status,
        })
    });
}

const client = createClient({
    url: `redis://${REDIS_NAME}:6379`
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

amqp.connect(`amqp://${user}:${pass}@rmq:5672/%2F`, function (error0, connection) {

    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {

        if (error1) throw error1;

        const queue = 'links';

        channel.assertQueue(queue, {
            durable: false,
        });

        channel.consume(queue, async function (msg) {
            const content = JSON.parse(msg.content.toString());
            const statusFromRedis = await getStatusFromRedis(client, content.name);

            if (statusFromRedis) {
                updateLink(content.id, statusFromRedis);
            } else {
                fetch(content.name)
                    .then((res) => {
                        updateLink(content.id, res.status);
                        client.set(content.name, res.status);
                    });
            }
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
