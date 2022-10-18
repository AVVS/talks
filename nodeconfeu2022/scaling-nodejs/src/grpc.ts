import { createServer } from 'nice-grpc'
import { 
  GreeterDefinition, 
  GreeterServiceImplementation,
  HelloReply
} from './gen/ts/src/hello'

const server = createServer({
  'grpc.enable_channelz': 0
})

const impl: GreeterServiceImplementation = {
  async sayHello(req, ctx): Promise<HelloReply> {
    return { hello: req.who }
  },
  async *biDiGreetings(req, ctx) {
    for await (const hreq of req) {
      yield { hello: hreq.who }
    }
  }
}

server.add(GreeterDefinition, impl);

(async () => {
  const port = await server.listen('0.0.0.0:8080')
  console.log(`listening at ${port}`)
})()

// 1. unary 
// ghz --insecure --proto ./src/hello.proto --call helloworld.Greeter.SayHello -d '{"who":"nodeconf"}' -z 10s --connections 1 0.0.0.0:8080
// 2. bidi streaming 
// ghz --insecure --proto ./src/hello.proto --call helloworld.Greeter.BiDiGreetings -d '{"who":"{{ randomString 8 }}"}' --stream-dynamic-messages --stream-call-count=1000 --stream-call-duration=10s -z 10s 0.0.0.0:8080
