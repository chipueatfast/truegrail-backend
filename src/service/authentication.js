import { sequelize } from '~/sequelize/models';

// for the blacklist implementation
export function saveRefreshToken(userId, refreshToken) {
    return sequelize.User.findByPk(userId).then(
        (user) => {
            user.update({
                refreshToken,
            })
        }
    )
}

export function getPasswordHash(username) {
    return sequelize.User.find({
        where: {
            email: username,
        },
    }).then(user => user ? user.passwordHash : null);
}

export function getUserCredential(username) {
    return sequelize.User.find({
        where: {
            email: username,
        },
    }).then(user => user.serialize());
}

