-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-10-2025 a las 03:45:47
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_directorio`
--
CREATE DATABASE IF NOT EXISTS `db_directorio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_directorio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsim_categoria`
--

DROP TABLE IF EXISTS `tsim_categoria`;
CREATE TABLE `tsim_categoria` (
  `id_categoria` int(11) NOT NULL,
  `dsc_nombre` varchar(255) NOT NULL,
  `dsc_imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tsim_categoria`
--

INSERT INTO `tsim_categoria` (`id_categoria`, `dsc_nombre`, `dsc_imagen`) VALUES
(1, 'Restaurantes', NULL),
(2, 'Hoteles', NULL),
(3, 'Tiendas de ropa', NULL),
(4, 'Barberías', NULL),
(5, 'Entretenimiento', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsim_comercio`
--

DROP TABLE IF EXISTS `tsim_comercio`;
CREATE TABLE `tsim_comercio` (
  `id_comercio` int(11) NOT NULL,
  `dsc_nombre` varchar(255) NOT NULL,
  `dsc_descripcion` varchar(500) DEFAULT NULL,
  `dsc_direccion` varchar(500) DEFAULT NULL,
  `dsc_latitud` decimal(10,8) DEFAULT NULL,
  `dsc_longitud` decimal(11,8) DEFAULT NULL,
  `dsc_instagram` varchar(100) DEFAULT NULL,
  `dsc_facebook` varchar(100) DEFAULT NULL,
  `dsc_imagen_destacada` varchar(255) DEFAULT NULL,
  `fec_creacion` datetime DEFAULT current_timestamp(),
  `fec_modificacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsim_comercio_categoria`
--

DROP TABLE IF EXISTS `tsim_comercio_categoria`;
CREATE TABLE `tsim_comercio_categoria` (
  `id_comercio` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsim_producto`
--

DROP TABLE IF EXISTS `tsim_producto`;
CREATE TABLE `tsim_producto` (
  `id_producto` int(11) NOT NULL,
  `id_comercio` int(11) NOT NULL,
  `dsc_nombre` varchar(255) NOT NULL,
  `dsc_descripcion` varchar(500) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `dsc_imagen_destacada` varchar(255) DEFAULT NULL,
  `fec_creacion` datetime DEFAULT current_timestamp(),
  `fec_modificacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsim_rol`
--

DROP TABLE IF EXISTS `tsim_rol`;
CREATE TABLE `tsim_rol` (
  `id_rol` int(11) NOT NULL,
  `dsc_rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tsim_rol`
--

INSERT INTO `tsim_rol` (`id_rol`, `dsc_rol`) VALUES
(1, 'Administrador'),
(2, 'Editor'),
(3, 'Comerciante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_correo_comercio`
--

DROP TABLE IF EXISTS `tsit_correo_comercio`;
CREATE TABLE `tsit_correo_comercio` (
  `id_correo` int(11) NOT NULL,
  `id_comercio` int(11) NOT NULL,
  `dsc_correo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_imagen_comercio`
--

DROP TABLE IF EXISTS `tsit_imagen_comercio`;
CREATE TABLE `tsit_imagen_comercio` (
  `id_imagen` int(11) NOT NULL,
  `id_comercio` int(11) NOT NULL,
  `dsc_url` varchar(255) NOT NULL,
  `dsc_alt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_imagen_producto`
--

DROP TABLE IF EXISTS `tsit_imagen_producto`;
CREATE TABLE `tsit_imagen_producto` (
  `id_imagen` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `dsc_url` varchar(255) NOT NULL,
  `dsc_alt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_mensaje_contacto`
--

DROP TABLE IF EXISTS `tsit_mensaje_contacto`;
CREATE TABLE `tsit_mensaje_contacto` (
  `id_mensaje` int(11) NOT NULL,
  `id_comercio` int(11) NOT NULL,
  `dsc_nombre` varchar(255) NOT NULL,
  `dsc_telefono` varchar(50) DEFAULT NULL,
  `dsc_correo` varchar(255) DEFAULT NULL,
  `dsc_mensaje` text NOT NULL,
  `fec_envio` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_slider`
--

DROP TABLE IF EXISTS `tsit_slider`;
CREATE TABLE `tsit_slider` (
  `id_slider` int(11) NOT NULL,
  `dsc_titulo` varchar(255) NOT NULL,
  `dsc_descripcion` varchar(500) DEFAULT NULL,
  `dsc_imagen` varchar(255) NOT NULL,
  `dsc_enlace` varchar(255) DEFAULT NULL,
  `fec_creacion` datetime DEFAULT current_timestamp(),
  `fec_modificacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_telefono_comercio`
--

DROP TABLE IF EXISTS `tsit_telefono_comercio`;
CREATE TABLE `tsit_telefono_comercio` (
  `id_telefono` int(11) NOT NULL,
  `id_comercio` int(11) NOT NULL,
  `dsc_telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tsit_usuario`
--

DROP TABLE IF EXISTS `tsit_usuario`;
CREATE TABLE `tsit_usuario` (
  `id_usuario` int(11) NOT NULL,
  `dsc_username` varchar(255) NOT NULL,
  `dsc_correo` varchar(255) NOT NULL,
  `dsc_contrasenha` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_comercio` int(11) DEFAULT NULL,
  `fec_creacion` datetime DEFAULT current_timestamp(),
  `fec_modificacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tsim_categoria`
--
ALTER TABLE `tsim_categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tsim_comercio`
--
ALTER TABLE `tsim_comercio`
  ADD PRIMARY KEY (`id_comercio`),
  ADD KEY `idx_comercio_nombre` (`dsc_nombre`(100));

--
-- Indices de la tabla `tsim_comercio_categoria`
--
ALTER TABLE `tsim_comercio_categoria`
  ADD PRIMARY KEY (`id_comercio`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `tsim_producto`
--
ALTER TABLE `tsim_producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_comercio` (`id_comercio`),
  ADD KEY `idx_producto_nombre` (`dsc_nombre`(100));

--
-- Indices de la tabla `tsim_rol`
--
ALTER TABLE `tsim_rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tsit_correo_comercio`
--
ALTER TABLE `tsit_correo_comercio`
  ADD PRIMARY KEY (`id_correo`),
  ADD KEY `id_comercio` (`id_comercio`);

--
-- Indices de la tabla `tsit_imagen_comercio`
--
ALTER TABLE `tsit_imagen_comercio`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_comercio` (`id_comercio`);

--
-- Indices de la tabla `tsit_imagen_producto`
--
ALTER TABLE `tsit_imagen_producto`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `tsit_mensaje_contacto`
--
ALTER TABLE `tsit_mensaje_contacto`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_comercio` (`id_comercio`);

--
-- Indices de la tabla `tsit_slider`
--
ALTER TABLE `tsit_slider`
  ADD PRIMARY KEY (`id_slider`);

--
-- Indices de la tabla `tsit_telefono_comercio`
--
ALTER TABLE `tsit_telefono_comercio`
  ADD PRIMARY KEY (`id_telefono`),
  ADD KEY `id_comercio` (`id_comercio`);

--
-- Indices de la tabla `tsit_usuario`
--
ALTER TABLE `tsit_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tsim_categoria`
--
ALTER TABLE `tsim_categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tsim_comercio`
--
ALTER TABLE `tsim_comercio`
  MODIFY `id_comercio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsim_producto`
--
ALTER TABLE `tsim_producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsim_rol`
--
ALTER TABLE `tsim_rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tsit_correo_comercio`
--
ALTER TABLE `tsit_correo_comercio`
  MODIFY `id_correo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_imagen_comercio`
--
ALTER TABLE `tsit_imagen_comercio`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_imagen_producto`
--
ALTER TABLE `tsit_imagen_producto`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_mensaje_contacto`
--
ALTER TABLE `tsit_mensaje_contacto`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_slider`
--
ALTER TABLE `tsit_slider`
  MODIFY `id_slider` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_telefono_comercio`
--
ALTER TABLE `tsit_telefono_comercio`
  MODIFY `id_telefono` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tsit_usuario`
--
ALTER TABLE `tsit_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tsim_comercio_categoria`
--
ALTER TABLE `tsim_comercio_categoria`
  ADD CONSTRAINT `tsim_comercio_categoria_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tsim_comercio_categoria_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `tsim_categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsim_producto`
--
ALTER TABLE `tsim_producto`
  ADD CONSTRAINT `tsim_producto_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_correo_comercio`
--
ALTER TABLE `tsit_correo_comercio`
  ADD CONSTRAINT `tsit_correo_comercio_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_imagen_comercio`
--
ALTER TABLE `tsit_imagen_comercio`
  ADD CONSTRAINT `tsit_imagen_comercio_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_imagen_producto`
--
ALTER TABLE `tsit_imagen_producto`
  ADD CONSTRAINT `tsit_imagen_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `tsim_producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_mensaje_contacto`
--
ALTER TABLE `tsit_mensaje_contacto`
  ADD CONSTRAINT `tsit_mensaje_contacto_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_telefono_comercio`
--
ALTER TABLE `tsit_telefono_comercio`
  ADD CONSTRAINT `tsit_telefono_comercio_ibfk_1` FOREIGN KEY (`id_comercio`) REFERENCES `tsim_comercio` (`id_comercio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tsit_usuario`
--
ALTER TABLE `tsit_usuario`
  ADD CONSTRAINT `tsit_usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `tsim_rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
