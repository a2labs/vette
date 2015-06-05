'use strict';
var empty = require('./empty');

/**
 * @see https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
function sameValueZero(x, y) {
  var typex = typeof x, typey = typeof y;
  if (typex !== typey) return false;
  if (x === undefined) return true;
  if (x === null) return true;
  if (typex === 'number') {
    if (isNaN(x) && isNaN(y)) return true;
    if (x === +0 && y === -0) return true;
    if (x === -0 && y === +0) return true;
    return x === y;
  }
  if (typex === 'string') {
    if (x.length !== y.length) return false;
    if (x.length === 0) return true;
    var index = 0, maxIndex = x.length - 1;
    while (index <= maxIndex) {
      if (x[index] !== y[index]) {
        return false;
      }
      index += 1;
    }
    return true;
  }
  if (typex === 'boolean') {
    // TODO: this seems redundant...
    if (x === true) return y === true;
    if (x === false) return y === false;
  }
  // TODO: handle es6 symbols
  return x === y;
}

module.exports = function contains (collection, value) {
  if (!Array.isArray(collection)) {
    throw new TypeError('collection must be an array');
  }
  if (empty(collection)) {
    return false;
  }
  var index = 0, maxIndex = collection.length - 1;
  while (index <= maxIndex) {
    if (sameValueZero(collection[index], value)) {
      return true;
    }
    index += 1;
  }
  return false;
};