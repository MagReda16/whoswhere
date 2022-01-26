import { Router } from 'express';
// import * as userController from './controllers/user.controller';
import {
  register,
  login,
  getUser,
  updateLocation,
} from './controllers/user.controller';
import * as teamController from './controllers/team.controller';
import * as taskController from './controllers/task.controller';
import authMiddleware from './middleware/auth.middleware';

const router: Router = Router();

// user routes
router
  .post('/register', register)
  .post('/login', login)
  .get('/profile', authMiddleware, getUser)
  .put('/profile/location', authMiddleware, updateLocation);

// team routes
router.get('/team', authMiddleware, teamController.getTeam);
// task routes
router.post('/team/task', authMiddleware, taskController.addTask);

export default router;
