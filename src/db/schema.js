const mongoose = require("mongoose");

const poemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
    ,
    content: {
        type: String,
        required: true
    }
})


const poemdata = mongoose.model("allpoems", poemSchema, "allpoems");

module.exports = poemdata;
