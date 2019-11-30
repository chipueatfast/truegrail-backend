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

export function getPasswordHash(userIdentity) {
    return sequelize.User.find({
        where: {
            userIdentity,
        },
    }).then(user => user ? user.passwordHash : null);
}

export function getUserCredential(userIdentity) {
    return sequelize.User.find({
        where: {
            userIdentity,
        },
    }).then(user => user.serialize());
}

