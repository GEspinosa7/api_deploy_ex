const knex = require('../connection');

const validarEmail = async (email) => {
   const usuario = await knex('usuarios').where('email', email);
   if (usuario.length > 0) return 'Este email ja está cadastrado';
};

module.exports = validarEmail;