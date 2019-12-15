import { Router } from 'express';
import { SneakerController } from '~/controller/index';
import { OauthMiddlewareGuard, IdGuardMiddlewareGuard } from '~/middleware/index';

const sneakerRouter = Router();

sneakerRouter
    .get('/:id/', SneakerController.getSneakerById)
    .use('/factory/', OauthMiddlewareGuard)
    .post('/factory/:factoryId/', IdGuardMiddlewareGuard('factoryId'))
    .post('/factory/:factoryId/', SneakerController.issueSneaker)

    .use('/collection/', OauthMiddlewareGuard)
    .post('/collection/:userId/', IdGuardMiddlewareGuard('userId'))
    .post('/collection/:userId/', SneakerController.fetchCollection)

    .use('/fcm/notification/', OauthMiddlewareGuard)
    .post('/fcm/notification/', SneakerController.notifySneaker)
    // .post('/', SneakerController.handleIssueEvent)
    // .patch('/ownership', SneakerController.handleTransferEvent)
    // .put('/testpush', SneakerController.testPusher)
;

export default sneakerRouter;
