import DatabaseService from '~/service/database';
// import { listenToEventOnBlockchain } from '~/service/blockchain';
import { Op } from 'sequelize';
import { createNewEosAccount } from '~/service/eos';
import { sequelize } from '~/sequelize/models/index';
import { sendFCM } from '~/service/fcm';

async function createSneakerClaimAccount({
    claimPublicKey,
    claimEosName,
}) {
    const claimAccount = await createNewEosAccount({
        publicKey: claimPublicKey,
        eosName: claimEosName,
    });

    if (claimAccount.error) {
        return [claimAccount.error];
    }

    return [null, claimAccount];
}

const issueSneaker = async (req, res) => {
    const {
        factoryId,
    } = req.params;
    const {
        id,
        claimEosName,
        claimPublicKey,
        model,
        limitedEdition,
        brand,
        colorway,
        size,
        releaseDate,
        furtherSpec,
    } = req.body;


    if (!(claimEosName &&
        claimPublicKey &&
        model &&
        brand &&
        colorway &&
        size &&
        releaseDate &&
        furtherSpec
    )) {
        return res.status(400).send({
            message: 'not_fulfilled',
        })
    }
    const [err] = await createSneakerClaimAccount({
        claimEosName,
        claimPublicKey,
    });
    if (err) {
        return res.send(500).send(err);
    }
    const newSneaker = await DatabaseService.createSingleRowAsync(
        'Sneaker',
        {
            id,
            model,
            limitedEdition,
            brand,
            factoryId,
            colorway,
            size,
            releaseDate,
            furtherSpec,
        }, {
            id,
        }
    );
    if (newSneaker.error) {
        const {
            error: {
                statusCode,
                message,
            },
        } = newSneaker;
        res.status(statusCode).json({message}).send();
        return;
    };
    return res.status(201).send();
}

const getIssuedSneakers = async (req, res) => {
    const {
        factoryId, 
    } = req.params;
    const sneakers = await sequelize.Sneaker.findAll({
        where: {
            factoryId,
        },
    });
    return res.send({
        sneakers,
    });
}

const getSneakerById = async (req, res) => {
    const sneaker = await DatabaseService.getRowBySingleValueAsync('Sneaker', 'id', req.params.id);
    
    if (sneaker) {
        const filteredSneaker = {
            id: sneaker.id,
            factoryId: sneaker.factoryId,
            brand: sneaker.brand,
            model: sneaker.model,
            size: sneaker.size,
            colorway: sneaker.colorway,
            limitedEdition: sneaker.limitedEdition,
            releaseDate: sneaker.releaseDate,
        };


        const factory = await DatabaseService.getRowBySingleValueAsync('User', 'id', filteredSneaker.factoryId);
        if (!factory) {
            return res.status(500).send();
        }
        
        res.send({
            detail: filteredSneaker,
            factory,
        });

        return;
    }
    return res.sendStatus(404);
};

const fetchCollection = async (req, res) => {
    const {
        sneakerIdList,
    } = req.body;
    
    const collection = await sequelize.Sneaker.findAll({
        where: {
            id: {
                [Op.in]: sneakerIdList,
            },
        },
    })
    return res.send({
        collection,
    });
}

const notifySneaker = async (req, res) => {
    const {
        sneaker_id,
        new_owner_id,
    } = req.body;
    const buyerUser = await sequelize.User.findOne({
        where: {
            id: new_owner_id,
        },
    });
    const mentionedSneaker = await sequelize.Sneaker.findOne({
        where: {
            id: sneaker_id,
        },
    });
    sendFCM(
        buyerUser.fcmToken, {
            title: 'New asset added to your collection',
            body: `Check out your new ${mentionedSneaker.model}(size ${mentionedSneaker.size})`,
        }, mentionedSneaker);
    return res.status(204).send();
}

// await sequelize.User.update({
//     fcmToken,
// },{
//     where: {
//         id,
//     },
// });

const toggleVisibility = async (req, res) => {
    const {
        sneakerId,
    } = req.params;

    const {
        isVisible,
    } = req.body;

    if (isVisible !== 0 && isVisible !== 1) {
        return res.send(400).json({
            message: 'EMPTY_FIELD',
        })
    }

    const rs = await sequelize.Sneaker.update({
        isVisible,
    }, {
        where: {
            id: sneakerId,
        },
    });
    if (rs && rs[0]) {
        return res.send(204);
    }
    return res.send(500);
}

const getAvailableTrade = async (req, res) => {
    const availableTrade = await sequelize.Sneaker.findAll({
        where: {
            isVisible: 1,
        },
    });

    const reformatted = availableTrade.map(el => ({
        sneakerInfo: el,
    }))

    if (availableTrade) {
        return res.send({
            availableTrade: reformatted,
        })
    }

    return res.send(500);
}

export default {
    getSneakerById,
    issueSneaker,
    fetchCollection,
    notifySneaker,
    getIssuedSneakers,
    toggleVisibility,
    getAvailableTrade,
};
