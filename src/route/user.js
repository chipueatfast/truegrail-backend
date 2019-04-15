import { Router } from 'express';
import { UserController } from '~/controller';

const userRouter = Router();

userRouter
    .post('/', UserController.register)
    .get('/', UserController.retrievePublicInfo)
    .get('/ownership/:address', UserController.getSneakerCollection);

export default userRouter;

