-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.13-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para usuarios
CREATE DATABASE IF NOT EXISTS `usuarios` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `usuarios`;

-- Volcando estructura para tabla usuarios.encuesta
CREATE TABLE IF NOT EXISTS `encuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla usuarios.encuesta: ~0 rows (aproximadamente)
DELETE FROM `encuesta`;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` (`id`, `nombre`, `usuario_id`, `descripcion`) VALUES
	(1, 'helmer', 6, 'ferfere'),
	(2, 'encuesta1', 4, 's');
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;

-- Volcando estructura para tabla usuarios.pregunta
CREATE TABLE IF NOT EXISTS `pregunta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(150) NOT NULL,
  `seccion_id` int(11) NOT NULL,
  `tipoPregunta` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla usuarios.pregunta: ~6 rows (aproximadamente)
DELETE FROM `pregunta`;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` (`id`, `pregunta`, `seccion_id`, `tipoPregunta`) VALUES
	(1, 'pregunta1', 1, 'abierta'),
	(7, 'helmer', 2, '1'),
	(8, 'helmer', 2, '3'),
	(10, 'helmer', 2, 'abierta'),
	(11, 'helmer', 2, 'cerrada'),
	(12, 'helmer', 3, 'abierta');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;

-- Volcando estructura para tabla usuarios.seccion
CREATE TABLE IF NOT EXISTS `seccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `encuesta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla usuarios.seccion: ~1 rows (aproximadamente)
DELETE FROM `seccion`;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` (`id`, `nombre`, `encuesta_id`) VALUES
	(1, 'seccion1', 1),
	(2, 'vgfvfg', 0);
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;

-- Volcando estructura para tabla usuarios.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contrasena` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla usuarios.usuario: ~3 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombres`, `email`, `contrasena`) VALUES
	(4, 'helmerkpd', 'rere@ss', 'e'),
	(6, 'helmer222', 'wilfredo@', '112'),
	(7, 'wilfredo', 'Gamesinfinity-43@hotmail.com', '223'),
	(8, 'helmer', 'Gamesinfinity-43@hotmail.com', '1232');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
