import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/utils/database';

const getFactory = async (req, res) => {
    const {
        params: {
            address,
        },
    } = req;

    const factory = await sequelize.Factory.find({
        where: {
            blockchainAddress: address,
        }
    });
    if (!factory) {
        res.sendStatus(404);
        return;
    }
    res.send(factory);
}

const addFactory = async (req, res) => {
    const newFactory = await DatabaseService.createSingleRowAsync('Factory', req.body);
    if (newFactory) {
        res.sendStatus(201);
    }
}

export default {
    getFactory,
    addFactory,
}
