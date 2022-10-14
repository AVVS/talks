import { connect } from '@microfleet/transport-amqp'

const queue = process.env.QUEUE || 'test-17'

const amqp = await connect({ connection: { host: 'rabbitmq' }, queue, listen: [queue] }, async (data, message) => {
  return data
})

process.on('SIGINT', () => {
  amqp.close()
})