const mongoose = require("mongoose")
const poemdata = require("./schema")

const dblink = "mongodb+srv://gagan:9815926299@cluster0.o1akn.mongodb.net/poems"

const dbStart = () => {
    return mongoose
      .connect(dblink)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("Error connecting to database");
      });
  };

module.exports = {dbStart, poemdata};

  