"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// configurando e testando connection string com mongoDB
var mongoDB = 'mongodb+srv://dbUser:testeSky@1@cluster0-mgipb.mongodb.net/test?retryWrites=true&w=majority';

_mongoose["default"].connect(mongoDB, {
  useNewUrlParser: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o Banco de Dados!'));

_mongoose["default"].set('useNewUrlParser', true);

_mongoose["default"].set('useFindAndModify', false);

_mongoose["default"].set('useCreateIndex', true);

module.exports = _mongoose["default"];