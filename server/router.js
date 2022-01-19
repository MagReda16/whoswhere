const express = require('express');
const router = express.Router();
const userControllers = require('./controllers/controller.user');
const authMiddleware = require('./middleware/auth')

router.get('/users', userControllers.getAllUsers);
router.get('/profile', authMiddleware, userControllers.showUserProfile);
router.post('/login', userControllers.logIn);
router.post('/register', userControllers.registerUser);
router.put('/profile/location', authMiddleware, userControllers.updateLocation);
router.put('/profile/task', authMiddleware, userControllers.addTask)




module.exports = router;