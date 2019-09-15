import { Router } from 'express';
import { ContractController } from '~/controller';

const contractRouter = Router();

contractRouter
    .get('/', ContractController.getTrueGrailTokenContractAbi)
// .patch('/wei/:address', ContractController.sendMoneyToMember);

export default contractRouter;
