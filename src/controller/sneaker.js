import hash from 'object-hash';
import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/utils/database';
import blockchainService from '~/utils/blockchain';
import { sendFCM } from '~/utils/fcm';
 
const changeOwnership = async (req, res) => async (resolve, returnedValues) => {
    console.log('Change ownership');
    const retrieveUser = DatabaseService.getRowBySingleValueAsync('User', 
        'networkAddress', 
        req.body.newAddress.toLowerCase());
    const retrieveSneaker = DatabaseService.getRowBySingleValueAsync('Sneaker', 
        'id', 
        req.body.sneakerId);
    
    const [user, sneaker] = await Promise.all([retrieveUser, retrieveSneaker]);
    if (sneaker) {
        try {
            const oldOwner = sneaker.email;
            sneaker.update({
                ownerAddress: req.body.newAddress,
            }).then((newSneaker) => {
                if (user && user.registrationToken) {

                    sendFCM(user.registrationToken, { 
                        title: 'Change of ownership',
                        body: `${user.email} is now the owner of ${newSneaker.model} size ${newSneaker.size}US`,  
                    });
                }
                resolve(203);
            });
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
    const result = await blockchainService.listenToEventOnBlockchain('Issue', {
        _tokenId: req.body.id,
    }, await addSneaker(req, res));
    if (!result) {
        return res.send(500);
    }
    res.sendStatus(result);
}

const handleTransferEvent = async (req, res) => {
    const result = await blockchainService.listenToEventOnBlockchain('Transfer', {
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
