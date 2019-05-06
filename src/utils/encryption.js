import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const decodeToken = (token) => {
    return jwt.verify(accessToken, process.env.SECRET);
}

export const function generateHash(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

