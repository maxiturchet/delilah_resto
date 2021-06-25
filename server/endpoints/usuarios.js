const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const registroUsuario = middlewares.registroUsuario;
const validarDatos = middlewares.validarDatos;
const verificarTokenAdmin = middlewares.verificarTokenAdmin;
const obtenerUsuarios = middlewares.obtenerUsuarios;
const buscarUsuarioPorId = middlewares.buscarUsuarioPorId;
const borrarUsuario = middlewares.borrarUsuario;
const buscarUsuarioPorNombre = middlewares.buscarUsuarioPorNombre;

router.post('/usuarios/registro', registroUsuario, (req, res) => {
    res.status(201).send({Ok:`El usuario '${res.registro}' ha sido ingresado.`});
});

router.post('/usuarios/ingreso', validarDatos, (req, res) => {
    token = res.jwt;
    res.status(201).send({token: token});
});

router.get('/usuarios', verificarTokenAdmin, async (req, res) => {
    res.status(200).send(await obtenerUsuarios());
});

router.get('/usuarios/:id', verificarTokenAdmin, async (req, res) =>{
    const id = req.params.id;
    res.status(200).send(await buscarUsuarioPorId(id));
})

router.delete('/usuarios/:id', verificarTokenAdmin, async (req, res) =>{
    const id = req.params.id;
    const buscar = await buscarUsuarioPorId(id);
    if(buscar.length !=0){
        const borrado = await borrarUsuario(id);
        if(borrado){
            console.log(`El usuario con id:'${id}' ha sido eliminado.`);
            res.status(200).send({message: `Usuario con id:'${id}' ha sido eliminado.`});
        }else{
            res.status(400).send({error: `Ha ocurrido un error al intentar eliminar al usuario con id:'${id}'`});
        }
    }else{
        res.status(400).send({error: 'El usuario que intenta eliminar no existe.'})
    }
});

module.exports = router;