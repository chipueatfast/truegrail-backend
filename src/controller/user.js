import { sequelize } from '~/sequelize/models';
import { generateHashAndSalt } from 'user.service';

const register = (req, res) => {
    const { password } = req.body;
    const {
        hash: passwordHash,
        salt: passwordSalt,
    } = generateHashAndSalt(password);
    sequelize.User.create({
        ...req.body,
        passwordHash,
        passwordSalt,
    })
        .then(() => {
            res.sendStatus(201);
        })
        .catch(() => {
            res.statusCode(403);
        })
};

const retrievePublicInfo = (req, res) => {
    sequelize.User.findOne({
        where: {
            firstName: req.query.fname,
        }
    }).then(rs => {
        if (rs) {
            return res.send(rs);
        }
        return res.sendStatus(404);
    });
};

export default {
    register,
    retrievePublicInfo,
}
