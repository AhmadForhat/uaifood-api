const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs')

const {restaurants, cities} = require('./resolvers')

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql(fs.readFileSync("./schema/schema.graphql", { encoding: "utf8" }));

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      cities,
      restaurants
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000

  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
