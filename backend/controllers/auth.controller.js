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
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
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
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const token = createToken(user._id);
      const { password: pass, ...rest } = user._doc;
      console.log("ima from signin ", rest);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = createToken(user._id);
      const { password: pass, ...rest } = user._doc;
      console.log("ima from signin ", rest);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


export const signOut = async (req, res, next) => {
  try {
   res.clearCookie('access_token');
   res.status(200).json('User has been logged out!')
  } catch (error) {
    next(error)
  }
}