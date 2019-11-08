import { Router } from 'express';
import { UserController } from '~/controller/index';

const userRouter = Router();

userRouter
    .all('/signin/', UserController.signIn)
    .post('/', UserController.register)
    .get('/', UserController.retrievePublicInfo)
    .get('/ownership/:address/', UserController.getSneakerCollection)
    .patch('/restoration/:networkAddress/', UserController.restoreAccountByNetworkAddress);

export default userRouter;

