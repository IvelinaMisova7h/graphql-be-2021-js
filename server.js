import express from "express";
import {ApolloServer} from "apollo-server-express";
import dotenv from "dotenv";
import schema from "./graphql/graphql-schema.js";
import { getContext } from "./helpers/context.js";
import { formatError } from "./helpers/format-error.js";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "express-jwt";


import mongoose from "mongoose";

dotenv.config();
const db = process.env.MONGODB_URL;

const auth = jwt({
  secret: process.env.JSONWEBTOKEN_PRIVATE_KEY,
  algorithms: ["HS256"],
  credentialsRequired: false,
});





const graphqlPath = "/graphql";

mongoose.connect(db, {
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('connected to mongodb')
}).catch((e)=> {
    console.log(e);
})

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const context = await getContext(req);
      return context;
    },
    formatError,
    introspection: true,
    playground: true,
  });



  const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), auth);
app.use('/graphql', cors({ schema: true, }));

(app).listen("8000");
  // const app = express();
  // app.use(
  //     graphqlPath,
  //     cors({
  //         credentials: true,
          
  //     }),
  //     bodyParser.json(),
  //     auth
  // );

server.applyMiddleware({ app, path: graphqlPath });
  await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();