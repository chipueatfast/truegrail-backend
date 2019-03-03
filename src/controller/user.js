import db from '~/sequelize/models';

const register = (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
        .then((data) => {
            console.log(data);
            res.sendStatus(201);
        });
};

const retrievePublicInfo = (req, res) => {
    db.User.findOne({
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
