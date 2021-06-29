const validarLogin = ({ email, senha }) => {
   if (!email || email === '') return 'Campo email é obrigatório';
   if (!senha || senha === '') return 'Campo senha é obrigatório';
};

module.exports = { validarLogin };