const amqplib = require('amqplib');
const TYPES = require('../utilities/eventTypes');

const client = amqplib.connect(process.env.AMQP_CONNECTION_STRING)


const TOPICS = {
    USERS: {
        CLUSTERIZE: 'clusterize',
        FIND_TEMP_CLUSTER: process.env.AMQP_TOPICS_CLUSTERIZE_QUEUE_NAME,
    },
};

const types = {
    [TOPICS.USERS.FIND_TEMP_CLUSTER]: TYPES.NEW_USER_TEMP_CLUSTER,
};

const produce = async (topic, eventData) => {
    try {
        return client.then(async (conn) => conn.createChannel())
            .then(async (ch) => {
                const data = types[topic].toBuffer(eventData);
                const string = JSON.stringify(eventData)
                ch.assertQueue(process.env.AMQP_TOPICS_CLUSTERIZE_QUEUE_NAME, { durable: false });
                ch.sendToQueue(process.env.AMQP_TOPICS_CLUSTERIZE_QUEUE_NAME, Buffer.from(JSON.stringify(eventData), 'utf8'));
            })
            .then(console.log, console.warn);
            
    } catch (producingError) {  
        console.log({ producingError })
    }
};

const consume = (event) => {};

module.exports = { produce, consume, TOPICS };
