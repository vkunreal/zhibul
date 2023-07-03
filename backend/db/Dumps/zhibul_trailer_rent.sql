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
-- Table structure for table `trailer_rent`
--

DROP TABLE IF EXISTS `trailer_rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trailer_rent` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `url` varchar(150) NOT NULL,
  `image_src` text,
  `seo_title` text,
  `seo_description` text,
  `seo_keywords` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trailer_rent`
--

LOCK TABLES `trailer_rent` WRITE;
/*!40000 ALTER TABLE `trailer_rent` DISABLE KEYS */;
INSERT INTO `trailer_rent` VALUES (1,'Аренда автоприцепа с тентом','В концепцию прицепа был заложен крепкий кузов уникальных размеров 3 на 1,5 метра. На легковом прицепе \"Атлет\" удобно перевозить\nкак материалы для строительства, так и технику для экстримального отдыха. Высота кузова от пола до тента 1,5 метра.','arenda-s-tentom','http://194.67.78.19/trailers/preview-with-tent.png','ZHBL - Аренда автоприцепов с тентом (Минск)','',''),(2,'Аренда автоприцепа без тента','В концепцию прицепа был заложен крепкий кузов уникальных размеров 3 на 1,5 метра. Прицеп Титан-3000 для легковых\nавтомобилей решает вопрос перевозки тяжёлых (до 500 кг) и габаритных грузов, когда нет возможности или потребности в покупке грузового транспорта.\nОборудован высоким жёстким каркасом, к которому можно крепить грузы для их большей устойчивости.','arenda-bez-tenta','http://194.67.78.19/trailers/preview-without-tent.jpg','ZHBL - Аренда автоприцепов без тента (Минск)','','');
/*!40000 ALTER TABLE `trailer_rent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-03 23:20:33
