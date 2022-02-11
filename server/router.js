const express = require("express");
const router = express.Router();
const userControllers = require("./controllers/user.controller");
const taskControllers = require('./controllers/task.controller');
const teamControllers = require('./controllers/team.controller');
const authMiddleware = require("./middleware/auth");

// user routes
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.login);
router.get("/profile", authMiddleware, userControllers.getUser);
router.put("/profile/location", authMiddleware, userControllers.updateLocation);

// team routes
router.get("/team", authMiddleware, teamControllers.getTeam);
// task routes
router.post("/team/task", authMiddleware, taskControllers.addTask);

module.exports = router;
