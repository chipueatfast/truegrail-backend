import hash from 'object-hash';
import { sequelize } from '~/sequelize/models';
import DatabaseService from '~/service/database';


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
            detail: sneaker,
            hash: hash({
                id,
                brand,
                model,
                colorway,
                condition,
                releaseDate,
                limitedEdition,
                size,
            }),
            owner
        });
        return;
    }
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
};
