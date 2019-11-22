import {Request, Response} from "oauth2-server";
import { sequelize } from '~/sequelize/models';
import { generatePasswordHash } from '~/service/encryption';
import DatabaseService from '~/service/database';
import oauth from '~/service/oauth/index';
import { createNewEosAccount } from '~/service/eos';

const register = async (req, res) => {
    const {
        username,
        email,
        address,
        role,
        brand,
        publicKey,
        encryptedPrivateKey,
        password,
    } = req.body;

    // check email existence
    if (await DatabaseService.getRowBySingleValueAsync('User', 'email', email)) {
        res.sendStatus(400);
        return;
    }
    const hash = generatePasswordHash(password);

    const newUser = await DatabaseService.createSingleRowAsync(
        'User',
        {
            username,
            email,
            address,
            role,
            brand,
            publicKey,
            encryptedPrivateKey,
            passwordHash: hash,
        }, {
            email,
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

    const newEosAccount = await createNewEosAccount(publicKey);
    if (newEosAccount.error) {
        res.status(500).json(newEosAccount.error).send();
        return;
    }
    const {
        eosName,
    } = newEosAccount;
    newUser.update({
        eosName,
    }).then();
    res.status(201).json({
        id: newUser.id,
        eosName,
    }).send();


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
}
