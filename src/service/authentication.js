import { sequelize } from '~/sequelize/models';

// for the blacklist implementation
function saveRefreshToken(userId, refreshToken) {
    return sequelize.User.findByPk(userId).then(
        user => {
            user.update({
                refreshToken
            })
        }
    )
}

function retrieveUserAuthInfo(username) {
    return sequelize.User.find({
        where: {
            email: username,
        }
    }).then(user => user ? ({
        savedHash: user.passwordHash,
    }) : null);
}

function retrieveUserPublicInfo(username) {
    return sequelize.User.find({
        where: {
            email: username,
        }
    }).then(user => user.serialize());
}

export default {
    retrieveUserAuthInfo,
    retrieveUserPublicInfo,
    saveRefreshToken,
}

