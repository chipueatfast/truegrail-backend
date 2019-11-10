import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';

import { createCorrespondingUserHash, generatePasswordHash } from '~/service/encryption';
import { executeSmartContractMethod } from '~/service/eos';

const getFactories = async (req, res) => {
    const rs = await sequelize.User.findAll({
        attributes: ['email', 'username', 'address'],
        where: {
            role: 'factory',
        },
    });
    res.json(rs).send();
}

const getFactory = async (req, res) => {
    const {
        params: {
            address,
        },
    } = req;

    const factory = await sequelize.Factory.find({
        where: {
            blockchainAddress: address,
        },
    });
    if (!factory) {
        res.sendStatus(404);
        return;
    }
    res.send(factory);
}

const addFactory = async (req, res) => {
    const {
        username,
        email,
        address,
        role,
        brand,
    } = req.body;

    // add to c user table
    const newFactory = await DatabaseService.createSingleRowAsync('User', {
        ...req.body,
        passwordHash: generatePasswordHash('1'),
    }, {
        email,
    });

    if (!newFactory.error) {
        const userHash = createCorrespondingUserHash({
            username,
            email,
            address,
            role,
            brand,
        });
        // add to smart contract
        await executeSmartContractMethod({
            method: 'upsertuser',
            namedParams: {
                user_id: newFactory.id,
                user_info_hash: userHash,
            },
        });
        res.status(201).json({
            id: newFactory.id,
        }).send();
        return;
    } else {
        const {
            error: {
                statusCode,
                message,
            },
        } = newFactory;
        res.status(statusCode).json({message}).send();
        return;
    }
    res.status(500).send();

}

export default {
    getFactories,
    getFactory,
    addFactory,
}
