const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const serverAddress = "0.0.0.0:5001";

// load protobuf
let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let users = [];

// receive message from client joining
function join(call, callback) {
  users.push(call);
  notifyChat({
    user: "Server",
    text: "New connection initiated."
  });
}

// receive message from client
function send(call, callback) {
  notifyChat(call.request);
}

// send message to all connected clients
function notifyChat(message) {
  users.forEach(user => {
    user.write(message);
  });
}

// define server with the methods and start it
server.addService(proto.example.Chat.service, {
  join: join,
  send: send
});
server.bind(serverAddress, grpc.ServerCredentials.createInsecure());
server.start();
