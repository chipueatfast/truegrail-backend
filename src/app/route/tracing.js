import { Router } from 'express';
import { TracingController } from '~/controller/index';

const tracingRouter = Router();

tracingRouter.post('/', TracingController.fetchDetailOfTransaction)

export default tracingRouter;

