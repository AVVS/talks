import { Server, ServerCredentials, ServiceError } from '@grpc/grpc-js'
import { strict as assert } from 'node:assert'
import {
  GreeterServer,
  GreeterService,
} from './gen-grpc/ts/src/hello'

const server = new Server({
  'grpc.enable_channelz': 0,
})

const impl: GreeterServer = {
  sayHello(call, callback) {
    callback(null, { hello: call.request.who })
  },
  biDiGreetings(call) {
    call.on('data', (request) => {
      call.write(request)
    })
    call.on('end', () => {
      call.end()
    })
  }
}

server.addService(GreeterService, impl)

server.bindAsync('localhost:8080', ServerCredentials.createInsecure(), (err, port) => {
  assert.ifError(err)
  server.start()
})
