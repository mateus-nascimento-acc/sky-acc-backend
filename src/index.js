import express from 'express';
import bodyParser from 'body-parser';

// configurando porta com express
const app = express();
const port = process.env.port || 3000;

// configurando body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).send("Olá mundo!"))

require('./controllers/auth.controller')(app);
require('./controllers/user.controller')(app);


app.listen(port, () => console.log('Olá, mundo, API rodando na porta:', port)
);

export default app;