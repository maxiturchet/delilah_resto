const express = require ('express');
const myDataBase = require('../../database/config/sequelize');
const { sequelize } = require('../../database/config/sequelize');
const token = require ('../jwt/token');
const estados = require ('../endpoints/estados');
const e = require('express');
const estadoOrden = estados.ordenEstado;

                                            /* Middlewares de Usuarios */

async function obtenerUsuarios(){
    try{
        const selectUsuarios = await myDataBase.sequelize.query('SELECT * FROM usuarios',
                                                                {type: myDataBase.sequelize.QueryTypes.SELECT});
        return selectUsuarios;
    }catch(err){
        console.log(err);
    }
}

async function buscarUsuario(usuario, password){
    try{
        const datosUsuario = await myDataBase.sequelize.query('SELECT usuario, email, password, admin, id_usuario FROM usuarios WHERE usuario = :unUsuario AND password = :unaPassword', 
                                                            {replacements: {unUsuario: usuario, unaPassword: password}, type: myDataBase.sequelize.QueryTypes.SELECT});
        return datosUsuario;
    }catch(err){
        console.log(err);
    }
}

async function buscarUsuarioPorNombre(usuario) {
    try{
        const datosUsuario = await myDataBase.sequelize.query('SELECT * FROM usuarios WHERE usuario = :unUsuario',
                                                          {replacements: {unUsuario: usuario}, type: myDataBase.sequelize.QueryTypes.SELECT});
        return datosUsuario;
    }catch(err){
        console.log(err);
    }
}

async function buscarUsuarioPorId(id) {    
    try{
        const idUsuario = await myDataBase.sequelize.query('SELECT * FROM usuarios WHERE id_usuario = :unId',
                                                            {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT});
        return idUsuario;
    }catch(err){
        console.log(err);
    }
}
 
async function borrarUsuario(id) {
    try{
        const usuarioEliminado = await myDataBase.sequelize.query('DELETE FROM usuarios WHERE id_usuario = :unId',
                                                                {replacements: {unId: id}});
        return usuarioEliminado;
    }catch(err){
        console.log(err);
    }
}

async function registroUsuario (req, res, next) {
    try{
        const {usuario, nombre, email, telefono, direccion, password, admin} = req.body;
        const usuarios = await buscarUsuarioPorNombre(usuario);
        if(usuarios.length != 0){
            return res.status(409).send({error:'El nombre de usuario ingresado ya está en uso'});
        }else{
            if (!usuario || !nombre || !email || !telefono || !direccion || !password){
                return res.status(400).send({error:'Parámetros incorrectos o faltantes'});
            }else{
                const nuevoRegistro = await myDataBase.sequelize.query('INSERT INTO usuarios (usuario, nombre_completo, email, telefono, direccion, password) ' 
                                                + `VALUES ('${usuario.trim()}','${nombre}','${email}','${telefono}','${direccion}','${password}')`);
                res.registro = usuario;
                console.log(nuevoRegistro);
                return next();
            }
        }
    }catch(err){
       console.log('Hay un error: ' + err);
    }
}

async function validarDatos(req, res, next){
    try{
        const {usuario, password} = req.body;
        const usuarios = await buscarUsuario(usuario, password);
        let jwt;
        if(usuarios.length !=0){
            console.log(usuarios);
            const jwtClave = token.jwtClave;
            jwt = token.jwt.sign({usuario: usuario, email: usuarios[0].email}, jwtClave, {expiresIn: 1000});
            res.jwt = jwt;
            return next()
        }else{
            return jwt = 0;
        }
    }catch(err){
        res.status(400).send({error: 'Usuario o contraseña inválidos o inexistentes'});
        console.log(err);
    }
}

async function verificarTokenAdmin(req, res, next) {
    try{
        const tkn = req.headers.authorization.split(" ")[1];
        console.log(tkn);
        console.log('Validar Token Name: ' + token.jwt.verify(tkn, token.jwtClave))
        const validarTokenAdmin = token.jwt.verify(tkn, token.jwtClave);
        console.log('Validar Token: ', validarTokenAdmin);
        const buscar = await buscarUsuarioPorNombre(validarTokenAdmin.usuario);
        if(buscar.length > 0 && buscar[0].admin === 1){
            return next();
        }else{
            res.status(403).send({error:'No tiene los permisos necesarios'});
        }
    }catch (err) {
        if(err.name == 'TokenExpiredError'){        
            res.status(401).send({error: 'Token expirado'})
        }else{
            res.status(400).send({error: 'Token inválido'})
        }
        console.log(err);
    }
}

async function verificarTokenUsuario(req, res, next){
    try{
        const tkn = req.headers.authorization.split(' ')[1];
        console.log(tkn);
        const validarTokenUsuario = token.jwt.verify(tkn, token.jwtClave);
        console.log('Validar Token: ', validarTokenUsuario);
        console.log('1')
        const verificar = await buscarUsuarioPorNombre(validarTokenUsuario.usuario);
        if(verificar.length > 0){
            console.log(verificar[0].usuario)
            res.usuario = verificar[0].usuario
            return next()
        }else{
            res.status(401).send({error: 'Usuario o contraseña incorrectos.'})
        }
    }catch(err){
        if(err.name == 'TokenExpiredError'){        
            res.status(401).send({error: 'Token expirado'})
        }else{
            res.status(400).send({error: 'Token inválido'})
        }
        console.log(err);
    }
}

                                            /*Middlewares platos*/
async function buscarPlato(nombrePlato){
    try{ 
        const plato = await myDataBase.sequelize.query('SELECT * FROM platos WHERE nombre_plato = :unPlato',
                                                        {replacements: {unPlato: nombrePlato}, type: myDataBase.sequelize.QueryTypes.SELECT});
        console.log(plato);
        return plato;
    }catch(err){
        console.log(err);
    }
}

async function buscarPlatoPorId(id){
    try{ 
        console.log(id)
        const plato = await myDataBase.sequelize.query('SELECT * FROM platos WHERE id_plato = :unId ',
                                                {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT});
        console.log(plato);
        return plato;
    }catch(err){
        console.log(err);
    }
}
                                            
async function obtenerPlatos(){
    try{
        const selectPlatos = await myDataBase.sequelize.query(`SELECT * FROM platos`,
                                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return selectPlatos;
    }catch(err){
        console.log(err);
    }
}

async function modificarPlato(req, res, next){
    try{
        const {id_plato, nombre, precio, img, descripcion} = req.body;
        console.log('PRECIO: ' + precio)
        const busquedaPlato = await buscarPlatoPorId(id_plato);
        if(busquedaPlato.length != 0){
            if(busquedaPlato[0].nombre_plato == nombre && busquedaPlato[0].precio_plato == precio && 
                busquedaPlato[0].img_url && img && busquedaPlato[0].descripcion == descripcion){
                res.status(400).send({error: 'Los datos que intenta agregar son idénticos a los existentes.'});
            }else{
                if(!nombre || !precio || !img || !descripcion){
                    res.status(404).send({error:'Parámetros nulos o inexistentes.'})                                        
                }else{
                    const id = busquedaPlato[0].id_plato;
                    console.log(precio)
                    console.log('precio ' +precio)
                    const precioStr = '$' + precio;
                    const actualizarPlato = await myDataBase.sequelize.query(`UPDATE platos SET nombre_plato = '${nombre}', precio_plato = '${precioStr}', 
                                                                        img_url = '${img}', descripcion = '${descripcion}' WHERE id_plato = '${id}'`);
                    res.plato = nombre;
                    return next(); 
                }                 
            }
        }else{
            res.status(400).send({error:'El plato que intenta modificar no existe.'})
        }
    }catch(err){
        console.log(err)
    }
}

async function agregarPlato(req, res, next){
    try{
        const {nombre, precio, img, descripcion} = req.body;
        const busquedaPlato = await buscarPlato(nombre);
        console.log(busquedaPlato);
        if(busquedaPlato.length != 0){
            res.status(400).send({error: 'El plato que intenta ingresar ya existe.'})
        }else{
            if(!nombre || !precio || !img || !descripcion){
                res.status(400).send({error:'Parámetros incorrectos o faltantes.'});
            }else{
                const agregarPlato = await myDataBase.sequelize.query('INSERT INTO platos (nombre_plato, precio_plato, img_url, descripcion) '
                                                            + `VALUE ('${nombre}', '$${precio}', '${img}', '${descripcion}')`);    
                res.plato = nombre;
                console.log(agregarPlato);
                return next();
            }
        }
    }catch(err){
        console.log(err);
    }
}

async function eliminarPlato(id){
    try{
        const platoEliminado = myDataBase.sequelize.query('DELETE FROM platos WHERE id_plato = :unId',
                                                {replacements: {unId: id}});
        return platoEliminado;
    }catch (err){
        console.log(err);
    }
}

                                            /*Middlewares Ordenes*/

async function nuevaOrden (req, res, next){
    try{
        const {usuario, platos, medioDePago} = req.body;
        const nombreUsuario = res.usuario;
        const buscar = await buscarUsuarioPorNombre(nombreUsuario);
        const idUsuario = buscar[0].id_usuario;
            if(usuario === nombreUsuario && platos != undefined && medioDePago != undefined){
                const estado = estadoOrden[0];
                let hora = new Date(Date.now());
                hora = hora.toString().substring(16, 24);
                let cadaPlato = platos.split(",");
                const totalOrden = await calcularTotalOrden(cadaPlato);
                const insertarOrden = await myDataBase.sequelize.query('INSERT INTO ordenes (estado, hora, descripcion, total, medio_pago, id_usuario) '
                                            + `VALUES ('${estado}', '${hora}', '${totalOrden.descripcion}', '${totalOrden.total}', '${medioDePago}', '${idUsuario}')`);
                res.orden = insertarOrden;
                insertarOrdenesPlatos (cadaPlato, insertarOrden);
                next();
            }else{
                res.status(401).send({error: 'Parámetros Incorrectos'});
            }
    }catch(err){
        console.log(err);
    }
}

async function calcularTotalOrden (pedido){
    try{ 
        let plato = [];
        let totalOrden;
        let total = 0;
        let concatPlatos = '';
        for(i = 0; i < pedido.length; i++){
            const platoExiste = await buscarPlato(pedido[i].substring(3));
            let cantidadPlatos = pedido[i].substring(0);
            cantidadPlatos = parseInt(cantidadPlatos);
            plato.push(platoExiste[0].nombre_plato);
            if(plato == pedido[i].substring(3)){
                plato.shift();
                const precioPlato = parseInt(platoExiste[0].precio_plato.substring(1));
                const subtotal = precioPlato * cantidadPlatos;
                const nombre = `${pedido[i]}, `;
                total += subtotal;
                concatPlatos += nombre;
            } 
        }
        totalOrden = {
            descripcion: concatPlatos, 
            total: total
        };
        console.log('Total Orden:', totalOrden);
        return totalOrden;
    }catch(err){
        console.log(err);
    }
}

async function insertarOrdenesPlatos (platos, ordenId){
    try{ 
        for(i = 0; i < platos.length; i++){
            console.log(platos.length)
            const buscar = await buscarPlato(platos[i].substring(3))
            const idPlato = buscar[0].id_plato;
            const nombrePlato = buscar[0].nombre_plato; 
            let cantidadPlatos = platos[i].substring(0);
            cantidadPlatos = parseInt(cantidadPlatos);
            const precioPlato = buscar[0].precio_plato.substring(1);
            const insertarOrdenesPlatos = await myDataBase.sequelize.query('INSERT INTO ordenes_platos (id_orden, id_plato, nombre_plato, cantidad_platos, precio_plato) '
                                                                + `VALUES ('${ordenId}', '${idPlato}', '${nombrePlato}', '${cantidadPlatos}', '${precioPlato}')`);
        }
    }catch(err){
        console.log(err);
    }
}

async function buscarOrdenesPorUsuarioId(id){
    const buscar = await myDataBase.sequelize.query('SELECT * FROM ordenes WHERE id_usuario = :unId',
                                                    {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT});
    return buscar;
}

async function obtenerOrdenes(){
    const obtenerPedidos = await myDataBase.sequelize.query('SELECT * FROM ordenes',
                                                        {type: myDataBase.sequelize.QueryTypes.SELECT});

    return obtenerPedidos;
}

async function obtenerOrdenPorId (id){
    const buscarId = await myDataBase.sequelize.query('SELECT * FROM ordenes WHERE id_orden = :unId',
                                                    {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT});
    return buscarId;
}

async function cambiarEstadoOrden(req, res, next){
    try{ 
        const {id_orden, estado} = req.body;
        const encontrarId = await buscarOrden(id_orden);
        if(estadoOrden.indexOf(estado) >= 0 && encontrarId.length >= 0 && estado != encontrarId[0].estado){
            const cambiarEstado = await myDataBase.sequelize.query(`UPDATE ordenes SET estado = '${estado}' WHERE id_orden = '${id_orden}'`);
            res.id = id_orden;
            return next();
        }else{
            res.status(400).send({error: `El estado que intenta ingresar es inválido o ya está en uso.`});
        }
    }catch(err){
        console.log(err);
    }
}

async function eliminarOrden(id){
    try{ 
        const eliminarRestrict = await myDataBase.sequelize.query('DELETE FROM ordenes_platos WHERE id_orden = :unId ',
                                                                {replacements: {unId: id}});
        const eliminar = await myDataBase.sequelize.query('DELETE FROM ordenes WHERE id_orden = :unId ',
                                                                {replacements: {unId: id}});
        return eliminar;
    }catch(err){
        console.log(err);
    }
}

/*Detalle de las Ordenes por Id de Usuario y por Id de Orden*/

async function obtenerOrdenCompletaUsuario(req, res, next){
    try{
        const nombreUsuario = req.params.nombre
        console.log(nombreUsuario)
        const tkn = req.headers.authorization.split(' ')[1];
        const validarTokenUsuario = token.jwt.verify(tkn, token.jwtClave);
        const idUsuario = await buscarUsuarioPorNombre(nombreUsuario);
        if(nombreUsuario === validarTokenUsuario.usuario){
            const buscarOrden = await buscarOrdenesPorUsuarioId(idUsuario[0].id_usuario);
            let ordenesUsuario = []
            if(buscarOrden.length != 0){
                for(i = 0; i < buscarOrden.length; i++){
                    const ordenCompleta = await obtenerOrdenCompleta(buscarOrden[i].id_orden);
                    ordenesUsuario.push(ordenCompleta);
                }
                console.log('ORDEN COMPLETA USUARIO: ', ordenesUsuario)
                res.orden = ordenesUsuario
                return next()           
            }else(
                res.status(404).send({error: `El usuario ${nombreUsuario} no tiene ordenes realizadas`})
            )
        }else{
            res.status(403).send({message: `El token no coincide con el usuario.`})
        }
    }catch(err){
        console.log(err);
    }
}

async function obtenerOrdenCompleta(id){
    try{
        let buscarOrden = await myDataBase.sequelize.query(`SELECT * FROM ordenes INNER JOIN ordenes_platos ON 
                                                ordenes.id_orden = ordenes_platos.id_orden WHERE ordenes.id_orden = :unId`,
                                                {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT});
        console.log("ORDENES: " + JSON.stringify(buscarOrden[0]));
        console.log("ORDENES: " + JSON.stringify(buscarOrden[1]));
        const platos = await myDataBase.sequelize.query(`SELECT DISTINCT * FROM platos
                                                    INNER JOIN ordenes_platos ON ordenes_platos.id_plato = platos.id_plato 
                                                    WHERE ordenes_platos.id_orden = '${buscarOrden[0].id_orden}'`,
                                                    {type: myDataBase.sequelize.QueryTypes.SELECT});
        let listaPlatos = await Promise.all(platos);
            console.log("LISTA PLATOS " + JSON.stringify(listaPlatos));
        const usuario = await myDataBase.sequelize.query(`SELECT * FROM usuarios WHERE usuarios.id_usuario = '${buscarOrden[0].id_usuario}'`,
                                                        {type: myDataBase.sequelize.QueryTypes.SELECT});
        const detalle = {
                "usuario": usuario[0].usuario,
                "direccion": usuario[0].direccion,
                "email": usuario[0].email,
                "telefono": usuario[0].telefono,
                "estado": buscarOrden[0].estado,
                "total": buscarOrden[0].total,
                "medio_pago": buscarOrden[0].medio_pago,
                "platos": platos
        }
        console.log("DETALLE " + JSON.stringify(detalle));
        return detalle
    }catch(err){
        console.log(err);
    }
}

module.exports = {
                /*Middlewares Usuarios*/
                registroUsuario, obtenerUsuarios, buscarUsuario,
                buscarUsuarioPorNombre, buscarUsuarioPorId, borrarUsuario,
                validarDatos, verificarTokenAdmin, verificarTokenUsuario,
                 
                /*Middlewares Platos*/
                obtenerPlatos, buscarPlatoPorId, agregarPlato, buscarPlato,
                modificarPlato, eliminarPlato,
                
                /*Middlewares Ordenes*/
                nuevaOrden, obtenerOrdenes, obtenerOrdenPorId, obtenerOrdenCompleta, obtenerOrdenCompletaUsuario, cambiarEstadoOrden, eliminarOrden}