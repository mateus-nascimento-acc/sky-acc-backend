'use strict'
import express from 'express';
import authMiddleware from '../middleware/auth';
import User from '../models/users';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).send(users);
    }
    catch (error) {
        return res.status(400).send({ error: 'Falha na consulta de usuários' });
    }


});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).send(user);
    }
    catch (error) {
        throw res.status(400).send('Erro ao trazer usuários');
     }
});

router.put('/:id', async (req, res) => {

        req.body.updateDate = Date.now(),
        console.log(req.params.id, req.body)

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send('Usuário atualizado com sucesso! \n')
    }
    catch (error) {
        throw res.status(400).send('Falha ao atualizar o usuário');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).send("Usuário excluído com sucesso")
    }
    catch (error) {
        throw res.status(400).send('Falha ao excluir o usuário');
    }
});

module.exports = app => app.use('/users', router);