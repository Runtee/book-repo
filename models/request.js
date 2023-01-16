const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    text_language: {
        type: String,
        required: [true, "language is required"],
    },
    publisher: {
        type: String,
    },
    year: {
        type: String,
        required: true,
    },
    
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
