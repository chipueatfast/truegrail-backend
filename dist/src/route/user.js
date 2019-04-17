"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("../controller");

var userRouter = (0, _express.Router)();
userRouter.post('/', _controller.UserController.register).get('/', _controller.UserController.retrievePublicInfo).get('/ownership/:address', _controller.UserController.getSneakerCollection);
var _default = userRouter;
exports.default = _default;