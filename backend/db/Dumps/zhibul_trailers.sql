-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: zhibul
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trailers`
--

DROP TABLE IF EXISTS `trailers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trailers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `trailer_rent_id` bigint unsigned NOT NULL,
  `title` varchar(250) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `trailer_rent_id` (`trailer_rent_id`),
  CONSTRAINT `trailers_ibfk_1` FOREIGN KEY (`trailer_rent_id`) REFERENCES `trailer_rent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trailers`
--

LOCK TABLES `trailers` WRITE;
/*!40000 ALTER TABLE `trailers` DISABLE KEYS */;
INSERT INTO `trailers` VALUES (1,1,'Аренда автоприцепа с тентом','В концепцию прицепа был заложен крепкий кузов уникальных размеров 3 на 1,5 метра. На легковом прицепе \"Атлет\" удобно перевозить как материалы для строительства, так и технику для экстримального отдыха. Подвеска прицепа для легковых автомобилей имеет уникальную рессору с подрессорником. Для защиты грузов от внешнего воздействия (осадки, грязь, пыль и тп.) на прицепе \"Атлет\" устанавливается тент. Высота кузова от пола до тента 1,5 метра. Тент имеет аэродинамический скос, позволяющий умешить сопротивление воздуха при езде с прицепом. При установке удлинителя дышла в крайнее положение на прицепе можно перевозить длиномерные грузы до 6 метров, при этом следует помнить, что груз выступающий за 1 метр от кузова прицепа надо обозначить знаком \"крупногабаритный груз\".'),(2,2,'Аренда автоприцепа без тента','Прицеп Титан-3000 для легковых автомобилей решает вопрос перевозки тяжёлых (до 500 кг) и габаритных грузов, когда нет возможности или потребности в покупке грузового транспорта. Оборудован высоким жёстким каркасом, к которому можно крепить грузы для их большей устойчивости. На каркас можно натянуть водонепроницаемый тент, который защитит перевозимые грузы от осадков, пыли и грязи (например, при перевозке по грязным дорогам в дождь). Так же тент скроет содержимое прицепа от посторонних глаз.');
/*!40000 ALTER TABLE `trailers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-03 23:20:34
