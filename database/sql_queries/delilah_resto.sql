-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2021 a las 02:37:48
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id_orden` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `hora` varchar(15) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `total` int(15) NOT NULL,
  `medio_pago` varchar(50) NOT NULL,
  `id_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id_orden`, `estado`, `hora`, `descripcion`, `total`, `medio_pago`, `id_usuario`) VALUES
(1, 'Cancelado', '15:52:27', '1x sandwich focaccia, 2x hamburguesa clasica, 1x s', 2130, 'tarjeta', 3),
(2, 'Nuevo', '17:56:00', '2x bagel de salmon, 1x hamburguesa clasica, ', 1200, 'mercadoPago', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_platos`
--

CREATE TABLE `ordenes_platos` (
  `id_ordenes_platos` int(10) NOT NULL,
  `id_orden` int(10) NOT NULL,
  `id_plato` int(10) NOT NULL,
  `nombre_plato` varchar(50) NOT NULL,
  `cantidad_platos` int(10) NOT NULL,
  `precio_plato` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenes_platos`
--

INSERT INTO `ordenes_platos` (`id_ordenes_platos`, `id_orden`, `id_plato`, `nombre_plato`, `cantidad_platos`, `precio_plato`) VALUES
(1, 1, 6, 'sandwich focaccia', 1, 440),
(2, 1, 2, 'hamburguesa clasica', 2, 350),
(3, 1, 3, 'sandwich veggie', 1, 310),
(4, 1, 4, 'ensalada veggie', 2, 340),
(5, 2, 1, 'bagel de salmon', 2, 425);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id_plato` int(10) NOT NULL,
  `nombre_plato` varchar(55) NOT NULL,
  `precio_plato` varchar(5) NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `descripcion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id_plato`, `nombre_plato`, `precio_plato`, `img_url`, `descripcion`) VALUES
(1, 'bagel de salmon', '$555', 'URL', 'bagel de salmon'),
(2, 'hamburguesa clasica', '$350', 'URL', 'Hamburguesa Clásica'),
(3, 'sandwich veggie', '$310', 'URL', 'Sandwich veggie'),
(4, 'ensalada veggie', '$340', 'URL', 'Ensalada veggie'),
(5, 'focaccia', '$300', 'URL', 'Focaccia'),
(6, 'sandwich focaccia', '$440', 'URL', 'Sandwich Focaccia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(15) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre_completo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `admin` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `nombre_completo`, `email`, `telefono`, `direccion`, `password`, `admin`) VALUES
(1, 'maxiturchet', 'Maximiliano Turchet', 'maxiturchet@delilah.com', '123456', 'San Martin 2020', '123456', 1),
(2, 'micarivarola', 'Micaela Rivarola', 'micarivarola@delilah.com', '234567', 'Sarmiento 1010', '234567', 0),
(3, 'brunitoturchet', 'Bruno Turchet', 'brunoturchet@delilah.com', '345678', 'Moreno 3030', '345678', 0),
(4, 'nicolarrory', 'Nicolas Larrory', 'nicolaslarrory@delilah.com', '456789', 'Belgrano 4040', '456789', 0),
(5, 'nelsi777', 'Nelson Buchs', 'nelsibuchs@frentedetodos.com', '567891', 'Juan Domingo Perón 1122', '567891', 0),
(6, 'josegalindo120', 'Jose Ignacio Galindo', 'joseigalindo@gmail.com', '156984315', 'evoUsuario.direion}', '444222111', 0),
(7, 'JLBorges', 'Jorge Luis Borges', 'jlborges@delilah.com', '15556688', 'Jorge Luis Borges 2020', '654321', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `ordenes_platos`
--
ALTER TABLE `ordenes_platos`
  ADD PRIMARY KEY (`id_ordenes_platos`),
  ADD KEY `id_plato` (`id_plato`),
  ADD KEY `id_orden` (`id_orden`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id_plato`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ordenes_platos`
--
ALTER TABLE `ordenes_platos`
  MODIFY `id_ordenes_platos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id_plato` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `ordenes_platos`
--
ALTER TABLE `ordenes_platos`
  ADD CONSTRAINT `id_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id_orden`),
  ADD CONSTRAINT `id_plato` FOREIGN KEY (`id_plato`) REFERENCES `platos` (`id_plato`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
