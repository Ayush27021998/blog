var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: String
});

module.exports = mongoose.model('post',postSchema);