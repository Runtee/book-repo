const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
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
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    bookImage: {
        type: String,
    },
    publisher: {
        type: String,
    },
    year: {
        type: String,
        required: true,
    },
    pages: {
        type: String,
    },
    categories: {
        type: [],
    },
    type: {
        type: String,
        required: true,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true,
    },
});

archiveSchema.index({
    title: "text",
    author: "text",
    publisher: "text",
    type: "text",
});
const Archive = mongoose.model("archive", archiveSchema);

module.exports = Archive;
