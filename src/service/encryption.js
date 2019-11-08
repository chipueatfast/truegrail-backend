import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const decodeToken = token => jwt.verify(token, process.env.SECRET);

export const decodeAccessToken = (authorization) => {
    const trimmed = authorization.replace('Bearer ', '');
    const decoded = decodeToken(trimmed);
    return decoded;
}

export function generateHash(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

