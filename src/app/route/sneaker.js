import { Router } from 'express';
import { SneakerController } from '~/controller/index';

const sneakerRouter = Router();

sneakerRouter
    .get('/:id/', SneakerController.getSneaker)
    .post('/eos/', SneakerController.createSneakerClaimAccount)
    // .post('/', SneakerController.handleIssueEvent)
    // .patch('/ownership', SneakerController.handleTransferEvent)
    // .put('/testpush', SneakerController.testPusher)
;

export default sneakerRouter;
