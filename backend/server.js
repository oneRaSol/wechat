var app = require("express")();
var http = require("http").Server(app);
const mongoose = require("mongoose");
const ChatData = require("./model/models");

//below line creates a new socket.io instance attached to the http server.
var io = require("socket.io")(http);
var username;
var usermessage;
// Connecting to DB
mongoose
  .connect("mongodb://localhost:27017/ChatDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/user.html");
});

users = [];
//Whenever someone connects this gets executed
//The io.on is event handler that handles connection, disconnection, etc., events in it,
//using the socket object.
io.on("connection", function (socket) {
  console.log("A user connected");
  // setUsername sets the name of the user that has entered the Chat Room.
  //whenever server uses socket.on ,client responds with socket.emit and vice versa
  //In below line client has first used socket.emit in line no 9 of user.html and server will respond to it by responding to that event in below line
  socket.on("setUsername", function (data) {
      username = data;

    // The indexOf() method returns the position of the first occurrence of a value in a string.
    // The indexOf() method returns -1 if the value is not found.
    if (users.indexOf(data) > -1) {
      // socket.emit allows you to emit or fire events on the server and client
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      //push method is used to add data into users array
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });
  socket.on("msg", function (data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
    usermessage = data;
    
    let newChatData = new ChatData({
      Username: usermessage.user,
      message: usermessage.message,
    });
   
    newChatData
      .save()
      .then((ChatData) => {
        console.log("ChatData added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
http.listen(3000, function () {
  console.log("app listening at http://localhost:3000");
});
