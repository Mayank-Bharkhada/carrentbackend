const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../schema/UserSchema');

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by userName
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({success: false, error: 'Invalid password' });
    }

    // If the password is valid, create and send a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: 3600 });


    res.status(200).json({success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
