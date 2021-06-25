const Sequelize = require('sequelize');
const host = 'localhost';
const name = 'delilah_resto';
const port = '3306';
const username = 'root';
const pass = '';
const path = `mysql://${username}:${pass}@${host}:${port}/` + name;
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() =>{
    console.log('Conectado sequelize...');
}).catch(err =>{
    console.error('Error de conexion:', err);
});

const myDataBase = { Sequelize: Sequelize,
    sequelize: sequelize };


module.exports = myDataBase;

