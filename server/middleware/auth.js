const jwt = require('jsonwebtoken');
const User = require('../models/model.user');

const authMiddleware = async (req, res, next) =>{
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.sendStatus(403);
  }
  const accessToken = authorization.split(' ')[1];

  try {
    const  { username }  = jwt.verify(accessToken, 'secret');
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);
    req.user = user
    next();
  } catch (error) {
    res.sendStatus(404);
    
  }
}

// we know we’ve got a access token
// in the resuest `Bearer wrgwrgrwgwr'
// we need access to just the token
// we then need to verify the token using jwt.verify
// we can then get the payload of the token, which in our case is the username
// we then need to check if this user exists in our db
// if they dont send an error back
// if they do attach the user to request and call next()


module.exports = authMiddleware;