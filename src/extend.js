'use strict';
var empty = require('./empty');
var keys = require('./keys');
var each = require('./each');

module.exports = function extend (targets) {
  targets = Array.prototype.slice.call(arguments, 0);
  if (empty(targets)) {
    return {};
  }
  var rootTarget = targets.shift();
  while (targets.length) {
    var nextTarget = targets.shift();
    each(keys(nextTarget), function (key) {
      rootTarget[key] = nextTarget[key];
    });
  }
  return rootTarget;
};