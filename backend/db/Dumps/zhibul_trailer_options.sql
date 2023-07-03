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
-- Table structure for table `trailer_options`
--

DROP TABLE IF EXISTS `trailer_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trailer_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `trailer_id` bigint unsigned NOT NULL,
  `icon` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `text` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `trailer_id` (`trailer_id`),
  CONSTRAINT `trailer_options_ibfk_1` FOREIGN KEY (`trailer_id`) REFERENCES `trailer_rent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trailer_options`
--

LOCK TABLES `trailer_options` WRITE;
/*!40000 ALTER TABLE `trailer_options` DISABLE KEYS */;
INSERT INTO `trailer_options` VALUES (1,1,'size','Габариты кузова','Длина кузова - 3010 мм<br/>Ширина кузова - 1480 мм'),(2,1,'height','Высота кузова','Высота кузова - 380 мм<br/>Высота каркаса (тента) - 1500 мм'),(3,1,'options','Грузоподъемность','По документам - 460 кг<br/>По факту - до 750 кг'),(4,1,'exclamation-mark','Общая информация','Минимальный срок аренды - 3 часа<br/>Цена за сутки - 20 рублей'),(5,2,'size','Габариты кузова','Длина кузова - 3000 мм<br/>Ширина кузова - 1500 мм'),(6,2,'info','Шасси','Тип подвески - рессорно-амортизаторная<br/>Размер колес - R13 4х98'),(7,2,'options','Грузоподъемность','По документам - 500 кг<br/>По факту - до 740 кг'),(8,2,'exclamation-mark','Общая информация','Минимальный срок аренды - 3 часа<br/>Цена за сутки - 20 рублей');
/*!40000 ALTER TABLE `trailer_options` ENABLE KEYS */;
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
