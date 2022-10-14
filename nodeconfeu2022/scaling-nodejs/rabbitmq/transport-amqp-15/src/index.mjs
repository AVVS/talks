import AMQPTransport from '@microfleet/transport-amqp'

const queue = process.env.QUEUE || 'test-15'

const amqp = await AMQPTransport.connect({ connection: { host: 'rabbitmq' }, queue, listen: [queue] }, (message, properties, actions, next) => {
  next(null, message)
})

process.on('SIGINT', () => {
  amqp.close()
})