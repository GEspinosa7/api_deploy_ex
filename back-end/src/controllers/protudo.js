const knex = require('../connection');
const { validarCadastro, validarEdicao } = require('../validations/produto');
const { filtrarProdutos, encontrarProduto } = require('../intermediaries/produto');

const listarProdutos = async (req, res) => {
   const { usuario } = req;
   const { categoria, preco } = req.query;

   try {
      const { values, queryParams } = filtrarProdutos({ categoria, preco }, [], [usuario.id]);
      let produtos;

      if (queryParams.length === 1) {
         produtos = await knex('produtos').where('usuario_id', usuario.id).debug();
      } else {
         produtos = await knex('produtos').whereRaw(`usuario_id = ?${values.join("")}`, queryParams).debug();
      }

      return res.status(200).json(produtos);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const obterProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      return res.status(200).json(produto);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const cadastrarProduto = async (req, res) => {
   const { usuario } = req;
   const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

   const erro = validarCadastro(req.body);
   if (erro) return res.status(400).json({ Erro: erro });

   try {
      const novoProduto = {
         usuario_id: usuario.id,
         nome,
         estoque,
         categoria,
         preco,
         descricao
      }

      const { rowCount } = await knex('produtos').insert(novoProduto).debug().returning(['id', 'nome']);
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível cadastrar este produto' });

      return res.status(200).json({ Sucesso: 'Produto cadastrado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const editarProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ Erro: erro });

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      const { rowCount } = await knex('produtos').update(req.body).where({ id, usuario_id: usuario.id }).debug();
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível atualizar este produto' });

      return res.status(200).json({ Sucesso: 'Produto atualizado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const deletarProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      const { rowCount } = await knex('produtos').del().where({ id, usuario_id: usuario.id }).debug();
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível apagar este produto' });

      return res.status(200).json({ Sucesso: 'Produto apagado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

module.exports = {
   listarProdutos,
   obterProduto,
   cadastrarProduto,
   editarProduto,
   deletarProduto
}
