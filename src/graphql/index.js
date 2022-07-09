const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require("http")
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {poemdata} = require('../db/db')
const path = require("path")

const startApollo = async function startApolloServer(typeDefs, resolvers, app) {

  const httpServer = http.createServer(app);

  const server = new ApolloServer({

    typeDefs,

    resolvers,

    csrfPrevention: true,

    cache: 'bounded',
    context() {
      return {poemdata}
    },

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

  });


  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql'
  });
  
  app.use((req, res)=>{
    res.sendFile(path.join(__dirname, "../build/index.html"))
  })

  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/`);

}

  module.exports = {startApollo, resolvers, typeDefs}