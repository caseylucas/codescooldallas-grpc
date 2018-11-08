CodesCoolDallas-gRPC Workshop
=============================

***client.js***

The last piece of the gRPC Chat puzzle. The client. 

The client has a bit more work as it has to handle user interactions such as reading the users input via command line. 

To communicate with the server, we'll load the protobuf just like we did in `server.js`. We'll then be able to send and receive our message models to and from the server. 

Let's start building out the client, create a `client.js` file and add the following code to configure the basic server information and dependencies and create a variable to hold a username.

```
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");

const remoteServer = "0.0.0.0:5001";
let username;
```

Next, we'll need to configure the standard NodeJS readline package to process standard input and output to your console so you can type in messages to be sent. We'll do that by adding the next bit of code.

```
// read terminal lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

Then we load our protobuf. This snippet should look familiar as it's identical to the code we used in `server.js` a bit ago.

```
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
```

Now, we'll start getting into the good stuff again. By typing in the next bit of code, you'll be creating a new grpc client from your protobuf and then defining a `startChat` function to join the client's session to the remote server and start listening for messages. 

You'll notice that we pass in a callback function to `channel.on` so that our client can handle any data passed back from our server. Shortly after, we define that `onData` function and use it to filter out our own messages and print out any other users message. 

In a real world application, you would likely have some form of a unique identifier for a user. In our very simple use case, if two people join with the same name. They won't see each other's messages. Sorry.

```
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
```

After we tidy up all of our main functions, type in the this last bit to tell Node to ask the chat session user for a name and then immediately start listening for anything the user types to be sent up to the chat server. 

```
// ask user name then start the chat
rl.question("What's your name? ", answer => {
  username = answer;
  startChat();
});
```

[Continue to 6. Using gRPC to Live Chat](../6_grpc_chat)
