const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const verificarTokenUsuario = middlewares.verificarTokenUsuario;
const verificarTokenAdmin = middlewares.verificarTokenAdmin;
const nuevaOrden = middlewares.nuevaOrden;
const cambiarEstadoOrden = middlewares.cambiarEstadoOrden;
const eliminarOrden = middlewares.eliminarOrden;
const obtenerOrdenes = middlewares.obtenerOrdenes;
const obtenerOrdenCompleta = middlewares.obtenerOrdenCompleta;
const obtenerOrdenCompletaUsuario = middlewares.obtenerOrdenCompletaUsuario;
const validarDatos = middlewares.validarDatos;

router.post('/ordenes', verificarTokenUsuario, nuevaOrden, (req, res) =>{
     res.status(201).send({message: 'Nueva orden realizada.'});
})

router.put('/ordenes', verificarTokenAdmin, cambiarEstadoOrden, (req, res) =>{
     res.status(200).send({message: `Estado de la orden id: ${res.id} actualizado.`});
})

router.get('/ordenes', verificarTokenAdmin, async (req, res) =>{
     res.status(200).send(await obtenerOrdenes());
})

router.get('/ordenes/usuario/:nombre', verificarTokenUsuario, obtenerOrdenCompletaUsuario, (req, res) =>{
     const orden = res.orden;
     if(!orden){          
          res.status(400).send({error: 'Parámetros incorrectos o faltantes.'});
     }else{
          res.status(200).send(orden);
     }
})

router.get('/ordenes/:id', verificarTokenAdmin, async (req, res) =>{
     const id = req.params.id;
     const obtenerOrden = await obtenerOrdenCompleta(id);
     console.log('OBTENER ORDEN ', obtenerOrden)
     if(!obtenerOrden.usuario || !obtenerOrden.direccion || !obtenerOrden.email || !obtenerOrden.telefono ||
          !obtenerOrden.estado || !obtenerOrden.total || !obtenerOrden.medio_pago || !obtenerOrden.platos){
          res.status(400).send({error: 'Parámetros incorrectos o faltantes.'});
     }else{
          res.status(200).send(obtenerOrden);
     }
})


router.delete('/ordenes/:id', verificarTokenAdmin, async (req, res) =>{
     const id = req.params.id;
     const borrado = await eliminarOrden(id);
     if(borrado){
          console.log(`Orden id: ${id} ha sido eliminada con éxito.`);
          res.status(200).send({message: `Orden id: ${id} ha sido eliminada con éxito.`});
      }else{
          res.status(400).send({error: `Ha ocurrido un error al intentar eliminar la orden id: ${id}`});
      }
})

module.exports = router;