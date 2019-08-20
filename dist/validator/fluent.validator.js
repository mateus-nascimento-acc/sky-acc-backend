"use strict";

var errors = [];

function ValidationContract() {
  errors = [];
}

;

ValidationContract.prototype.isRequired = function (value, message) {
  if (!value || value.length <= 0) errors.push({
    message: message
  });
};

ValidationContract.prototype.isEmail = function (value, message) {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) errors.push({
    message: message
  });
};

ValidationContract.prototype.errors = function () {
  return errors;
};

ValidationContract.prototype.clear = function () {
  errors = [];
};

ValidationContract.prototype.isValid = function () {
  return errors.length === 0;
};

module.exports = ValidationContract;