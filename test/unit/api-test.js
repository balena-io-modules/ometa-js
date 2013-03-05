var common = require('../fixtures/common'),
    assert = require('assert');

exports['compile should work (w/o root)'] = function(test) {
  var simple = common.compile('simple');

  assert.ok(simple);
  assert.ok(/require\('\/[^']+'\)/g.test(simple));

  test.done();
};

exports['compile should work (with root)'] = function(test) {
  var simple = common.compile('simple', { root: 'test' });

  assert.ok(simple);
  assert.ok(/require\('test'\)/g.test(simple));

  test.done();
};

exports['evalCode should work'] = function(test) {
  var simple = common.compile('simple').Simple;

  assert.equal(simple.matchAll([['simple']], 'top'), 'ok');

  test.done();
};

exports['require("...ometajs") should work'] = function(test) {
  var simple = common.require('simple').Simple;

  assert.equal(simple.matchAll([['simple']], 'top'), 'ok');

  test.done();
};
