const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const UserModel = require('../../schema/UserSchema');

router.post('/authentication', async (req, res) => {
  try {
    const {Token } = req.body;

    // Find the user by userName
    jwt.verify(Token, 'your-secret-key', (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token has expired' });
          } else {
            return res.status(401).json({ success: false, error: 'Invalid token' });
          }
        } else {
      const userId = decoded.userId;
      console.log(userId);
      return res.status(200).json({ success: true, message: 'Token is valid' });
    }
}
    )

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
