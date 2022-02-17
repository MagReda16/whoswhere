import { Router } from 'express';
import * as userController from './controllers/user.controller';
import * as teamController from './controllers/team.controller';
import * as taskController from './controllers/task.controller';
import authMiddleware from './middleware/auth.middleware';

const router: Router = Router();

// user routes
router
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/profile', authMiddleware, userController.getUser)
  .put('/profile/location', authMiddleware, userController.updateLocation)
  .put('/profile/checkin', authMiddleware, userController.updateCheckin);

// team routes
router
  .get('/team', authMiddleware, teamController.getTeam)
  .post('/task', authMiddleware, taskController.addTask);

export default router;
