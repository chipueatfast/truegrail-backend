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
            res.sendStatus(201);
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
    res.send('it works');
};

export default {
    register,
    retrievePublicInfo,
}
