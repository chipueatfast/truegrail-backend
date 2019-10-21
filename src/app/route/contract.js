import { Router } from 'express';
import { ContractController } from '~/controller/index';

const contractRouter = Router();

contractRouter
    .get('/', ContractController.getTrueGrailTokenContract)
// .patch('/wei/:address', ContractController.sendMoneyToMember);

export default contractRouter;
