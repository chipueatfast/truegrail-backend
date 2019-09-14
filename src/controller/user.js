import { sequelize } from '~/sequelize/models';
import { generateHash } from '~/utils/encryption';
import DatabaseService from '~/utils/database';
import BlockchainService from '~/utils/blockchain';

const register = async (req, res) => {
    const { password, email, networkAddress } = req.body;

    // check email existence
    if (await DatabaseService.getRowBySingleValueAsync('User', 'email', email)) {
        res.sendStatus(400);
        return;
    }

    const hash = generateHash(password);

    sequelize.User.create({
        ...req.body,
        passwordHash: hash,
    })
        .then(() => {
            // temporary
            try {
                BlockchainService.sendWei(networkAddress);
            } catch(e) {
                console.log(e);
            }
            
            res.status(201).send({
                passwordHash: hash,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(403);
        })
};

// for them next iteration
const sendSaltAndHash = () => {

};


const retrievePublicInfo = (req, res) => {
    res.send('please work');
};


// please apply knex if you have time
const restoreAccountByNetworkAddress = async (req, res) => {
    const user = await DatabaseService.getRowBySingleValueAsync('User', 'networkAddress', req.params.networkAddress);
    try {
        if (user) {
            user.update({
                registrationToken: req.body.registrationToken,
            });
            res.send({
                email: user.email,
            });
            return;
        }
    } catch {
        res.sendStatus(500);
        return;
    }
    
    res.sendStatus(404);
};



const getSneakerCollection = async (req, res) => {
    const {
        address,
    } = req.params;

    try {
        const collection = await sequelize.Sneaker.findAll({
            where: {
                ownerAddress: address,
            },
        });
        if (collection && collection.length !== 0) {
            res.send(collection);
        } else {
            res.sendStatus(404)
        }
    } catch {
        res.sendStatus(500);
    }

}

export default {
    register,
    retrievePublicInfo,
    restoreAccountByNetworkAddress,
    getSneakerCollection,
}
