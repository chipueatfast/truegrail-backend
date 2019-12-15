import { Router } from 'express';
import { PaymentController } from '~/controller/index';

const paymentRouter = new Router();

paymentRouter
    .get('/token/:customerId/', PaymentController.getClientToken)
    .post('/transaction/', PaymentController.createTransaction)

export default paymentRouter;



