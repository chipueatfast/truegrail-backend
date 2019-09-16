import jwt from 'jsonwebtoken';

export const decodeToken = token => jwt.verify(token, process.env.SECRET);
