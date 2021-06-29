const knex = require('../connection');
const bcrypt = require("bcrypt");
const { validarCadastro, validarEdicao } = require('../validations/usuario');
const validarEmail = require('../validations/email');

const cadastrarUsuario = async (req, res) => {
   const { nome, nome_loja, email, senha } = req.body;

   const erro = validarCadastro(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   try {
      const emailExiste = await validarEmail(email);
      if (emailExiste) return res.status(400).json({ erro: emailExiste });

      const cryptSenha = await bcrypt.hash(senha, 10);
      const novoUsuario = {
         nome,
         nome_loja,
         email,
         senha: cryptSenha,
      }
      const { rowCount } = await knex('usuarios').insert(novoUsuario).debug();
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível se cadastrar' });

      return res.status(200).json({ sucesso: 'Usuário cadastrado com sucesso!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const mostrarPerfil = async (req, res) => {
   const { usuario } = req;

   try {
      const perfil = await knex('usuarios').where('id', usuario.id).first().debug();

      return res.status(200).json(perfil);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const editarPerfil = async (req, res) => {
   const { usuario } = req;
   const { nome, nome_loja, email, senha } = req.body;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   try {
      const emailExiste = await validarEmail(email);
      if (emailExiste) return res.status(400).json({ erro: emailExiste });

      let novosDados;
      if (senha) {
         const cryptSenha = await bcrypt.hash(senha, 10);
         novosDados = await knex('usuarios').update({ nome, nome_loja, email, senha: cryptSenha }).where({ id: usuario.id }).debug();
      } else {
         novosDados = await knex('usuarios').update(req.body).where({ id: usuario.id }).debug();
      }

      if (novosDados.rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível atualizar este produto' });

      return res.status(200).json({ sucesso: 'Usuário atualizado com sucesso!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

module.exports = {
   cadastrarUsuario,
   mostrarPerfil,
   editarPerfil
}