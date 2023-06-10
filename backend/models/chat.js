//The below code imports the schema to index.js from models.js .
const mongoose = require('mongoose')

// Schema for ChatData
const chatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

//Creating the collection ChatData
const ChatData = mongoose.model('ChatData', chatSchema)

module.exports = Chat;
