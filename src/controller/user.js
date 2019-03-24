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
    res.send('it works hehe');
};

export default {
    register,
    retrievePublicInfo,
}
