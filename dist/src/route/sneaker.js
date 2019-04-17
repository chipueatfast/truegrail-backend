"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("../controller");

var sneakerRouter = (0, _express.Router)();
sneakerRouter.get('/:id', _controller.SneakerController.getSneaker).post('/', _controller.SneakerController.addSneaker);
var _default = sneakerRouter;
exports.default = _default;