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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `item_id` bigint unsigned NOT NULL,
  `src` varchar(200) NOT NULL,
  KEY `item_id` (`item_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'http://194.67.78.19/images/im1.png'),(2,'http://194.67.78.19/images/im2.png'),(3,'http://194.67.78.19/images/im3.png'),(4,'http://194.67.78.19/images/im4.png'),(5,'http://194.67.78.19/images/im5.png'),(6,'http://194.67.78.19/images/im207.png'),(7,'http://194.67.78.19/images/im2.png'),(283,'http://194.67.78.19/images/im1.png'),(284,'http://194.67.78.19/images/im1.png'),(285,'http://194.67.78.19/images/im207.png'),(8,'http://194.67.78.19/images/im8.png'),(9,'http://194.67.78.19/images/im9.png'),(10,'http://194.67.78.19/images/im10.png'),(286,'http://194.67.78.19/images/im208.png'),(287,'http://194.67.78.19/images/im209.png'),(288,'http://194.67.78.19/images/im210.png'),(11,'http://194.67.78.19/images/im11.png'),(11,'http://194.67.78.19/images/im11-2.png'),(11,'http://194.67.78.19/images/im11-3.png'),(11,'http://194.67.78.19/images/im11-4.png'),(12,'http://194.67.78.19/images/im12.png'),(12,'http://194.67.78.19/images/im12-2.png'),(12,'http://194.67.78.19/images/im12-3.png'),(12,'http://194.67.78.19/images/im12-4.png'),(13,'http://194.67.78.19/images/im13.png'),(13,'http://194.67.78.19/images/im13-2.png'),(13,'http://194.67.78.19/images/im13-3.png'),(13,'http://194.67.78.19/images/im13-4.png'),(14,'http://194.67.78.19/images/im14.png'),(14,'http://194.67.78.19/images/im14-2.png'),(14,'http://194.67.78.19/images/im14-3.png'),(14,'http://194.67.78.19/images/im14-4.png'),(15,'http://194.67.78.19/images/im15.png'),(15,'http://194.67.78.19/images/im15-2.png'),(15,'http://194.67.78.19/images/im15-3.png'),(15,'http://194.67.78.19/images/im15-4.png'),(16,'http://194.67.78.19/images/im16.png'),(16,'http://194.67.78.19/images/im16-2.png'),(16,'http://194.67.78.19/images/im16-3.png'),(16,'http://194.67.78.19/images/im16-4.png'),(17,'http://194.67.78.19/images/im17.png'),(17,'http://194.67.78.19/images/im17-2.png'),(17,'http://194.67.78.19/images/im17-3.png'),(17,'http://194.67.78.19/images/im17-4.png'),(18,'http://194.67.78.19/images/im18.png'),(18,'http://194.67.78.19/images/im18-2.png'),(19,'http://194.67.78.19/images/im19.png'),(19,'http://194.67.78.19/images/im19-2.png'),(19,'http://194.67.78.19/images/im19-3.png'),(19,'http://194.67.78.19/images/im19-4.png'),(20,'http://194.67.78.19/images/im20.png'),(20,'http://194.67.78.19/images/im20-2.png'),(20,'http://194.67.78.19/images/im20-3.png'),(20,'http://194.67.78.19/images/im20-4.png'),(21,'http://194.67.78.19/images/im21.png'),(21,'http://194.67.78.19/images/im21-2.png'),(21,'http://194.67.78.19/images/im21-3.png'),(21,'http://194.67.78.19/images/im21-4.png'),(22,'http://194.67.78.19/images/im22.png'),(22,'http://194.67.78.19/images/im22-2.png'),(22,'http://194.67.78.19/images/im22-3.png'),(22,'http://194.67.78.19/images/im22-4.png'),(23,'http://194.67.78.19/images/im23.png'),(23,'http://194.67.78.19/images/im23-2.png'),(23,'http://194.67.78.19/images/im23-3.png'),(23,'http://194.67.78.19/images/im23-4.png'),(24,'http://194.67.78.19/images/im24.png'),(24,'http://194.67.78.19/images/im24-2.png'),(24,'http://194.67.78.19/images/im24-3.png'),(24,'http://194.67.78.19/images/im24-4.png'),(25,'http://194.67.78.19/images/im25.png'),(25,'http://194.67.78.19/images/im25-2.png'),(25,'http://194.67.78.19/images/im25-3.png'),(25,'http://194.67.78.19/images/im25-4.png'),(26,'http://194.67.78.19/images/im26.png'),(26,'http://194.67.78.19/images/im26-2.png'),(26,'http://194.67.78.19/images/im26-3.png'),(26,'http://194.67.78.19/images/im26-4.png'),(27,'http://194.67.78.19/images/im27.png'),(27,'http://194.67.78.19/images/im27-2.png'),(27,'http://194.67.78.19/images/im27-3.png'),(27,'http://194.67.78.19/images/im27-4.png'),(121,'http://194.67.78.19/images/im28.png'),(122,'http://194.67.78.19/images/im29.png'),(123,'http://194.67.78.19/images/im30.png'),(124,'http://194.67.78.19/images/im31.png'),(125,'http://194.67.78.19/images/im32.png'),(126,'http://194.67.78.19/images/im33.png'),(127,'http://194.67.78.19/images/im34.png'),(128,'http://194.67.78.19/images/im35.png'),(129,'http://194.67.78.19/images/im36.png'),(130,'http://194.67.78.19/images/im37.png'),(131,'http://194.67.78.19/images/im38.png'),(132,'http://194.67.78.19/images/im39.png'),(133,'http://194.67.78.19/images/im40.png'),(134,'http://194.67.78.19/images/im41.png'),(135,'http://194.67.78.19/images/im42.png'),(136,'http://194.67.78.19/images/im43.png'),(137,'http://194.67.78.19/images/im44.png'),(138,'http://194.67.78.19/images/im45.png'),(139,'http://194.67.78.19/images/im46.png'),(140,'http://194.67.78.19/images/im47.png'),(141,'http://194.67.78.19/images/im48.png'),(142,'http://194.67.78.19/images/im49.png'),(143,'http://194.67.78.19/images/im50.png'),(144,'http://194.67.78.19/images/im51.png'),(145,'http://194.67.78.19/images/im52.png'),(146,'http://194.67.78.19/images/im53.png'),(147,'http://194.67.78.19/images/im54.png'),(148,'http://194.67.78.19/images/im55.png'),(149,'http://194.67.78.19/images/im56.png'),(150,'http://194.67.78.19/images/im57.png'),(151,'http://194.67.78.19/images/im58.png'),(152,'http://194.67.78.19/images/im59.png'),(153,'http://194.67.78.19/images/im60.png'),(154,'http://194.67.78.19/images/im61.png'),(155,'http://194.67.78.19/images/im62.png'),(156,'http://194.67.78.19/images/im63.png'),(157,'http://194.67.78.19/images/im64.png'),(159,'http://194.67.78.19/images/im66.png'),(160,'http://194.67.78.19/images/im67.png'),(161,'http://194.67.78.19/images/im68.png'),(162,'http://194.67.78.19/images/im69.png'),(163,'http://194.67.78.19/images/im70.png'),(164,'http://194.67.78.19/images/im71.png'),(165,'http://194.67.78.19/images/im72.png'),(166,'http://194.67.78.19/images/im73.png'),(167,'http://194.67.78.19/images/im74.png'),(168,'http://194.67.78.19/images/im75.png'),(169,'http://194.67.78.19/images/im76.png'),(170,'http://194.67.78.19/images/im77.png'),(171,'http://194.67.78.19/images/im78.png'),(172,'http://194.67.78.19/images/im79.png'),(173,'http://194.67.78.19/images/im80.png'),(174,'http://194.67.78.19/images/im81.png'),(175,'http://194.67.78.19/images/im200.png'),(176,'http://194.67.78.19/images/im83.png'),(177,'http://194.67.78.19/images/im84.png'),(178,'http://194.67.78.19/images/im85.png'),(179,'http://194.67.78.19/images/im86.png'),(180,'http://194.67.78.19/images/im87.png'),(181,'http://194.67.78.19/images/im88.png'),(182,'http://194.67.78.19/images/im89.png'),(183,'http://194.67.78.19/images/im90.png'),(184,'http://194.67.78.19/images/im91.png'),(185,'http://194.67.78.19/images/im92.png'),(186,'http://194.67.78.19/images/im93.png'),(187,'http://194.67.78.19/images/im94.png'),(188,'http://194.67.78.19/images/im95.png'),(189,'http://194.67.78.19/images/im96.png'),(190,'http://194.67.78.19/images/im97.png'),(191,'http://194.67.78.19/images/im98.png'),(192,'http://194.67.78.19/images/im99.png'),(193,'http://194.67.78.19/images/im100.png'),(194,'http://194.67.78.19/images/im101.png'),(195,'http://194.67.78.19/images/im102.png'),(196,'http://194.67.78.19/images/im103.png'),(197,'http://194.67.78.19/images/im104.png'),(198,'http://194.67.78.19/images/im105.png'),(199,'http://194.67.78.19/images/im106.png'),(200,'http://194.67.78.19/images/im107-1.png'),(200,'http://194.67.78.19/images/im107-2.png'),(200,'http://194.67.78.19/images/im107-3.png'),(200,'http://194.67.78.19/images/im107-4.png'),(200,'http://194.67.78.19/images/im107-5.png'),(201,'http://194.67.78.19/images/im108.png'),(202,'http://194.67.78.19/images/im109.png'),(203,'http://194.67.78.19/images/im111.png'),(204,'http://194.67.78.19/images/im112.png'),(205,'http://194.67.78.19/images/im113.png'),(206,'http://194.67.78.19/images/im114.png'),(207,'http://194.67.78.19/images/im115.png'),(208,'http://194.67.78.19/images/im116.png'),(209,'http://194.67.78.19/images/im117.png'),(210,'http://194.67.78.19/images/im118.png'),(211,'http://194.67.78.19/images/im119.png'),(212,'http://194.67.78.19/images/im120.png'),(213,'http://194.67.78.19/images/im121.png'),(215,'http://194.67.78.19/images/im122.png'),(216,'http://194.67.78.19/images/im122.png'),(217,'http://194.67.78.19/images/im122.png'),(218,'http://194.67.78.19/images/im122.png'),(219,'http://194.67.78.19/images/im122.png'),(220,'http://194.67.78.19/images/im123.png'),(221,'http://194.67.78.19/images/im123.png'),(222,'http://194.67.78.19/images/im124.png'),(223,'http://194.67.78.19/images/im125.png'),(224,'http://194.67.78.19/images/im125.png'),(225,'http://194.67.78.19/images/im126.png'),(226,'http://194.67.78.19/images/im126.png'),(227,'http://194.67.78.19/images/im126.png'),(228,'http://194.67.78.19/images/im180.png'),(229,'http://194.67.78.19/images/im128.png'),(230,'http://194.67.78.19/images/im129.png'),(289,'http://194.67.78.19/images/im215.png'),(290,'http://194.67.78.19/images/im214.png'),(231,'http://194.67.78.19/images/im130.png'),(232,'http://194.67.78.19/images/im131.png'),(233,'http://194.67.78.19/images/im132.png'),(234,'http://194.67.78.19/images/im133.png'),(235,'http://194.67.78.19/images/im134.png'),(237,'http://194.67.78.19/images/im136.png'),(238,'http://194.67.78.19/images/im137.png'),(239,'http://194.67.78.19/images/im138.png'),(240,'http://194.67.78.19/images/im139.png'),(241,'http://194.67.78.19/images/im140.png'),(242,'http://194.67.78.19/images/im141.png'),(243,'http://194.67.78.19/images/im142.png'),(244,'http://194.67.78.19/images/im143.png'),(245,'http://194.67.78.19/images/im144.png'),(246,'http://194.67.78.19/images/im145.png'),(247,'http://194.67.78.19/images/im146.png'),(248,'http://194.67.78.19/images/im147.png'),(249,'http://194.67.78.19/images/im148.png'),(250,'http://194.67.78.19/images/im149.png'),(251,'http://194.67.78.19/images/im150.png'),(252,'http://194.67.78.19/images/im151.png'),(252,'http://194.67.78.19/images/im151-2.png'),(252,'http://194.67.78.19/images/im151-3.png'),(253,'http://194.67.78.19/images/im152.png'),(253,'http://194.67.78.19/images/im152-2.png'),(253,'http://194.67.78.19/images/im152-3.png'),(254,'http://194.67.78.19/images/im153.png'),(255,'http://194.67.78.19/images/im154.png'),(256,'http://194.67.78.19/images/im155.png'),(257,'http://194.67.78.19/images/im156.png'),(258,'http://194.67.78.19/images/im157.png'),(259,'http://194.67.78.19/images/im158.png'),(260,'http://194.67.78.19/images/im159.png'),(261,'http://194.67.78.19/images/im160.png'),(262,'http://194.67.78.19/images/im161.png'),(263,'http://194.67.78.19/images/im162.png'),(264,'http://194.67.78.19/images/im163.png'),(265,'http://194.67.78.19/images/im164.png'),(266,'http://194.67.78.19/images/im165.png'),(267,'http://194.67.78.19/images/im166.png'),(268,'http://194.67.78.19/images/im167.png'),(269,'http://194.67.78.19/images/im168.png'),(270,'http://194.67.78.19/images/im169.png'),(271,'http://194.67.78.19/images/im170.png'),(272,'http://194.67.78.19/images/im171.png'),(291,'http://194.67.78.19/images/im211.png'),(273,'http://194.67.78.19/images/im172.png'),(274,'http://194.67.78.19/images/im173.png'),(275,'http://194.67.78.19/images/im174.png'),(276,'http://194.67.78.19/images/im175.png'),(277,'http://194.67.78.19/images/im176.png'),(278,'http://194.67.78.19/images/im177.png'),(279,'http://194.67.78.19/images/im178.png'),(280,'http://194.67.78.19/images/im179.png'),(281,'http://194.67.78.19/images/im126.png'),(282,'http://194.67.78.19/images/im126.png'),(292,'http://194.67.78.19/images/im212.png'),(293,'http://194.67.78.19/images/im213.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
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