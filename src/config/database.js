import mongoose from 'mongoose';

// configurando e testando connection string com mongoDB
const mongoDB = 'mongodb+srv://dbUser:testeSky@1@cluster0-mgipb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o Banco de Dados!'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
