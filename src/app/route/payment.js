import { Router } from 'express';
import { PaymentController } from '~/controller/index';
import { OauthMiddlewareGuard } from '~/middleware/index';

const paymentRouter = new Router();

paymentRouter
    .use('/', OauthMiddlewareGuard)
    .get('/token/:customerId/', PaymentController.getClientToken)
    .post('/transaction/', PaymentController.createTransaction)

export default paymentRouter;



