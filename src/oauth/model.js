import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { sequelize } from '~/sequelize/models';
import AuthenticationService from '~/service/authentication';
import DatabaseService from '~/service/database';

export const getAccessToken = (accessToken) => {
    const verifiedToken = jwt.verify(accessToken, process.env.SECRET);
    verifiedToken.accessTokenExpiresAt = new Date(verifiedToken.accessTokenExpiresAt);
    return verifiedToken;
};

const saveToken = (token, client, user) => {

    const {
        saveRefreshToken
    } = AuthenticationService;
    const {
        refreshToken,
        accessTokenExpiresAt,
    } = token;
    saveRefreshToken(user.id, refreshToken);
    const {
        firstName,
        lastName,
        email,
    } = user;
    token.accessToken = jwt.sign({
        user: {
            firstName,
            lastName,
            email,
        },
        accessTokenExpiresAt,
    }, process.env.SECRET);
    token.client = client;
    token.user = {
        firstName,
        lastName,
        email,
    };

    return token;
};

const getRefreshToken = async (refreshToken) => {

    const user = await DatabaseService.getSingleValueAsync('User', 'refreshToken', refreshToken);
    if (!user) {
        return null;
    }

    return {
        refreshToken,
        client: {
            clientId: 'truegrail',
            clientSecret: 'secret',
        },
        user: user.dataValues,
    }
};
const revokeToken = (token) => {

    // this can be where we store the blacklist
    return true;
};

const getUser = async (username, password) => {
    const {
        retrieveUserAuthInfo,
        retrieveUserPublicInfo,
    } = AuthenticationService;
    const authInfo = await retrieveUserAuthInfo(username);
    if (authInfo) {
        const {
            savedHash,
        } = authInfo;
        if (bcrypt.compareSync(password, savedHash)) {
            return await retrieveUserPublicInfo(username);
        }
    }
    return null;
};

const getClient = (clientId, clientSecret) => {
    if (clientId === 'truegrailmobile' && clientSecret === 'secret') {
        return {
            grants: [
                'password',
                'refresh_token'
            ],
        }
    }
};

export default {
    getAccessToken,
    getRefreshToken,
    getClient,
    getUser,
    saveToken,
    revokeToken,
}
