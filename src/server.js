const express = require("express")
const {dbStart} = require("./db/db");
const {startApollo, typeDefs, resolvers} = require("./graphql/index");

const app = express();
app.get("/",(req, res)=>{
  res.json({status: true})
})

dbStart().then(()=>{
    startApollo(typeDefs, resolvers, app).then().catch(err=>console.log(err))
})

