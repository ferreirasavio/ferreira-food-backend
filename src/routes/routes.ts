import { Router } from 'express'
import StoreController from '../controllers/StoreController'
import UsersController from '../controllers/UsersControler';

const routes = Router()
const roomsController = new StoreController();
const usersController = new UsersController();

routes.get('/store', roomsController.index)
routes.post('/store', roomsController.create)
routes.delete('/store', roomsController.remove)

routes.post('/users/signup', usersController.create)
routes.post('/users/signin', usersController.login)

export default routes