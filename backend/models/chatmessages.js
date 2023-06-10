//The below code is models.js .
const mongoose = require('mongoose')

// Schema for ChatData
const ChatSchema = mongoose.Schema({
	Username: {
		type: String,
		required: false
	},
	message: {
		type: String,
		required: false
	},
  room: {
		type: String,
		required: false
	},
  phone: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

//Creating the collection ChatData
const ChatData = mongoose.model('ChatData', ChatSchema)

module.exports = ChatData;
