const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  id: {
    "type": Number
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  roomId: {
    2: {
      type: String,
      required: true
    },
    3: {
      type: String,
      required: true
    },
    4: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
});



module.exports = mongoose.model('Members', messagesSchema);

