import { Router } from 'express';
import { ContractController } from '~/controller';

const contractRouter = Router();

contractRouter
    .get('/:name', ContractController.getContract)
    .post('/', ContractController.createOrUpdateContract)
    .get('/creator/:contractName', ContractController.getContractCreator);
// .patch('/wei/:address', ContractController.sendMoneyToMember);

export default contractRouter;
