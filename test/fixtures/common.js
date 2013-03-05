var ometajs = require('../../lib/ometajs'),
    fs = require('fs');

ometajs.root = __dirname + '/../../lib/ometajs/core';

exports.ometajs = ometajs;

exports.compile = function compile(name, options) {
  var code = fs.readFileSync(__dirname + '/../files/' + name + '.ometajs');
  return ometajs.compile(code.toString(), options);
};

exports.compile = function compile(name) {
  var code = fs.readFileSync(__dirname + '/../files/' + name + '.ometajs');
  return ometajs.evalCode(code.toString());
};

exports.require = function compile(name) {
  return require(__dirname + '/../files/' + name);
};
