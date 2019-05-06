import hash from 'object-hash';
import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';
import blockchainService from '~/service/blockchain';
import pusher from '~/utils/pusher';

const testPusher = async () => {
    pusher.trigger('long', 'test', {
        message: 'di choi k em',
    });
}
 
const changeOwnership = async (req, res) => {
    const sneaker = await DatabaseService.getSingleValueAsync('Sneaker', 'id', req.body.sneakerId);
    if (sneaker) {
        try {
            sneaker.update({
                ownerAddress: req.body.newAddress,
            }).then(() => res.sendStatus(203));
        } catch {
            res.sendStatus(500);
        }
        return;
    }
    res.sendStatus(400);
}

const getSneaker = async (req, res) => {
    const sneaker = await DatabaseService.getSingleValueAsync('Sneaker', 'id', req.params.id);
    if (sneaker) {
        const {
            brand,
            model,
            colorway,
            id,
            condition,
            releaseDate,
            limitedEdition,
            size,
            ownerAddress,
        } = sneaker;

        const refinedSneaker = {
            brand,
            model,
            colorway,
            id,
            condition,
            releaseDate,
            limitedEdition,
            size,
            ownerAddress,
        };

        // get owner infomation 
        let owner;
        if (condition === 'issued') {
            const factory = await DatabaseService.getSingleValueAsync('Factory', 'blockchainAddress', ownerAddress);
            if (factory) {
                owner = {
                    brand: factory.brand,
                    physicalAddress: factory.physicalAddress,
                    blockchainAddress: factory.blockchainAddress,
                }
            }
        }
        
    
        res.send({
            detail: refinedSneaker,
            hash: hash(refinedSneaker),
            owner
        });
        return;
    }
    return res.sendStatus(404);
};

const addSneaker = async (req, res) => {
    try {
        const newSneaker = await DatabaseService.createSingleRowAsync('Sneaker', req.body);
        if (newSneaker) {
            res.sendStatus(201);
            return;
        }
    } catch (err) {
        throw new Error(err);
    }
};

const handleIssueEvent = async (req, res) => {
    blockchainService.listenToIssueEvent({
        _tokenId: req.body.id,
    }, addSneaker.bind(null, req, res));
}



export default {
    handleIssueEvent,
    getSneaker,
    changeOwnership,
    testPusher,
};
