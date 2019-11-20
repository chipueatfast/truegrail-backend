import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import SHA256 from 'crypto-js/sha256';

export const decodeToken = token => jwt.verify(token, process.env.SECRET);

export const decodeAccessToken = (authorization) => {
    const trimmed = authorization.replace('Bearer ', '');
    const decoded = decodeToken(trimmed);
    return decoded;
}

export function generatePasswordHash(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function sortToGivenOrder({
    object,
    keys,
}) {
    const orderedObject = {};
    keys.forEach((key) => {
        orderedObject[key] = object[key];
    });
    return orderedObject;
}

export function createCorrespondingUserHash(user) {
    const keys = ['email', 'username', 'eosName', 'publicKey', 'role', 'address', 'brand'];
    const orderedUser = sortToGivenOrder({
        object: user,
        keys,
    });
    return SHA256(JSON.stringify(orderedUser)).toString();
}

export function createCorrespondingSneakerHash() {
    
}

