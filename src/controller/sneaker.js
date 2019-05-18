import hash from 'object-hash';
import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';
import blockchainService from '~/service/blockchain';
// import pusher from '~/utils/pusher';

// const testPusher = async () => {
//     pusher.trigger('long', 'test', {
//         message: 'di choi k em',
//     });
// }
 
const changeOwnership = async (req, res) => async (resolve, returnedValues) => {
    const sneaker = await DatabaseService.getRowBySingleValueAsync('Sneaker', 'id', req.body.sneakerId);
    if (sneaker) {
        try {
            sneaker.update({
                ownerAddress: req.body.newAddress,
            }).then(() => resolve(203));
        } catch {
            resolve(500);
        }
        return;
    }
    resolve(400);
}

const getSneaker = async (req, res) => {
    const sneaker = await DatabaseService.getRowBySingleValueAsync('Sneaker', 'id', req.params.id);
    if (sneaker) {
        const filteredSneaker = {
            brand: sneaker.brand,
            model: sneaker.model,
            colorway: sneaker.colorway,
            id: sneaker.id,
            condition: sneaker.condition,
            releaseDate: sneaker.releaseDate,
            limitedEdition: sneaker.limitedEdition,
            size: sneaker.size,
            ownerAddress: sneaker.ownerAddress,
        };

        // get owner infomation 
        let owner;
        if (filteredSneaker.condition === 'issued') {
            const factory = await DatabaseService.getRowBySingleValueAsync('Factory', 'blockchainAddress', filteredSneaker.ownerAddress);
            if (factory) {
                owner = {
                    brand: factory.brand,
                    physicalAddress: factory.physicalAddress,
                    blockchainAddress: factory.blockchainAddress,
                }
            }

            const user = await DatabaseService.getRowBySingleValueAsync('User', 'networkAddress', filteredSneaker.ownerAddress);
            if (user) {
                owner = {
                    name: user.firstName + user.lastName,
                }
            }
        }
        
        res.send({
            detail: filteredSneaker,
            owner,
        });

        return;
    }
    return res.sendStatus(404);
};

const addSneaker = async (req, res) => async (resolve, returnedValues) => {
    try {
        const newSneaker = await DatabaseService.createSingleRowAsync('Sneaker', req.body);
        if (newSneaker) {
            resolve(201);
        }
    } catch (err) {
        throw new Error(err);
    }
};

const handleIssueEvent = async (req, res) => {
    const result = await blockchainService.listenToEvent('Issue', {
        _tokenId: req.body.id,
    }, await addSneaker(req, res));
    if (!result) {
        return res.send(500);
    }
    res.sendStatus(result);
}

const handleTransferEvent = async (req, res) => {
    const result = await blockchainService.listenToEvent('Transfer', {
        _tokenId: req.body.sneakerId,
        _to: req.body.newAddress,
    }, await changeOwnership(req, res));
    if (!result) {
        return res.send(500);
    }
    res.sendStatus(result);
}



export default {
    handleIssueEvent,
    getSneaker,
    handleTransferEvent,
    // testPusher,
};
