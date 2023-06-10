const express = require('express');
const router = express.Router();
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao.js');

// Rota GET para a raiz
router.get('/', async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota POST para a raiz
router.post('/', async (req, res) => {
    try {
        const livro = req.body;
        const resultado = await incluir(livro);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota DELETE para um livro específico
router.delete('/:_id', async (req, res) => {
    try {
        const codigo = req.params.id;
        const resultado = await excluir(codigo);
        if (resultado.deletedCount === 0) {
            res.status(404).json({ message: 'Livro não encontrado' });
        } else {
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
