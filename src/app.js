import Express from 'express';
import bodyParser from 'body-parser';
import {Request, Response} from "oauth2-server";

import oauth from '~/oauth';
import { checkNoAuthRequired } from '~/oauth/config';
import { sequelize } from '~/sequelize/models';
import { UserRoute } from '~/route';

const app = Express();
const port = process.env.PORT;

app.oauth = oauth;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const AuthenticateRequest = (req, res, next) => {
        if (checkNoAuthRequired(req.path, req.method)) {
            next();
            return;
        }
        const request = new Request(req);
        const response = new Response(res);
        app.oauth.authenticate(request, response)
            .then(() => next())
            .catch(function (err) { res.status(err.code || 500).json(err) })
    };

app.use(AuthenticateRequest);

// route
app.all('/oauth/token', (req, res) => {
    const request = new Request(req);
    const response = new Response(res);
    return app.oauth.token(request, response)
        .then(function (token) {
            res.json(token);
        })
        .catch(function (err) {
            res.status(err.code || 500).json(err);
        })
});
app.use('/user', UserRoute);

console.log("cai dau banh");

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to database: ', err);
    });

app.listen(port, () =>  console.log(`Server running at port ${port}`));


