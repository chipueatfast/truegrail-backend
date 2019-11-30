import { Router } from 'express';
import { UserController } from '~/controller/index';
import { IdGuardMiddlewareGuard, OauthMiddlewareGuard } from '~/middleware/index';

const userRouter = Router();

userRouter
    .post('/signin/', UserController.signIn)
    .post('/', UserController.register)
    .get('/', UserController.retrievePublicInfo)
    .get('/ownership/:address/', UserController.getSneakerCollection)
    .patch('/restoration/:networkAddress/', UserController.restoreAccountByNetworkAddress)
    
    .use('/collector/:userId', OauthMiddlewareGuard)
    .patch('/collector/:userId/', IdGuardMiddlewareGuard('userId'))
    .patch('/collector/:userId/', UserController.updateUserInfo);

export default userRouter;

