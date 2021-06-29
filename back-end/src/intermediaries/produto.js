const knex = require('../connection');

const filtrarProdutos = ({ categoria, preco }, values, queryParams) => {
   if (categoria) {
      values.push(` and categoria = ?`);
      queryParams.push(categoria);
   }

   if (preco) {
      values.push(` and preco >= ?`);
      queryParams.push(preco);
   }
   return { values, queryParams };
};


const encontrarProduto = async (id, usuario_id) => {
   const produto = await knex('produtos').where({
      id: id,
      usuario_id: usuario_id
   }).first().debug();

   if (!produto) return 'Este produto não existe ou não pertence a sua loja';

   return produto;
};

module.exports = { filtrarProdutos, encontrarProduto };