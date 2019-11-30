import {Request, Response} from "oauth2-server";
import { sequelize } from '~/sequelize/models';
import { generatePasswordHash } from '~/service/encryption';
import DatabaseService from '~/service/database';
import oauth from '~/service/oauth/index';
import { createNewEosAccount } from '~/service/eos';

const register = async (req, res) => {
    const {
        username,
        userIdentity,
        address,
        role,
        brand,
        publicKey,
        encryptedPrivateKey,
        password,
        eosName,
    } = req.body;

    if (
        !(
            password &&
            username &&
            userIdentity &&
            role &&
            publicKey &&
            eosName &&
            encryptedPrivateKey
        )) {
        return res.status(400).send();
    }

    const hash = generatePasswordHash(password);

    const newUser = await DatabaseService.createSingleRowAsync(
        'User',
        {
            username,
            userIdentity,
            address,
            role,
            brand,
            publicKey,
            encryptedPrivateKey,
            passwordHash: hash,
        }, {
            userIdentity,
        }
    );
    if (newUser.error) {
        const {
            error: {
                statusCode,
                message,
            },
        } = newUser;
        res.status(statusCode).json({message}).send();
        return;
    }

    const newEosAccount = await createNewEosAccount({
        publicKey,
        eosName,
    });
    if (newEosAccount.error) {
        res.status(500).json(newEosAccount.error).send();
        return;
    }
    newUser.update({
        eosName,
    }).then();
    res.status(201).json({
        id: newUser.id,
    }).send();


};

const updateUserInfo = async (req, res) => {
    const {
        userId,
    } = req.params;
    const {
        username,
        address,
    } = req.body;
    const existing = await sequelize.User.findOne({
        id: userId,
        role: 'collector',
    });
    if (!existing) {
        return res.status(400).send();
    }
    const updatedUser = await existing.update({
        username,
        address,
    });
    if (updatedUser) {
        return res.status(204).send();
    }
    return res.status(500).send();
}

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

const signIn = async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);
    return oauth.token(request, response)
        .then(function (token) {
            res.json(token);
        })
        .catch(function (err) {
            res.status(err.code || 500).json(err);
        })
}

export default {
    signIn,
    register,
    retrievePublicInfo,
    restoreAccountByNetworkAddress,
    getSneakerCollection,
    updateUserInfo,
}
