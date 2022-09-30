-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-09-2022 a las 11:24:44
-- Versión del servidor: 10.9.2-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `strongpp`
--

-- --------------------------------------------------------
CREATE USER 'strongpp'@'localhost' IDENTIFIED BY 'strongapp123';


USE strongpp;
--
-- Estructura de tabla para la tabla `Entrenamiento`
--

CREATE TABLE `Entrenamiento` (
  `id` int(6) NOT NULL,
  `fecha` datetime NOT NULL,
  `user_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Exercise`
--

CREATE TABLE `Exercise` (
  `id` int(6) NOT NULL,
  `ex_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Exercise`
--

INSERT INTO `Exercise` (`id`, `ex_name`, `img_url`) VALUES
(1, 'Dumbbell Curl', NULL),
(2, 'Hammer curl', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Repeticion`
--

CREATE TABLE `Repeticion` (
  `id` int(10) NOT NULL,
  `id_serie` int(6) NOT NULL,
  `cantidad` int(6) DEFAULT NULL,
  `peso` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Serie`
--

CREATE TABLE `Serie` (
  `id` int(6) NOT NULL,
  `id_entrenamiento` int(6) NOT NULL,
  `id_ejercicio` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User`
--

CREATE TABLE `User` (
  `id` int(6) NOT NULL,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `User`
--

INSERT INTO `User` (`id`, `username`, `pass`, `registered_on`) VALUES
(1, 'admin', '1234', '2022-09-24 23:46:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User_Session`
--

CREATE TABLE `User_Session` (
  `id` int(10) NOT NULL,
  `token` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(6) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `timeout_s` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `User_Session`
--

INSERT INTO `User_Session` (`id`, `token`, `user_id`, `start_time`, `timeout_s`) VALUES
(1, 'Y2yKqf2GAzP3ddorgwtE5p', 1, '2022-09-28 13:15:30', 3600);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Entrenamiento`
--
ALTER TABLE `Entrenamiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `Exercise`
--
ALTER TABLE `Exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Repeticion`
--
ALTER TABLE `Repeticion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_serie` (`id_serie`);

--
-- Indices de la tabla `Serie`
--
ALTER TABLE `Serie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_entrenamiento` (`id_entrenamiento`),
  ADD KEY `id_ejercicio` (`id_ejercicio`);

--
-- Indices de la tabla `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `User_Session`
--
ALTER TABLE `User_Session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Entrenamiento`
--
ALTER TABLE `Entrenamiento`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Exercise`
--
ALTER TABLE `Exercise`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Repeticion`
--
ALTER TABLE `Repeticion`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Serie`
--
ALTER TABLE `Serie`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `User`
--
ALTER TABLE `User`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `User_Session`
--
ALTER TABLE `User_Session`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Entrenamiento`
--
ALTER TABLE `Entrenamiento`
  ADD CONSTRAINT `Entrenamiento_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Repeticion`
--
ALTER TABLE `Repeticion`
  ADD CONSTRAINT `Repeticion_ibfk_1` FOREIGN KEY (`id_serie`) REFERENCES `Serie` (`id`);

--
-- Filtros para la tabla `Serie`
--
ALTER TABLE `Serie`
  ADD CONSTRAINT `Serie_ibfk_1` FOREIGN KEY (`id_entrenamiento`) REFERENCES `Entrenamiento` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Serie_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `Exercise` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `User_Session`
--
ALTER TABLE `User_Session`
  ADD CONSTRAINT `User_Session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
