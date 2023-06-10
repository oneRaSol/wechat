const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Message = require('../models/message');

router.post('/message', async (req, res) => {
  const message = new Message({
    username: req.user.username,
    message: req.body.message
  });

  try {
    await message.save();
    res.status(201).json({ message: 'Message saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/message', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
