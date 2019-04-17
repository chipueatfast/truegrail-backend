"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _oauth2Server = require("oauth2-server");

var _oauth = _interopRequireDefault(require("./oauth"));

var _config = require("./oauth/config");

var _models = require("./sequelize/models");

var _route = require("./route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT;
app.oauth = _oauth.default; // middleware

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    console.log('hehe');
    res.send(200);
    return;
  }

  next();
});

var AuthenticateRequest = function AuthenticateRequest(req, res, next) {
  if ((0, _config.checkNoAuthRequired)(req.path, req.method)) {
    next();
    return;
  }

  var request = new _oauth2Server.Request(req);
  var response = new _oauth2Server.Response(res);
  app.oauth.authenticate(request, response).then(function () {
    return next();
  }).catch(function (err) {
    res.status(err.code || 500).json(err);
  });
};

app.use(AuthenticateRequest); // route

app.all('/oauth/token', function (req, res) {
  var request = new _oauth2Server.Request(req);
  var response = new _oauth2Server.Response(res);
  return app.oauth.token(request, response).then(function (token) {
    res.json(token);
  }).catch(function (err) {
    res.status(err.code || 500).json(err);
  });
});
app.use('/user', _route.UserRoute);
app.use('/factory', _route.FactoryRoute);
app.use('/contract', _route.ContractRoute);
app.use('/sneaker', _route.SneakerRoute);
console.log("Wake up wake up");

_models.sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully');
}).catch(function (err) {
  console.log('Unable to connect to database: ', err);
});

app.listen(port, function () {
  return console.log("Server running at port ".concat(port));
});