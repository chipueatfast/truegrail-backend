import {Request, Response} from "oauth2-server";
import bcrypt from 'bcrypt';
import { sequelize } from '~/sequelize/models';
import { generatePasswordHash } from '~/service/encryption';
import DatabaseService from '~/service/database';
import oauth from '~/service/oauth/index';
import { createNewEosAccount, executeSmartContractMethod } from '~/service/eos';
import { getPasswordHashById } from "~/service/authentication";


const getIsUserIdExisting = async (req, res) => {
    const {
        userIdentity,
    } = req.query;

    const existing = await sequelize.User.findOne({
        where: {
            userIdentity,
        },
    });
    
    return res.send({
        isExisting: !!existing,
    });
}

const changePassword = async (req, res) => {
    const {
        userId,
    } = req.params;

    const {
        oldPassword,
        newPassword,
        newEncryptedPrivateKey,
    } = req.body;

    if (!newEncryptedPrivateKey) {
        return res.status(400).send({
            message: 'OLD_PRIVATE_KEY',
        })
    }

    if (!oldPassword || !newPassword) {
        return res.status(400).send({
            message: 'EMPTY_PASSWORD',
        })
    }

    const oldPasswordHashFromDb = await getPasswordHashById(userId);

    if (!bcrypt.compareSync(oldPassword, oldPasswordHashFromDb)) {
        return res.status(400).send({
            message: 'WRONG_PASSWORD',
        });
    };


    const changedUser = await sequelize.User.update({
        passwordHash: generatePasswordHash(newPassword),
        encryptedPrivateKey: newEncryptedPrivateKey,
    },{
        where: {
            id: userId,
        },
    })

    if (changedUser) {
        return res.status(204).send();
    }

    return res.status(500).send();
}

async function addCollectorToEosTableUser({
    id,
    eosName,
}) {
    const rs = await executeSmartContractMethod({
        namedParams: {
            user_id: id,
            eos_name: eosName,
            user_info_hash: '',
            role: 'collector',
        },
        method: 'insertuser',
    });

    if (rs.error) {
        return false;
    }
    return true;
}

const isUsingDefaultPassword = async (req, res) => {
    const {
        userId,
    } =  req.params;
    const existing = await sequelize.User.findOne({
        where: {
            id: userId,
        },
    });

    return res.send({
        isUsingDefault: bcrypt.compareSync('1', existing.passwordHash),
    })
}

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
            userIdentity &&
            role &&
            publicKey &&
            eosName &&
            encryptedPrivateKey
        )) {
        return res.status(400).send();
    }

    const newEosAccount = await createNewEosAccount({
        publicKey,
        eosName,
    });

    if (newEosAccount.error) {
        res.status(500).json(newEosAccount.error).send();
        return;
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
            eosName,
            encryptedPrivateKey,
            passwordHash: hash,
            ...(role === 'collector' ? {
                phone: userIdentity,
            } : {
                email: userIdentity,
            }),
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

    const {
        id,
    } = newUser;

    if (role === 'collector') {
        const rs =  await addCollectorToEosTableUser({
            id,
            eosName,
        });
        if (!rs) {
            return res.status(500).send({
                message: 'can not add to multi index',
            });
        }
    }

    await newUser.update({
        isBlockchainSynced: true,
    })
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
        email,
    } = req.body;
    const existing = await sequelize.User.findOne({
        where: {
            id: userId,
            role: 'collector',
        },
    });
    if (!existing) {
        return res.status(400).send();
    }
    const updatedUser = await existing.update({
        username,
        address,
        email,
        isBlockchainSynced: false,
    });
    if (updatedUser) {
        return res.status(204).send();
    }
    return res.status(500).send();
}

const retrievePublicInfo = (req, res) => {
    res.send('please work');
};

const getPublicInfoByEosName = async (req, res) => {
    const {
        eosName,
    } = req.params;
    const user = await sequelize.User.findOne({
        where: {
            eosName,
        },
    });
    if (!user) {
        return res.status(400).send({
            message: 'NOT_AVAILABLE',
        })
    }
    const {
        id,
        username,
    } = user;
    res.send({
        id,
        username,
    })
}


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

const getCollectorById = async (req, res) => {
    const {
        userId,
    } = req.params;
    const collector = await sequelize.User.findOne({
        where: {
            id: userId,
            role: 'collector',
        },
    });
    if (!collector) {
        return res.status(404).send();
    }

    return res.send({
        collector,
    });
}

export default {
    signIn,
    register,
    retrievePublicInfo,
    getPublicInfoByEosName,
    restoreAccountByNetworkAddress,
    getSneakerCollection,
    updateUserInfo,
    getIsUserIdExisting,
    getCollectorById,
    isUsingDefaultPassword,
    changePassword,
}
