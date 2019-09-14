import { Router } from 'express';
import { FactoryController } from '~/controller';


const factoryRouter = Router();

factoryRouter
    .post('/', FactoryController.addFactory)
    .get('/:address', FactoryController.getFactory);

export default factoryRouter;

