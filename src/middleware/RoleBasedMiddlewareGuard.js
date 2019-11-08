import {
    Request,
    Response,
} from 'oauth2-server';
import {
    decodeAccessToken,
} from '~/service/encryption';
import oauth from '~/service/oauth/index';

const RoleBasedMiddlewareGuard = roles => (req, res, next) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    const {
        user,
    } = decodeAccessToken(req.headers.authorization);
    if (user && !roles.includes(user.role)) {
        return res.status(401).json({
            message: 'you are not granted permission',
        });
    }
    const request = new Request(req);
    const response = new Response(res);
    oauth.authenticate(request, response)
        .then(() => next())
        .catch(function (err) {
            res.status(err.code || 500).json(err)
        });
};

export default RoleBasedMiddlewareGuard;