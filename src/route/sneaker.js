import { Router } from 'express';
import { SneakerController } from '~/controller';

const sneakerRouter = Router();

sneakerRouter
    .get('/:id', SneakerController.getSneaker)
    .post('/', SneakerController.addSneaker)
    .patch('/ownership', SneakerController.changeOwnership)
    .put('/testpush', SneakerController.testPusher)
;

export default sneakerRouter;
