"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNoAuthRequired = void 0;
var noAuthRequiredRoutes = [{
  method: 'POST',
  url: '/user/'
}, {
  url: '/oauth/token',
  method: 'ALL'
}, {
  nest: 'factory'
}, {
  nest: 'contract'
}, {
  nest: 'sneaker'
}, {
  nest: 'user'
}];

var checkNoAuthRequired = function checkNoAuthRequired(url, method) {
  var nest = url.split('/')[1];
  var isUnguarded = noAuthRequiredRoutes.filter(function (route) {
    return route.nest === nest || route.url === url && (route.method === method || route.method === 'ALL');
  });
  return isUnguarded.length !== 0;
};

exports.checkNoAuthRequired = checkNoAuthRequired;