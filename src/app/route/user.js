import { Router } from 'express';
import { UserController } from '~/controller/index';

const userRouter = Router();

userRouter
    .post('/signin/', UserController.signIn)
    .post('/', UserController.register)
    .get('/', UserController.retrievePublicInfo)
    .get('/ownership/:address/', UserController.getSneakerCollection)
    .patch('/restoration/:networkAddress/', UserController.restoreAccountByNetworkAddress)
    .patch('/', UserController.updateUserInfo);

export default userRouter;

