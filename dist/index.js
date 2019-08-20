"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// configurando porta com express
var app = (0, _express["default"])();
app.use(_express["default"].json());
var port = process.env.port || 3000; // configurando body parser

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  return res.status(200).send('API teste Sky!');
});

require('./controllers/auth.controller')(app);

require('./controllers/user.controller')(app);

app.listen(port, function () {
  return console.log('API rodando na porta:', port);
});
var _default = app;
exports["default"] = _default;