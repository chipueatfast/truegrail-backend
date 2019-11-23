import { sequelize } from '~/sequelize/models';

const getFactories = async (req, res) => {
    const rs = await sequelize.User.findAll({
        where: {
            role: 'factory',
        },
    });
    return res.json({
        factories: rs,
    }).send();
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

const addFactory = async () => {
}

export default {
    getFactories,
    getFactory,
    addFactory,
}
