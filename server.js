/*
import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import db from "./backend/db.js";
import Query from "./backend/resolvers/Query.js";
import Mutation from "./backend/resolvers/Mutation.js";
import Subscription from "./backend/resolvers/Subscription.js";
import mongo from "./backend/mongo.js";
import apiRoute from "./backend/route/api.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/schema.graphql");
const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use("/api", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
*/

import express from 'express'
import cors from 'cors'
import connectMongoDB from './backend/src/mongo.js'
import router from './backend/src/routes/api.js'
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

// connect database
connectMongoDB()

// init middleware
app.use(cors())
app.use(bodyParser.json())

// define routes
app.use('/api', router)

app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})