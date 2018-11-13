CodesCoolDallas-gRPC Workshop
=============================

***Everyone loves to a good chat app.***

The tutorial today based on FEXCO's blog will walk you through creating a protobuf definition, server, and client. Once all three components are completed, you will be able to open as many terminal windows as your laptop can handle and chat to your heart's content. 

***First off, let's clone the repo.***

Clone this repo to your machine then `cd` into the repo where we'll create our node project.

```
git clone git@github.com:codescooldallas/codescooldallas-grpc.git
cd codescooldallas-grpc
```

>>>
Note: Moving forward from this point, we are assuming you have both Node and NPM installed on your machine. This tutorial was written and tested using Node v10.10 and npm v6.4.1. If you need help installing Node, please reach out to anyone near you at the meetup or an organizer and we'll be happy to help.
>>>

***Next we'll create a new project.***

To create a new project using npm, run `npm init` and accept all the defaults  by pressing enter several times. This generates a `package.json` file like this.

```{
  "name": "codescooldallas-grpc",
  "version": "1.0.0",
  "description": "CodesCoolDallas-gRPC Workshop =============================",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kwandrews7/codescooldallas-grpc.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/kwandrews7/codescooldallas-grpc/issues"
  },
  "homepage": "https://github.com/kwandrews7/codescooldallas-grpc#readme"
}
```

***Then install the gRPC dependencies.***

Run the following commands to install `grpc` and `@grpc/proto-loader` in your project. This will install the required files into a `node_modules` directory within the repo and save the dependencies to your `package.json`.

```
npm install grpc
npm install @grpc/proto-loader
```

If you peek into your updated `package.json` file, you'll see the dependencies.

```
  "dependencies": {
    "@grpc/proto-loader": "^0.3.0",
    "grpc": "^1.16.0"
  }
```

***Creating the project code.***

The next few steps will help you create the following: 

* chat.proto - A data structure for defining our functions and models.
* server.js - A gRPC Node server.
* client.js - A gRPC Node client.

[Continue to 3. My First Protobuf](../3_protobuf)
