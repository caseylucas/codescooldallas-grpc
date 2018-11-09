CodesCoolDallas-gRPC Workshop
=============================

***Chat.proto***

The chat functions and structure will be defined using the following `protobuf`.

Create a file called `chat.proto` in the top level directory next to your `package.json` file.

Inside that file, add the following code. Comments are provided to explain the code.

```
// Specify protobuf version (proto3).
syntax = "proto3"; 

// Optional: Specify a unique package name.
package example; 

// Define the service class to be used by the clients.
service Chat {
  rpc join(stream Message) returns (stream Message){}
  rpc send(Message) returns (Message){}
}

// Define the information that will be passed between 
// our clients and our server.
message Message {
  string user = 1;
  string text = 2;
}
```

That's it. The little bit of code above will be used define a service including any required functions and all models. 

You'll notice there are two `rpc` functions defined: `join` and `send`. These are the two functions required in our system. Join will allow a user to initiate a session and connect to the live chat. Send will allow a user to send a message to all other connected clients. 

You'll notice the definition does not define any language requirements, you can now build your clients and servers using any language of your choice that supports gRPC. We'll move forward using NodeJS.

>>>
Note: Only one model "Message" is defined here. The message model is then used as the argument and the return object. This is not mandatory and if so desired, you could use different models for arguments and returns.
>>>

[Continue to 4. A NodeJS gRPC Server](../4_node_server)
