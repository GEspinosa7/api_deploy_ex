const validarCadastro = ({ nome, nome_loja, email, senha }) => {
   if (!nome || nome === '') return 'Campo nome é obrigatório';
   if (!nome_loja || nome_loja === '') return 'Campo nome_loja é obrigatório';
   if (!email || email === '') return 'Campo email é obrigatório';
   if (!senha || senha === '') return 'Campo senha é obrigatório';
}

const validarEdicao = ({ nome, nome_loja, email, senha }) => {
   if (nome === null || nome === '') return 'Campo nome não pode ser vazio';
   if (nome_loja === null || nome_loja === '') return 'Campo nome_loja não pode ser vazio';
   if (email === null || email === '') return 'Campo email não pode ser vazio';
   if (senha === null || senha === '') return 'Campo senha não pode ser vazio';
}




module.exports = { validarCadastro, validarEdicao };