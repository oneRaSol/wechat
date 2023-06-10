const { Messages, Chat, Members } = require('../db');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', (req, res) => {
  res.send('This works...');
});

  router.get('/members', function(req, res, next) {
    Members.find({}).then(function (members) {
      console.log('Members retrieved successfully:', members);
      res.send(members);
      });
     });


module.exports = router;


