const express = require('express');
const router = express.Router();
const userControllers = require('./controllers/controller.user');
const teamControllers = require('./controllers/controller.team');
const authMiddleware = require('./middleware/auth')

router.get('/users', userControllers.getAllUsers);
router.get('/profile', authMiddleware, userControllers.showUserProfile);
router.post('/login', userControllers.logIn);
router.post('/register', userControllers.registerUser);
router.put('/profile', authMiddleware, userControllers.updateProfile);
router.get('/users', userControllers.getUser);

router.get('/teams', teamControllers.getAllTeams);
router.get('/myteam', teamControllers.showMyTeam);
router.post('/teams', teamControllers.createNewTeam);
router.put('/addmember', teamControllers.addTeamMember);
router.delete('/teams', teamControllers.deleteTeam);


module.exports = router;