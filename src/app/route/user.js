import { Router } from 'express';
import { UserController } from '~/controller/index';
import { IdGuardMiddlewareGuard, OauthMiddlewareGuard } from '~/middleware/index';

const userRouter = Router();

userRouter
    .patch('/password/:userId/', OauthMiddlewareGuard)
    .patch('/password/:userId/', IdGuardMiddlewareGuard('userId'))
    .patch('/password/:userId/', UserController.changePassword)
    .get('/password/default/:userId/', OauthMiddlewareGuard)
    .get('/password/default/:userId/', IdGuardMiddlewareGuard('userId'))
    .get('/password/default/:userId/', UserController.isUsingDefaultPassword)
    .get('/duplicate/', UserController.getIsUserIdExisting)
    .post('/signin/', UserController.signIn)
    .post('/', UserController.register)
    .get('/', UserController.retrievePublicInfo)
    .get('/eos/:eosName/', UserController.getPublicInfoByEosName)
    .get('/userIdentity/:userIdentity/', UserController.getPublicInfoByUserIdentity)
    .get('/ownership/:address/', UserController.getSneakerCollection)
    .patch('/restoration/:networkAddress/', UserController.restoreAccountByNetworkAddress)
    
    .get('/collector/:userId/', UserController.getCollectorById)
    .patch('/collector/:userId', OauthMiddlewareGuard)
    .patch('/collector/:userId/', IdGuardMiddlewareGuard('userId'))
    .patch('/collector/:userId/', UserController.updateUserInfo);

export default userRouter;

