import hash from 'object-hash';
import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';
// import pusher from '~/utils/pusher';

// const testPusher = async () => {
//     pusher.trigger('long', 'test', {
//         message: 'di choi k em',
//     });
// }
 
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
        if (condition === 'issued') {
            const factory = await DatabaseService.getSingleValueAsync('Factory', 'blockchainAddress', ownerAddress);
            if (factory) {
                owner = {
                    brand: factory.brand,
                    physicalAddress: factory.physicalAddress,
                    blockchainAddress: factory.blockchainAddress,
                }
            }

            const user = await DatabaseService.getSingleValueAsync('User', 'networkAddress', ownerAddress);
            if (user) {
                owner = {
                    name: user.firstName + user.lastName,
                }
            }
        }
        
    
        res.send({
            detail: filteredSneaker,
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



export default {
    addSneaker,
    getSneaker,
    changeOwnership,
    // testPusher,
};
