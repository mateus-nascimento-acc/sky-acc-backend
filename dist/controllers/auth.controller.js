"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _users = _interopRequireDefault(require("../models/users"));

var _fluent = _interopRequireDefault(require("../validator/fluent.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

function generateToken() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _jsonwebtoken["default"].sign(params, _auth["default"].secret, {
    expiresIn: 1800
  });
}

router.post('/register',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var contract, email, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contract = new _fluent["default"]();
            contract.isRequired(req.body.name, 'É obrigatório informar um nome');
            contract.isRequired(req.body.email, 'É obrigatório informar um e-mail');
            contract.isRequired(req.body.password, 'É obrigatório informar uma senha');
            contract.isEmail(req.body.email, 'É necessário informar um endereço de e-mail válido');

            if (contract.isValid()) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).send(contract.errors()).end());

          case 7:
            email = req.body.email;
            _context.prev = 8;
            _context.next = 11;
            return _users["default"].findOne({
              email: email
            });

          case 11:
            if (!_context.sent) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: 'E-mail já existente'
            }));

          case 13:
            _context.next = 15;
            return _users["default"].create(req.body);

          case 15:
            user = _context.sent;
            user.password = undefined;
            res.status(201).send({
              user: user,
              token: generateToken({
                id: user.id
              })
            });
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](8);
            return _context.abrupt("return", res.status(400).send({
              error: "Falha na criação do usuário"
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 20]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/authenticate',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 3;
            return _users["default"].findOne({
              email: email
            }).select('+password');

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('Usuário e/ou senha inválidos'));

          case 6:
            _context2.next = 8;
            return _bcryptjs["default"].compare(password, user.password);

          case 8:
            if (_context2.sent) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('Usuário e/ou senha inválidos'));

          case 10:
            user.password = undefined;
            token = _jsonwebtoken["default"].sign({
              id: user.id
            }, _auth["default"].secret, {
              expiresIn: 1800
            });
            res.send({
              user: user,
              token: generateToken({
                id: user.id
              })
            });
            next();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

module.exports = function (app) {
  return app.use('/auth', router);
};