const validarCadastro = ({ nome, estoque, preco, descricao }) => {
   if (!nome || nome === '') return 'Campo nome é obrigatório';
   if (!estoque || estoque === '') return 'Campo estoque é obrigatório';
   if (!preco || preco === '') return 'Campo preco é obrigatório';
   if (!descricao || descricao === '') return 'Campo descricao é obrigatório';
}

const validarEdicao = ({ nome, estoque, preco, descricao }) => {
   if (nome === null) return 'Campo nome não pode ser vazio';
   if (estoque === null || estoque === '') return 'Campo estoque não pode ser vazio';
   if (preco === null || preco === '') return 'Campo preco não pode ser vazio';
   if (descricao === null || descricao === '') return 'Campo descricao não pode ser vazio';
}

module.exports = {
   validarCadastro,
   validarEdicao,
};