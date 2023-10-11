const express = require('express');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const router = express.Router();

const jwt = require('jsonwebtoken');
const UserModel = require('../../schema/UserSchema');

//call through /api/User/Signup

  // Function to generate an OTP (replace with your OTP generation logic)
  function generateOTP() {
    // Implement OTP generation logic (e.g., a random 6-digit number)
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
router.post("/Signup_sent_otp",async (req,res) => {
    try {
       
        const otp = generateOTP(); 
        const accountSid = 'ACcc1ef5d5ab73d30aa965d381a283640b'; // Your Twilio account SID
        const authToken = '9646ffc4bebc2eafa08642535dda07da'; // Your Twilio auth token
        const client = twilio(accountSid, authToken);
      
      
    
       client.messages
          .create({
            body: `Your OTP is ${otp}`,
            from: '+15878033738', // Your Twilio phone number
            to: `${req.body.number}`,
          })
          .then(async(message) => {
            console.log(message.sid);
            const saltRounds = 10;
            const otpHash = await bcrypt.hash(otp, saltRounds);
        
            res.status(201).json({success: true, Data:req.body, Otp : otpHash});
          })
          .catch((error) => {
            console.log(error)
              console.log()
            res.status(202).json({success: false, error: "Error sending OTP"});
          });
  
            
        } catch (error) {
          console.log(error);
          res.status(500).send({success: false, error: error});
        }
  });

  router.post("/Signup_register",async (req,res) => {
    try {
       
        const { userName, email, number, password, enterdOtp, hashOtp } = req.body;

        // Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        bcrypt.compare(enterdOtp, hashOtp, async (err, isMatch) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              res.status(202).send({success:false, error: "Error Please try again later"})
            } else if (isMatch) {
                const user = new UserModel({
                    userName,
                    email,
                    number,
                    password: passwordHash
                  });
              
                  // Save the user to the database
                  await user.save();

                  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: 20 });

                  res.status(200).json({ success: true, token });
            } else {
              // Passwords do not match, authentication failed
              console.log('Password is incorrect');
              res.status(202).send({success:false, error: "Error Please try again later"})
            }
          });
    
        } catch (error) {
          console.log(error);
          res.status(500).send({success:false, error: "Error Please try again later"})
        }
  });
  
  


  module.exports = router;
