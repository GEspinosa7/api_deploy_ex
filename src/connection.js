const knex = require('knex')({
   client: 'pg',
   connection: {
      host: 'ec2-52-23-45-36.compute-1.amazonaws.com',
      user: 'jtfujhrqsfaxhj',
      password: '9116348f7762156f66971fb7ef49e9da2f2359ab028b0f4ecaaf6ca0f7d66143',
      database: 'desl4851dot0p8',
      port: 5432,
      ssl: {
         rejectUnauthorized: false
      }
   }
});

module.exports = knex;