const express = require("express");
const router = express.Router();
const userControllers = require("./controllers/controller.user");
const authMiddleware = require("./middleware/auth");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.login);
router.get("/profile", authMiddleware, userControllers.showUserProfile);
router.get("/users", userControllers.getAllUsers);
router.put("/profile/location", authMiddleware, userControllers.updateLocation);
router.put("/profile/task", authMiddleware, userControllers.addTask);

module.exports = router;
