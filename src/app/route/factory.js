import { Router } from 'express';
import { FactoryController } from '~/controller/index';
import { RoleBasedMiddlewareGuard } from '~/middleware/index';


const factoryRouterForCreator  = Router();
const factoryRouter = Router();

factoryRouter
    .get('/', FactoryController.getFactories)
    .get('/:address/', FactoryController.getFactory);

factoryRouterForCreator
    .post('/',RoleBasedMiddlewareGuard('creator'))
    .post('/', FactoryController.addFactory);

export default [factoryRouterForCreator, factoryRouter];

