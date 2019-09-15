import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';
import BlockchainService from '~/service/blockchain';


const getTrueGrailTokenContractAbi = async (req, res) => {
    const trueGrailTokenContractAbi = require('~/config/TrueGrailToken.json');
    if (!trueGrailTokenContractAbi) {
        res.sendStatus(404);
        return;
    }
    return res.send(trueGrailTokenContractAbi);
}

const sendMoneyToMember = async(req, res) => {
    const {
        address,
    } = req.params;

    const result = await BlockchainService.sendWei(address);
    res.sendStatus(Boolean(result) ? 204: 500);
}


export default {
    getTrueGrailTokenContractAbi,
    sendMoneyToMember,
}