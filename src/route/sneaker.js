import { Router } from 'express';
import { SneakerController } from '~/controller';

const sneakerRouter = Router();

sneakerRouter
    .get('/:id', SneakerController.getSneaker)
    .post('/', SneakerController.handleIssueEvent)
    .patch('/ownership', SneakerController.handleTransferEvent)
    // .put('/testpush', SneakerController.testPusher)
;

export default sneakerRouter;
