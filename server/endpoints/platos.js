const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const verificarTokenAdmin = middlewares.verificarTokenAdmin;
const obtenerPlatos = middlewares.obtenerPlatos;
const agregarPlato = middlewares.agregarPlato;
const modificarPlato = middlewares.modificarPlato;
const eliminarPlato = middlewares.eliminarPlato;

router.post('/platos', verificarTokenAdmin, agregarPlato, (req, res) =>{
    res.status(201).send({message: `El plato '${res.plato}' ha sido agregado.`});
})

router.put('/platos', verificarTokenAdmin, modificarPlato, (req, res) =>{
    res.status(200).send({message:`El plato '${res.plato}' ha sido modificado.`});
})

router.get('/platos', async (req, res) => {
    res.status(200).send(await obtenerPlatos());    
});

router.get('/platos/:id', verificarTokenAdmin, async (req, res) => {
    res.status(200).send(await obtenerPlatosPorId());
});

router.delete('/platos/:id', verificarTokenAdmin, async (req, res) =>{
    const id = req.params.id;
    const eliminar = await eliminarPlato(id);
    if (eliminar){
        res.status(200).send({message:`El plato con id:'${id}' ha sido eliminado.`});
    }else{
        res.status(400).send({error: `Ha ocurrido un error al intentar eliminar el plato con id:'${id}'`});

    }
})

module.exports = router;