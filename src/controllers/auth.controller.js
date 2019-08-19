'use strict'
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/users';
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800,
    })
}

router.post('/register', async (req, res, next) => {
    const { email } = req.body
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'E-mail já existente' });

        const user = await User.create(req.body);

        user.password = undefined;

        res.status(201).send({
            user, token: generateToken({ id: user.id })
        });
    }
    catch (error) {
        return res.status(400).send({ error: "Falha na criação do usuário" });
    }
});

router.post('/authenticate', async (req, res, next) => {

    const { email, password } = req.body;
    
    
    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send('Usuário e/ou senha inválidos');

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send('Usuário e/ou senha inválidos')

    user.password = undefined;
    

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 180,
    });

    res.send({
        user: user.email,
        token: generateToken({ id: user.id })
    })

})

module.exports = app => app.use('/auth', router)