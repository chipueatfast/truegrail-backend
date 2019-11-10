import { Router } from 'express';
import { FactoryController } from '~/controller/index';
import { RoleBasedMiddlewareGuard } from '~/middleware/index';


const factoryRouterForCreator  = Router();
const factoryRouter = Router();

factoryRouter
    .get('/:address/', FactoryController.getFactory);

factoryRouterForCreator
    .use(RoleBasedMiddlewareGuard('creator'))
    .post('/', FactoryController.addFactoryV2);

export default [factoryRouterForCreator, factoryRouter];

