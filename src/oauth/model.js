import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { sequelize } from '~/sequelize/models';
import AuthenticationService from '~/service/authentication';

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
    token.user = user;

    return token;
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
            clientId,
            clientSecret,
            grants: [
                'password',
                'refresh_token'
            ],
        }
    }
};

export default {
    getAccessToken,
    getClient,
    getUser,
    saveToken,
}
