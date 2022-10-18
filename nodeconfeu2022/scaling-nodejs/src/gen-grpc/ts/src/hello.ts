/* eslint-disable */
import { handleBidiStreamingCall, handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import { FileDescriptorProto } from "ts-proto-descriptors";

export const protobufPackage = "helloworld";

export interface HelloRequest {
  who: string;
}

export interface HelloReply {
  hello: string;
}

function createBaseHelloRequest(): HelloRequest {
  return { who: "" };
}

export const HelloRequest = {
  encode(message: HelloRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.who !== "") {
      writer.uint32(10).string(message.who);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.who = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<HelloRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<HelloRequest | HelloRequest[]> | Iterable<HelloRequest | HelloRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [HelloRequest.encode(p).finish()];
        }
      } else {
        yield* [HelloRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, HelloRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<HelloRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [HelloRequest.decode(p)];
        }
      } else {
        yield* [HelloRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): HelloRequest {
    return { who: isSet(object.who) ? String(object.who) : "" };
  },

  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    message.who !== undefined && (obj.who = message.who);
    return obj;
  },

  fromPartial(object: DeepPartial<HelloRequest>): HelloRequest {
    const message = createBaseHelloRequest();
    message.who = object.who ?? "";
    return message;
  },
};

function createBaseHelloReply(): HelloReply {
  return { hello: "" };
}

export const HelloReply = {
  encode(message: HelloReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hello !== "") {
      writer.uint32(10).string(message.hello);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hello = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<HelloReply, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<HelloReply | HelloReply[]> | Iterable<HelloReply | HelloReply[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [HelloReply.encode(p).finish()];
        }
      } else {
        yield* [HelloReply.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, HelloReply>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<HelloReply> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [HelloReply.decode(p)];
        }
      } else {
        yield* [HelloReply.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): HelloReply {
    return { hello: isSet(object.hello) ? String(object.hello) : "" };
  },

  toJSON(message: HelloReply): unknown {
    const obj: any = {};
    message.hello !== undefined && (obj.hello = message.hello);
    return obj;
  },

  fromPartial(object: DeepPartial<HelloReply>): HelloReply {
    const message = createBaseHelloReply();
    message.hello = object.hello ?? "";
    return message;
  },
};

export type GreeterService = typeof GreeterService;
export const GreeterService = {
  /** unary */
  sayHello: {
    path: "/helloworld.Greeter/SayHello",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloReply) => Buffer.from(HelloReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloReply.decode(value),
  },
  /** bidirectional */
  biDiGreetings: {
    path: "/helloworld.Greeter/BiDiGreetings",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloReply) => Buffer.from(HelloReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloReply.decode(value),
  },
} as const;

export interface GreeterServer extends UntypedServiceImplementation {
  /** unary */
  sayHello: handleUnaryCall<HelloRequest, HelloReply>;
  /** bidirectional */
  biDiGreetings: handleBidiStreamingCall<HelloRequest, HelloReply>;
}

type ProtoMetaMessageOptions = {
  options?: { [key: string]: any };
  fields?: { [key: string]: { [key: string]: any } };
  oneof?: { [key: string]: { [key: string]: any } };
  nested?: { [key: string]: ProtoMetaMessageOptions };
};

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
  options?: {
    options?: { [key: string]: any };
    services?: {
      [key: string]: { options?: { [key: string]: any }; methods?: { [key: string]: { [key: string]: any } } };
    };
    messages?: { [key: string]: ProtoMetaMessageOptions };
    enums?: { [key: string]: { options?: { [key: string]: any }; values?: { [key: string]: { [key: string]: any } } } };
  };
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto.fromPartial({
    "name": "src/hello.proto",
    "package": "helloworld",
    "dependency": [],
    "publicDependency": [],
    "weakDependency": [],
    "messageType": [{
      "name": "HelloRequest",
      "field": [{
        "name": "who",
        "number": 1,
        "label": 1,
        "type": 9,
        "typeName": "",
        "extendee": "",
        "defaultValue": "",
        "oneofIndex": 0,
        "jsonName": "who",
        "options": undefined,
        "proto3Optional": false,
      }],
      "extension": [],
      "nestedType": [],
      "enumType": [],
      "extensionRange": [],
      "oneofDecl": [],
      "options": undefined,
      "reservedRange": [],
      "reservedName": [],
    }, {
      "name": "HelloReply",
      "field": [{
        "name": "hello",
        "number": 1,
        "label": 1,
        "type": 9,
        "typeName": "",
        "extendee": "",
        "defaultValue": "",
        "oneofIndex": 0,
        "jsonName": "hello",
        "options": undefined,
        "proto3Optional": false,
      }],
      "extension": [],
      "nestedType": [],
      "enumType": [],
      "extensionRange": [],
      "oneofDecl": [],
      "options": undefined,
      "reservedRange": [],
      "reservedName": [],
    }],
    "enumType": [],
    "service": [{
      "name": "Greeter",
      "method": [{
        "name": "SayHello",
        "inputType": ".helloworld.HelloRequest",
        "outputType": ".helloworld.HelloReply",
        "options": undefined,
        "clientStreaming": false,
        "serverStreaming": false,
      }, {
        "name": "BiDiGreetings",
        "inputType": ".helloworld.HelloRequest",
        "outputType": ".helloworld.HelloReply",
        "options": undefined,
        "clientStreaming": true,
        "serverStreaming": true,
      }],
      "options": undefined,
    }],
    "extension": [],
    "options": undefined,
    "sourceCodeInfo": {
      "location": [{
        "path": [6, 0, 2, 0],
        "span": [4, 2, 51],
        "leadingComments": "",
        "trailingComments": " unary\n",
        "leadingDetachedComments": [],
      }, {
        "path": [6, 0, 2, 1],
        "span": [5, 8, 75],
        "leadingComments": "",
        "trailingComments": " bidirectional\n",
        "leadingDetachedComments": [],
      }],
    },
    "syntax": "proto3",
  }),
  references: { ".helloworld.HelloRequest": HelloRequest, ".helloworld.HelloReply": HelloReply },
  dependencies: [],
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
