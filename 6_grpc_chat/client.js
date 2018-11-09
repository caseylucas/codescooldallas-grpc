const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");

const remoteServer = "0.0.0.0:5001";

// read terminal lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// load the protobuf
var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let username;

// create grpc client
let client = new proto.example.Chat(remoteServer, grpc.credentials.createInsecure());

// start the stream between server and client
function startChat() {
  let channel = client.join({
    user: username
  });
  channel.on("data", onData);
  rl.on("line", function (text) {
    client.send({
      user: username,
      text: text
    }, res => {});
  });
}

// handle server sending a message
function onData(message) {
  if (message.user == username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}

// ask user name then start the chat
rl.question("What's your name? ", answer => {
  username = answer;
  startChat();
});
