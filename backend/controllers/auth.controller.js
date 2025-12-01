import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import { createToken } from "./authorization/jwt.token.js";

export const signup = async (req, res, next) => {
  console.log("heeloo iam from signup");
  const { username, email, password } = req.body;
  try {
    const newUser = await User.findOne({ username });
    if (newUser) {
      return next(errorHandler(550, "userallready exits"));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    console.log("new user created");
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(errorHandler(550, "error from the function"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found!"));
    }
    const validPassword = await bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const token = createToken(validUser._id);
    console.log(token);

    const { password: pass, ...rest } = validUser._doc;
    console.log("ima from signin ", rest);
    res
      .cookie("access_token", token, { 
        httpOnly: true,
        secure: true,
        sameSite: "none"
        })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
