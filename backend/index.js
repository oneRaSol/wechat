const { Messages, Chat, Members } = require('./db');
const ChatData = require("./models/chatmessages");

const winston = require('winston');
const { logRequests, logErrors } = require('./log-middle-winston');

const bodyParser = require('body-parser');
const cors = require('cors');

let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

// Use the logger middleware
app.use(logRequests);
app.use(logErrors);

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

// Setup the Manager and supervisors for chat collection
const team_member = [
  {
    id: 1,
    name: 'The Manager',
    phone: '9876598765',
    image: 'assets/user/user-1.png',
    roomId: {
      2: 'room-1',
      3: 'room-2',
      4: 'room-3',
    },
    timestamp: new Date(),
  },
  {
    id: 2,
    name: 'Supervisor-1',
    phone: '9876543210',
    image: 'assets/user/user-2.png',
    roomId: {
      2: 'room-1',
      3: 'room-4',
      4: 'room-5',
    },
    timestamp: new Date(),
  },
  {
    id: 3,
    name: 'Supervisor-2',
    phone: '9988776655',
    image: 'assets/user/user-3.png',
    roomId: {
      2: 'room-2',
      3: 'room-4',
      4: 'room-6',
    },
    timestamp: new Date(),
  },
  {
    id: 4,
    name: 'Supervisor-3',
    phone: '9876556789',
    image: 'assets/user/user-4.png',
    roomId: {
      2: 'room-3',
      3: 'room-5',
      4: 'room-6',
    },
    timestamp: new Date(),
  },
];

Members.insertMany(team_member)
  .then(() => {
    console.log('Members inserted successfully');

  //   Members.find()
  //     .then(members => {
  //       console.log('Members retrieved successfully:', members);
  //     })
  //     .catch(error => {
  //       console.log('Error retrieving members:', error);
  //     });
  // })
  // .catch(error => {
  //   console.log('Error inserting members:', error);
  });

// Routes
// const messagesRoute = require('./routes/messages');
const membersRoute = require('./routes/members');

// app.use('/messages', messagesRoute);
app.use('/members', membersRoute);


let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', socket => {
  console.log('A user connected');
  socket.on('join', data => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', data => {
    io.in(data.room).emit('new message', {
      user: data.user,
      message: data.message,
    });

    usermessage = data;

    let newChatData = new ChatData({
      Username: usermessage.user,
      message: usermessage.message,
      phone: usermessage.phone,
      room: usermessage.room,
    });

    newChatData
      .save()
      .then((ChatData) => {
        console.log("Chat_Message-Data added");
      })
      .catch((err) => {
        console.log(err);
      });
  });

    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });

    // console.log('Message received');

    // // Test the Chat collection

    // const chat = new Messages(data);
    // chat
    //   .save()
    //   .then(() => {
    //     console.log('Chat saved successfully');
    //   })
    //   .catch(error => {
    //     console.log('Error saving chat:', error);
    //   });
    // }),
  })

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
