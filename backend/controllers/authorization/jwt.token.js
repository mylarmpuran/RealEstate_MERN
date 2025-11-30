import jwt from "jsonwebtoken";

const createToken = (userId) => {
    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
};




const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;      // so you can use req.user.id in routes
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default (verifyToken, createToken);