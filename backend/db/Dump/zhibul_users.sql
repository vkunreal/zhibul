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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'+7 812 055-33-25','Виктор','ООО Прямые руки','pryam@ruki.ru','Прошу связаться со мной по поводу распылителя'),(2,'+7 892 885-53-52','Алексей','ИП Петров А. И.','fdsa@ruwerki.ru','Рассматривайте предложения о сотрудничестве?'),(3,'+7 911 100-89-43','Анна','ООО Эконом маркет','econom@market.ru','Здраствуйте, мне нужна информация по товару'),(4,'+7 874 535-88-30','Дмитрий','АО Рестор','restore@gmail.com','Готовы сделать заказ'),(5,'+7 534 832-78-15','Анастасия','ООО ДНС','anastasia.dns@yandex.ru','Можно ли забрать 2 распылителя 18 апреля?'),(6,'+7 973 453-22-48','Даниил','ИП Магаданов Д. А.','guru12@mail.ru','Возможно сделать заказ оптом?'),(7,'+7 354 877-35-45','Ольга','ООО АлЭкспромт','alXspromt@mail.ru','Нужна косультация по товару'),(8,'+7 783 453-978-35','Тимофей','ООО Пятерочка','5opka@yandex.ru','Позвоните по номеру +7 923 453 23 43'),(9,'+7 351 543-78-12','Екатерина','ООО Иностранные Товары','foreignitems@gmail.com','Нужно уточнить про доставку'),(10,'+7 678 456-15-67','Владимир','РУВД','gosorgan@mvd.ru','Есть ли еще цвета?');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-17 23:40:52
