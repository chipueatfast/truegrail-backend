import expressJWT from 'express-jwt';

const jwt = () => {
    const secret = process.env.SECRET;
    return expressJWT({ secret }).unless({
        path: [
            'user/authenticate'
        ]
    });

};

export default jwt;
