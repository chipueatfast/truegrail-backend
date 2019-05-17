import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';


const getContract = async (req, res) => {
    const contract = await DatabaseService.getRowBySingleValueAsync('Contract', 'name', req.params.name);
    if (!contract) {
        res.sendStatus(404);
        return;
    }
    return res.send(contract);
}

const createOrUpdateContract = async (req, res) => {
    const existingContract = await DatabaseService.getRowBySingleValueAsync('Contract', 'name', req.body.name);
    if (!existingContract) {
        const newContract = await DatabaseService.createSingleRowAsync('Contract', req.body);
        if (newContract) {
            res.sendStatus(201);
            return;
        }
    }

    try {
        existingContract.update({
            jsonContent: req.jsonContent,
        }).then(() => res.sendStatus(203));
        return;
    } catch (e) {
        res.sendStatus(500);
    }
}

const getContractCreator = async (req, res) => {
    const contract = await sequelize.Contract.find({
        where: {
            name: req.params.contractName,
        }, 
        attributes: ['creator'],
    });
    if (!contract) {
        res.sendStatus(404);
        return;
    }
    return res.send({
        creator: contract.creator,
    })
}

export default {
    getContract,
    createOrUpdateContract,
    getContractCreator,
}