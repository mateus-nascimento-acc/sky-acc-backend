import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send("Token não informado");

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
        return res.status(401).send("Token inválido");

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send("Token inválido")
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send("Token inválido");

        req.userId = decoded.id;
        return next();
    });

}