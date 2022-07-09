const express = require("express")
const {dbStart} = require("./db/db");
const path = require("path")
const {startApollo, typeDefs, resolvers} = require("./graphql/index");

const app = express();
app.use(express.static(path.join(__dirname + "/build")))
app.get("/",(req, res)=>{
  res.sendFile(path.join(__dirname, "./build/index.html"))
})


dbStart().then(()=>{
    startApollo(typeDefs, resolvers, app).then().catch(err=>console.log(err))
})


