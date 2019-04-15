import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
    return jwt.verify(accessToken, process.env.SECRET);
}