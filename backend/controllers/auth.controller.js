import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler  from "../utils/error.js";
import createToken from './authorization/jwt.token.js'

const signup = async (req, res, next) => {
  console.log("heeloo iam from signup")
  const { username, email, password } = req.body;
  try {
    const newUser = await User.findOne({username})
    if(newUser){
      next(errorHandler(550, 'userallready exits'))
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    console.log('new user created')
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(errorHandler(550, 'error from the function'))
  }
};

const signin = async(req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findone({email});
  if (!validUser) {
    return next(errorHandler(404, "user not found!"));
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
  const token = createToken(validUser._id);
  const { password: pass, ...rest } = validUser._doc;
  res 
    .cookie('access_token', token, { httpOnly:true})
    .status(200)
    .json(rest);  
  } catch (error) {
    next(error)
  }
  
  
}



export default signup;
