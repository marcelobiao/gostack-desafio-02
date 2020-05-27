import { Router } from 'express';

import Users from './app/models/Users';
import Recipients from './app/models/Recipients';

import SessionController from './app/controllers/SessionController';
import UsersController from './app/controllers/UserController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';


const routes = new Router();

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users/:userId', UsersController.update);
routes.delete('/users/:userId', UsersController.delete);

routes.post('/session', SessionController.store);

routes.use(AuthMiddleware);
routes.get('/', AuthMiddleware, async (req, res) => {
  res.json({success: true});
});

export default routes;
