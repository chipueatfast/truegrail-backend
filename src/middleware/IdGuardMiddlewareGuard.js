import { decodeAccessToken } from '~/util/encryption';


const IdGuardMiddleware = idParamName => (req, res, next) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }

    const idToCheck = req.params[idParamName];

    const {
        user,
    } = decodeAccessToken(req.headers.authorization);
    if (user && idToCheck !== user.id.toString()) {
        return res.status(401).json({
            message: 'you are not the valid user to do such action ',
        });
    }
    next();
}

export default IdGuardMiddleware;