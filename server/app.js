const express = require ('express');
const app = express();
const usuariosRouter = require ('./endpoints/usuarios');
const platosRouter = require ('./endpoints/platos');
const ordenesRouter = require ('./endpoints/ordenes');

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
})
  
app.use(express.json(), usuariosRouter, platosRouter, ordenesRouter);

app.use((err, req, res, next) => {
    if (err){
        res.status(500).send({error: 'Error interno del servidor'});
        console.log(err);
    }
    next();
})

module.exports = app;