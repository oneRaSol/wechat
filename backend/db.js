const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/member-team-chat';

mongoose.connect('mongodb://127.0.0.1:27017/member-team-chat', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Mongoose');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

// const messagesSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const chatSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });


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



const Members = mongoose.model('members', memberSchema);
// const Messages = mongoose.model('messages', messagesSchema);
// const Chat = mongoose.model('chat', chatSchema);

// module.exports = { Messages, Chat, Members };
module.exports = {  Members };
