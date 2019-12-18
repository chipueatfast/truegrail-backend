import { Router } from 'express';
import { PaymentController } from '~/controller/index';
import { OauthMiddlewareGuard } from '~/middleware/index';

const paymentRouter = new Router();

paymentRouter
    .use('/', OauthMiddlewareGuard)
    .get('/token/:userId/', PaymentController.getClientToken)
    .post('/transaction/:userId/', PaymentController.createTransaction)

export default paymentRouter;



