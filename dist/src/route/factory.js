"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("../controller");

var factoryRouter = (0, _express.Router)();
factoryRouter.post('/', _controller.FactoryController.addFactory).get('/:address', _controller.FactoryController.getFactory);
var _default = factoryRouter;
exports.default = _default;