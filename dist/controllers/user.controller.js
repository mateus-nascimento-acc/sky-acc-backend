"use strict";

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.use(_auth["default"]);
router.get('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _users["default"].find();

          case 3:
            users = _context.sent;
            return _context.abrupt("return", res.status(200).send(users));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).send({
              error: 'Falha na consulta de usuários'
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/:id',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _users["default"].findById(req.params.id);

          case 3:
            user = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(user));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw res.status(400).send('Erro ao trazer usuários');

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/:id',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.body.updateDate = Date.now();
            _context3.prev = 1;
            _context3.next = 4;
            return _users["default"].findByIdAndUpdate(req.params.id, req.body);

          case 4:
            user = _context3.sent;
            return _context3.abrupt("return", res.status(200).send('Usuário atualizado com sucesso!'));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            throw res.status(400).send('Falha ao atualizar o usuário');

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]('/:id',
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _users["default"].findByIdAndDelete(req.params.id);

          case 3:
            user = _context4.sent;
            return _context4.abrupt("return", res.status(200).send("Usuário excluído com sucesso"));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw res.status(400).send('Falha ao excluir o usuário');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

module.exports = function (app) {
  return app.use('/users', router);
};