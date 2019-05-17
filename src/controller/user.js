import { sequelize } from '~/sequelize/models';
import UserService from './user.service';
import { generateHash } from '~/service/encryption';
import DatabaseService from '~/service/database';

const register = async (req, res) => {
    const { password, email } = req.body;

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
    getSneakerCollection,
}
