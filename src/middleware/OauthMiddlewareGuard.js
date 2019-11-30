import {Request, Response} from 'oauth2-server';
import oauth from '~/service/oauth/index';

function OauthMiddlewareGuard(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    oauth.authenticate(request, response)
        .then(() => next())
        .catch(function (err) { res.status(err.code || 500).json(err) })
}

export default OauthMiddlewareGuard;
