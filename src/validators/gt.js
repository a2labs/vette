'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');
var ValidationError = require('../errors').ValidationError;

module.exports = function gt (number, inclusive, message) {
  number = Number(number);
  if (!isNumber(number)) {
    throw new TypeError('number must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be greater than ' + number;
  return function (adapter) {
    var value = Number(adapter.value());
    if (!isNumber(value)) {
      return new TypeError('value must be numeric');
    }
    if (!compare(inclusive).gt(value, number)) {
      return new ValidationError(message);
    }
  };
};