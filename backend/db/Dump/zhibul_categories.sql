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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `image` varchar(150) DEFAULT NULL,
  `url` varchar(70) NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `is_contains` tinyint(1) NOT NULL,
  `seo_title` varchar(70) DEFAULT NULL,
  `seo_description` varchar(250) DEFAULT NULL,
  `seo_keywords` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Запчасти для краскораспылителей','','','zapasnyechasti',NULL,1,NULL,NULL,NULL),(2,'Компрессоры','','','kompressory',NULL,1,NULL,NULL,NULL),(3,'Краскораспылители','','','kraskoraspyliteli',NULL,1,NULL,NULL,NULL),(4,'Пневмоинструмент','','','pnevmoinstrument',NULL,1,NULL,NULL,NULL),(5,'Соеденительные элементы Aignep','','','soedinitelnyeelementy',NULL,1,NULL,NULL,NULL),(6,'Шланги и трубки','','','trubki_shlangi_rvd',NULL,0,NULL,NULL,NULL),(7,'Бачки','','http://194.67.78.19/images/im2.png','bachki',1,0,NULL,NULL,NULL),(8,'Регуляторы давления','','http://194.67.78.19/images/im8.png','reg_dav',1,0,NULL,NULL,NULL),(9,'Серия Carbonio','','http://194.67.78.19/images/im11.png','test1',1,0,NULL,NULL,NULL),(10,'Серия Ego','','http://194.67.78.19/images/im17.png','test2',1,0,NULL,NULL,NULL),(11,'Серия Genesi','','http://194.67.78.19/images/im19.png','test4',1,0,NULL,NULL,NULL),(12,'Серия Kombat','','http://194.67.78.19/images/im22.png','test5',1,0,NULL,NULL,NULL),(13,'Серия Slim','','http://194.67.78.19/images/im24.png','test6',1,0,NULL,NULL,NULL),(14,'Серия Xlight','','http://194.67.78.19/images/im26.png','test7',1,0,NULL,NULL,NULL),(15,'Компрессоры с прямым приводом','','http://194.67.78.19/images/im31.png','kompressoryspryamymprivodom',2,0,NULL,NULL,NULL),(16,'Компрессоры с ременным приводом','','http://194.67.78.19/images/im38.png','kompressoryporshnevye',2,0,NULL,NULL,NULL),(17,'Серия Carbonio','','http://194.67.78.19/images/im54.png','test8',3,0,NULL,NULL,NULL),(18,'Серия Ego','','http://194.67.78.19/images/im64.png','test9',3,0,NULL,NULL,NULL),(19,'Серия Genesi','','http://194.67.78.19/images/im67.png','test10',3,0,NULL,NULL,NULL),(20,'Серия Kombat','','http://194.67.78.19/images/im76.png','test11',3,0,NULL,NULL,NULL),(21,'Серия Slim','','http://194.67.78.19/images/im83.png','test12',3,0,NULL,NULL,NULL),(22,'Серия Xlight','','http://194.67.78.19/images/im92.png','test13',3,0,NULL,NULL,NULL),(23,'Гвоздезабивные пистолеты','','http://194.67.78.19/images/im99.png','gvozdezabivnyepistolety',4,0,NULL,NULL,NULL),(24,'Скобозабивные пистолеты','','http://194.67.78.19/images/im103.png','skobozabivnie_pistoleti',4,0,NULL,NULL,NULL),(25,'Шпилько-штифтозабивной пистолет','','http://194.67.78.19/images/im112.png','shtiftozabivnyepistolety',4,0,NULL,NULL,NULL),(26,'Быстросъемные соединения','','','test14',5,0,NULL,NULL,NULL),(27,'Глушители','','','test15',5,0,NULL,NULL,NULL),(28,'Клапаны','','','klapany',5,0,NULL,NULL,NULL),(29,'Краны','','','test17',5,0,NULL,NULL,NULL),(30,'Резьбовые переходники','','','test18',5,0,NULL,NULL,NULL),(31,'Цанговые соединения','','','test19',5,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-17 23:40:53
