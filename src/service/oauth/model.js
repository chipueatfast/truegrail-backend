import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { saveRefreshToken, getPasswordHash, getUserCredential } from '~/service/authentication';
import DatabaseService from '~/service/database';

export const getAccessToken = (accessToken) => {
    const verifiedToken = jwt.verify(accessToken, process.env.SECRET);
    verifiedToken.accessTokenExpiresAt = new Date(verifiedToken.accessTokenExpiresAt);
    return verifiedToken;
};

const saveToken = (token, client, user) => {
    const {
        refreshToken,
        accessTokenExpiresAt,
    } = token;
    saveRefreshToken(user.id, refreshToken);
    const {
        id,
        username,
        email,
        role,
        address,
        encryptedPrivateKey,
        eosName,
        brand,
    } = user;
    token.accessToken = jwt.sign({
        user: {
            id,
            email,
            role,
        },
        accessTokenExpiresAt,
    }, process.env.SECRET);
    token.client = client;
    token.user = {
        id,
        email,
        username,
        role,
        address,
        encryptedPrivateKey,
        eosName,
        ...(brand ? {brand} : null),
    };

    return token;
};

const getRefreshToken = async (refreshToken) => {

    const user = await DatabaseService.getRowBySingleValueAsync('User', 'refreshToken', refreshToken);
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

const getUser = async (userIdentity, password) => {
    const passwordHash = await getPasswordHash(userIdentity);
    if (bcrypt.compareSync(password, passwordHash)) {
        return await getUserCredential(userIdentity);
    }

    return null;
};

const getClient = (clientId, clientSecret) => {
    if (process.env.ALLOWED_CLIENT.includes(clientId) && clientSecret === 'secret') {
        return {
            grants: [
                'password',
                'refresh_token',
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
