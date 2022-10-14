import Fastify from 'fastify'

const fastify = Fastify({
  logger: false,
})

const schema = {
  query: {
    type: 'object',
    required: ['who'],
    properties: {
      who: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        hello: {
          type: 'string',
        },
      },
    },
  }
}

// Declare a route
fastify.get('/', { schema }, async function (request) {
  return { hello: request.query.who }
})

// Run the server!
fastify.listen({ port: 9999 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  console.info(`Server is now listening on ${address}`)
})

// node ./src/fastify.mjs
// ./node_modules/.bin/autocannon http://localhost:9999\?who\=nodeconf
