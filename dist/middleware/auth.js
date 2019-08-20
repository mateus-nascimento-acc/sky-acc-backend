"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function (req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Token não informado');
  var parts = authHeader.split(' ');
  if (!parts.lenght === 2) return res.status(401).send('Token inválido');

  var _parts = _slicedToArray(parts, 2),
      scheme = _parts[0],
      token = _parts[1];

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send('Token inválido');
  }

  _jsonwebtoken["default"].verify(token, _auth["default"].secret, function (err, decoded) {
    if (err) return res.status(401).send('Token inválido');
    req.userId = decoded.id;
    return next();
  });
};