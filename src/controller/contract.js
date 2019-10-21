import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';
import BlockchainService from '~/service/blockchain';


const getTrueGrailTokenContract = async (req, res) => {
    const trueGrailTokenContract = require('~/config/TrueGrailToken.json');
    if (!trueGrailTokenContract) {
        res.sendStatus(404);
        return;
    }
    return res.send(trueGrailTokenContract);
}

const sendMoneyToMember = async(req, res) => {
    const {
        address,
    } = req.params;

    const result = await BlockchainService.sendWei(address);
    res.sendStatus(Boolean(result) ? 204: 500);
}


export default {
    getTrueGrailTokenContract,
    sendMoneyToMember,
}