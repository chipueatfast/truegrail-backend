import DatabaseService from '~/service/database';
// import { listenToEventOnBlockchain } from '~/service/blockchain';
import { Op } from 'sequelize';
import { createNewEosAccount } from '~/service/eos';
import { sequelize } from '~/sequelize/models/index';
import { sendFCM } from '~/service/fcm';
// import { sendFCM } from '~/service/fcm';
 
// const changeOwnership = async (req, res) => async (resolve, returnedValues) => {
//     const retrieveUser = DatabaseService.getRowBySingleValueAsync('User', 
//         'networkAddress', 
//         req.body.newAddress.toLowerCase());
//     const retrieveSneaker = DatabaseService.getRowBySingleValueAsync('Sneaker', 
//         'id', 
//         req.body.sneakerId);
    
//     const [user, sneaker] = await Promise.all([retrieveUser, retrieveSneaker]);
//     if (sneaker) {
//         try {
//             const oldOwner = sneaker.email;
//             sneaker.update({
//                 ownerAddress: req.body.newAddress,
//             }).then((newSneaker) => {
//                 if (user && user.registrationToken) {

//                     sendFCM(user.registrationToken, { 
//                         title: 'Change of ownership',
//                         body: `${user.email} is now the owner of ${newSneaker.model} size ${newSneaker.size}US`,  
//                     });
//                 }
//                 resolve(203);
//             });
//         } catch {
//             resolve(500);
//         }
//         return;
//     }
//     resolve(400);
// }


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
    } = req.body;


    if (!(claimEosName &&
        claimPublicKey &&
        model &&
        brand &&
        colorway &&
        size &&
        releaseDate
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
    console.log('fetch collection');
    
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
    sendFCM(buyerUser.fcmToken, {
        title: 'New asset added to your collection',
        body: `Check out your new ${mentionedSneaker.model}(size ${mentionedSneaker.size})`,
    }, mentionedSneaker);
    return res.status(204).send();
}

export default {
    getSneakerById,
    issueSneaker,
    fetchCollection,
    notifySneaker,
};
