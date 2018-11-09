CodesCoolDallas-gRPC Workshop
=============================

***server.js***

Now that we have our `chat.proto` file knocked out. We'll need to create the server to glue everything together.

The idea of the server is simple. Accept connections from new clients and save them into a listing of all connections. Then to take any messages sent in from a client and cycle through the list of connections sending it back out to everyone else.

Create a file called `server.js` in the top level of the repo alongside your `.proto` file and add the following code. 

```
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const serverAddress = "0.0.0.0:5001";
```

This is the first step for getting our server up and running. This defines our dependencies and our port number. It also initializes an instance of the gRPC Server class for us to use.

Next, we'll need to load up our `chat.proto` protobuf. To do that, we'll call on the `grpc` object to load the package definition and pass in a set of options. The options we're passing into the protoLoader below are some basic standards used across various tutorials. These are configurable and can be updated to suit your needs.

Add the next bit of code below to your `server.js` file.

```
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
```

Next up, we need the meat of the server. The function definitions. Per our `chat.proto` we'll need both a `join` and a `send` function. Add the code below to your `server.js`. This will create an array of users where we can store connected clients. It will define the `join` function and add any joined connection to our users array and also a `send` function will which cycle through each of the connected clients in our users array and write back any received messages. 

```
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
```

Finally, we'll add the service, bind the port to our server, and fire it up. Add this last bit of code to your `server.js` and move forward to the client.

```
// define server with the methods and start it
server.addService(proto.example.Chat.service, {
  join: join,
  send: send
});

server.bind(serverAddress, grpc.ServerCredentials.createInsecure());
server.start();
```

[Continue to 5. A NodeJS gRPC Client](../5_node_client)
