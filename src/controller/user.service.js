import bcrypt from 'bcrypt';

import { sequelize } from '~/sequelize/models';


function generateHash(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

async function checkEmailExistence(email) {
    return sequelize.User.find({
        where: {
            email,
        }
    }).then(user => {
        return !!user;
    })
}

export default {
    checkEmailExistence,
    generateHash,
}
