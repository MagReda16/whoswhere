const jwt = require("jsonwebtoken");
const User = require("../models/model.user");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error();
    const accessToken = authorization.split(" ")[1];
    const { username } = jwt.verify(accessToken, JWT_SECRET);
    const user = await User.findOne({ username });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: "403", message: "Unauthorized request" });
  }
};

// we know we’ve got a access token
// in the resuest `Bearer wrgwrgrwgwr'
// we need access to just the token
// we then need to verify the token using jwt.verify
// we can then get the payload of the token, which in our case is the username
// we then need to check if this user exists in our db
// if they dont send an error back
// if they do attach the user to request and call next()

module.exports = authMiddleware;
