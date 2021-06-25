# delilah_resto
**Una REST API que provee un sistema de pedidos online para un restaurante. 
Realiza CRUD de usuarios, ordenes y productos utilizando Node.js, MySQL, Swagger y JavaScript.**

# ¿Qué herramientas usé para este proyecto?

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Sequelize](https://sequelize.org/)
- [Nodemon](https://nodemon.io/)
- [Postman](https://www.postman.com/)

# Más información sobre la API!

[Swaggerhub.](https://app.swaggerhub.com/apis/maxiturchet/delila_resto/1.0.0)

# ¿Cómo correr la API localmente?

Para lograr correr la API de forma local es necesario contar con [XAMPP](https://www.apachefriends.org/index.html).
Luego de descargarlo tenés que iniciar el servidor Apache y la base de datos MySQL presionando en "start" en cada uno.
Luego, presionando en "admin" en MySQL se abrirá una página de PHPMyAdmin con la base de datos.

## Bajar el repositorio a mi computadora:

En el respositorio `https://github.com/maxiturchet/delilah_resto.git` presionar en el botón verde que dice "Code".
- Si tenés la versión de escritorio de GitHub: podés clonar el respositorio y abrirlo desde tu editor de código.
- Si no tenés la versión de escritorio de GitHub: podés descargar el zip directamente con todos los archivos 
y arrastrarlos a tu editor de código.

## Instalar las dependencias y paquetes

Estando en el editor de código con el repositorio agregado, abrir la terminal en la carpeta [Server](https://github.com/maxiturchet/delilah_resto/tree/main/server). 
Podés hacer esto haciendo click derecho en el archivo y presionando en la opción "Open in integrated Terminal".
Para poder agregar la carpeta "node_modules" y disponer de los paquetes necesarios para usar el servicio tenés que escribir en la terminal:

`npm i`

## Configurar la base de datos

1. Es necesario editar el archivo [sequelize.js](https://github.com/maxiturchet/delilah_resto/blob/main/database/config/sequelize.js)
y cambiar los datos para que coincida con tu configuración, la estructura es
(**mysql://user:password@host:port/database**).

2. Ahora es necesario exportar en PHPMyAdmin los datos de la base de datos. También podés agregar tus propios datos, pero exportar
la base de datos te dará una idea de como está organizada la base de datos. [delilah_resto.sql](https://github.com/maxiturchet/delilah_resto/blob/main/database/sql_queries/delilah_resto.sql).

## Hora de correr el servidor!

Teniendo abierta la terminal en la carpeta [Server](https://github.com/maxiturchet/delilah_resto/tree/main/server) escribir:

`nodemon app.js`

Debe decir que el "Servidor está corriendo en el puerto 3000" y que esta "Conectado a Sequelize".

## Prueba de los endpoints en Postman

Por último queda descargar y correr Postman, ahí vas a poder realizar todas las peticiones a la API.

