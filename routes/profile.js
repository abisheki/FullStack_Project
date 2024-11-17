const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/update', async (req, res) => {
  const { userId, address } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { address }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

module.exports = router;
