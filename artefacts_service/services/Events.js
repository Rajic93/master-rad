const amqplib = require('amqplib');

const TOPICS = {
    USERS: {
        CLUSTERIZE: 'clusterize',
        FIND_TEMP_CLUSTER: 'clusterize-temp',
    },
};


const produce = async (topic, eventData) => {
    try {
        // return client.then(async (conn) => conn.createChannel())
        //     .then(async (ch) => {
        //         const data = types[topic].toBuffer(eventData);
        //         const string = JSON.stringify(eventData)
        //         ch.assertQueue('clusterize-temp', { durable: false });
        //         ch.sendToQueue('clusterize-temp', Buffer.from(JSON.stringify(eventData), 'utf8'));
        //     })
        //     .then(console.log, console.warn);
            
    } catch (producingError) {  
        console.log({ producingError })
    }
};

const consume = async (handler) => {
    try {
        let conn = amqplib.connect('amqps://mzxaeerh:yTGT7ZgLs-xUR8R_VSsI2G4qAWy7G22b@crow.rmq.cloudamqp.com/mzxaeerh');

        return conn.then((connection) => {
            let ok = connection.createChannel();

            ok = ok.then((ch) => {
                ch.assertQueue('invalidate-cluster-cache');
    
                ch.consume('invalidate-cluster-cache', function(msg) {

                    if (msg !== null) {
                        handler(JSON.parse(msg.content));
                        ch.ack(msg);
                    }
                  })
                  .catch(catchError => console.log({ catchError }));
            })
            return ok;
        }).catch(err => console.log({ err }));
        

            
    } catch (producingError) {  
        console.log({ producingError })
    }
};

module.exports = { produce, consume, TOPICS };
