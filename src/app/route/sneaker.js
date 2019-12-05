import { Router } from 'express';
import { SneakerController } from '~/controller/index';
import { OauthMiddlewareGuard, IdGuardMiddlewareGuard } from '~/middleware/index';

const sneakerRouter = Router();

sneakerRouter
    .get('/:id/', SneakerController.getSneaker)
    .use('/eos/', OauthMiddlewareGuard)
    .post('/eos/:factoryId/', IdGuardMiddlewareGuard('factoryId'))
    .post('/eos/:factoryId/', SneakerController.createSneakerClaimAccount)
    // .post('/', SneakerController.handleIssueEvent)
    // .patch('/ownership', SneakerController.handleTransferEvent)
    // .put('/testpush', SneakerController.testPusher)
;

export default sneakerRouter;
