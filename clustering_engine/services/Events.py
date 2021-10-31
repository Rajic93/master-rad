import pika, os, json

url = os.environ.get('CLOUDAMQP_URL', 'amqps://mzxaeerh:yTGT7ZgLs-xUR8R_VSsI2G4qAWy7G22b@crow.rmq.cloudamqp.com/mzxaeerh')
params = pika.URLParameters(url)

def invalidate_cache_msg(connection):

    try:
        newConnection = pika.BlockingConnection(params)

        invalidate_msg = {
            "message": "new clusters incoming",
            "type": 'invalidate-cache'
        }
        print(json.dumps(invalidate_msg))
        channel = newConnection.channel()
        channel.exchange_declare('invalid-cluster-exchange')
        channel.queue_declare(
            queue='invalidate-cluster-cache',
            durable=True
        )
        channel.queue_bind(
            'invalidate-cluster-cache',
            'invalid-cluster-exchange',
            'invalidate-cache'
        )
        channel.basic_publish(
            exchange='invalid-cluster-exchange',
            routing_key='invalidate-cache',
            body=json.dumps(invalidate_msg)
        )
    except Exception as exc:
        connection.close()
        print('Smth bad happened')
        print(exc)

def initClusterizeTemp(connection, handler, send_invalidate_cache_msg):
    def callback(ch, method, properties, body):
        data = json.loads(body.decode("utf-8"))
        print(" [x] Received ")
        print(data)
        handler(data, send_invalidate_cache_msg, connection)
    
    try:
        channel = connection.channel() # start a channel
        channel.basic_consume('clusterize-temp', callback, auto_ack=True)
        print(' [*] Waiting for messages:')
        channel.start_consuming()
    except Exception as exc:
        connection.close()
        print('Smth bad happened')
        print(exc)

def initEvents(handlers):
    connection = pika.BlockingConnection(params)
    
    initClusterizeTemp(connection, handlers['clusterize-temp'], invalidate_cache_msg)