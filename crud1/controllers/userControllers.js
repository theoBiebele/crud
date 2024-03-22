import User from "../model/user.model.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try{
        const {name, username, password, sex, email} = req.body;
        if(!name | !email | !username | !sex | !password) {
            res.status(409).json({
                success: false,
                message: "All required feilds needed.",
              });
        return;          
        }

        //check for already existing email

        const existingEmail = await User.findOne({email: req.body.email}).exec()
        const existingUsername = await User.findOne({username: req.body.username}).exec()

        if(existingEmail){
            res.status(409).json({
                success: false,
                message: "Email already in use, choose another.",
              });
        return;    
        }
        
        if(existingUsername){
            res.status(409).json({
                success: false,
                message: "Username already in use, choose another.",
              });
              return;    
        }

        //password encryption here
        const salt = await bcrypt.genSalt(15)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({password: 
            encryptedPassword, 
            name, 
            username, 
            sex,
            email,
        });

        res.status(201).json({
          success: true,
          message: "User Registered successfully.",
          newUser,
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: "User Not Created.",
          error: error.message,
        });
      }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  // check if email is valid in the database
  const validEmail = await User.findOne({email}).exec();
  
  if (!validEmail) {
      return res.status(404).json({
          success: false,
          message: "Invalid credentials.",
      });
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(password, validEmail.password);
  
  if (!validPassword) {
      return res.status(401).json({
          success: false,
          message: "Invalid credentials.",
      });
  }
  
  // we will generate our access token 
  const accessToken = jwt.sign({
      access1: validEmail.username,
      access2: validEmail
  }, process.env.BLABLA, {
      expiresIn: '5m',
  });
  
  // refresh token
  const refreshToken = jwt.sign({
      access1: validEmail.username,
      access2: validEmail._id
  }, process.env.BLABLA, {
      expiresIn: '1d',
  });
  
  // Set cookies
  res.cookie('hellobro', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 60 * 1000
  });
  
  res.cookie('hellobro_refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
  
  // Send response
  return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      refreshToken,
      accessToken
  });
}
//   const validateToken = async (req, res) => {
//     const cookies= req.cookie;
// // show cookies
// console.log(cookies);
// };


export {register, login};