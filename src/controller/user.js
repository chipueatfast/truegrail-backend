import { sequelize } from '~/sequelize/models';
import UserService from './user.service';

const register = async (req, res) => {
    const { password, email } = req.body;
    if (await UserService.checkEmailExistence(email)) {
        res.sendStatus(400);
        return;
    }
    const hash = UserService.generateHash(password);

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
    res.send('it works hehe phan 3');
};


const getSneakerCollection = async (req, res) => {
    const {
        address,
    } = req.params;

    try {
        const collection = await sequelize.Sneaker.findAll({
            where: {
                ownerAddress: address,
            }
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
