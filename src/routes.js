const express = require('express');
const { login } = require('./controllers/login');
const { listarProdutos, obterProduto, cadastrarProduto, deletarProduto, editarProduto } = require('./controllers/protudo');
const { cadastrarUsuario, mostrarPerfil, editarPerfil } = require('./controllers/usuario');
const loginAuth = require('./filters/login_auth');

const router = express();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);

router.use(loginAuth);

router.get('/perfil', mostrarPerfil);
router.put('/perfil', editarPerfil);
router.get('/produtos', listarProdutos);
router.get('/produtos/:id', obterProduto);
router.post('/produtos', cadastrarProduto);
router.put('/produtos/:id', editarProduto);
router.delete('/produtos/:id', deletarProduto);

module.exports = router;