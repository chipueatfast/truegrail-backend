"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("../controller");

var contractRouter = (0, _express.Router)();
contractRouter.get('/:name', _controller.ContractController.getContract).post('/', _controller.ContractController.createOrUpdateContract).get('/creator/:contractName', _controller.ContractController.getContractCreator);
var _default = contractRouter;
exports.default = _default;