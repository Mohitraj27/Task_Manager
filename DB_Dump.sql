-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: simpledb
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

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
-- Table structure for table `loginuser`
--

DROP TABLE IF EXISTS `loginuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginuser`
--

LOCK TABLES `loginuser` WRITE;
/*!40000 ALTER TABLE `loginuser` DISABLE KEYS */;
INSERT INTO `loginuser` VALUES (56,'Mohit','mohitraj122@gmail.com','Mraj716@'),(57,'Adarsh','adarsh12@gmail.com','Mraj716@'),(59,'mohan','mohan12@gmail.com','Mohan@123'),(60,'roshan','roshan32@gmail.com','Roshan23@'),(61,'John','John12@gmail.com','John123@'),(62,'David','david32@gmail.com','David@123'),(63,'Mohit','mohit.raj@roommate.com','Mraj716@'),(64,'Adarsh','sinhadarsh12@gmail.com','Mraj716@'),(65,'farhan Khan','farhan21@gmail.com','Mraj716@');
/*!40000 ALTER TABLE `loginuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_name` varchar(255) DEFAULT NULL,
  `task_details` text,
  `id` int DEFAULT NULL,
  `task_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`task_id`),
  KEY `id` (`id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`id`) REFERENCES `loginuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('Develop new ','Implement a new feature for the website, focusing on user engagement and functionality.',56,24),('Create marketing campaign','Develop a comprehensive marketing campaign strategy for the upcoming product launch.',56,26),('Optimize website performance','Analyze and improve website performance, focusing on page load speed, server response time, and overall user experience.',56,27),('Research new market trends',' Conduct research on emerging market trends, competitor analysis, and consumer behavior. Use data to inform strategic business decisions.',56,28),('Design UI UX for mobile app','Create wireframes and prototypes for the mobile app user interface and user experience. Ensure intuitive navigation and visually appealing design.',56,29),('Update content for blog','Write and edit blog posts on relevant topics, ensuring accuracy, clarity, and SEO optimization. Coordinate with marketing team for content promotion.',56,30),('Implement security measures','Enhance website security by implementing encryption, firewalls, and security protocols. Conduct regular vulnerability assessments and patch management',56,31),('Conduct customer ','Design and distribute a customer satisfaction survey to gather feedback on products and services. Analyze results and identify areas for improvement',56,32),('Organize team building event','Plan and coordinate a team-building event to foster collaboration and morale among team members. Choose activities and venues that encourage participation.',56,33),('Taskwewewe','Details of Task Number 67',56,35),('Develop new feature for website','tindndisndsndisndisdisdisndsidnsidnsnds',56,36),('New Tasksuu','This is the description of Task Details',56,37),('Task Number 67','This is my task description for Problem solving',57,39),('New Admin Task','This is the task details for Admin Task',59,40),('New Admin Task','This is description of New Admin Task',59,41),('Task to complete TODO app','Details of task to complete todo app',60,46),('This is Intial Task','Details of Intial Task details',60,48),('Intial Task ','This is my description of Intial task to perform.',61,50),('Intial Task to Build TODO','Task Details for TODO',62,52),('Intial Task to Build Website','Task Details to build a website',62,53),('New Admin Task','Details of Intial Admin Task',62,56),('Intern Task to Build TODO application','TODO application must be build using ANgular , Nodejs, MySQL',62,58),('To Complete Assignment','This is My First Assisgnment in Angular and MySQL',64,59);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (42,'Randon','random12@gmail.com','2323232324'),(43,'Rohan','abc4320@gmail.com','9097644568'),(44,'Amisha','amisa1@gmail.com','9097644568'),(46,'Diksha Sharma','diksha233@gmail.com','9865237627'),(59,'David brown','david32@gmail.com','9898989898'),(60,'John Brown','john122@gmail.com','9856565640'),(63,'David','david45@gmail.com','7878787878'),(65,'Amit Kumar','amit123@gmail.com','9097644568'),(82,'John Brown','john122@gmail.com','8827372724'),(86,'James Kumar','james93@gmail.com','8273827387'),(87,'johno','john1@gmail.com','9898989899'),(88,'mohit sinha','raj79@gmail.com','9097644568'),(93,'mohit raj','mohitraj12@gmail.com','2733435643'),(103,'John Brown','Brown32@gmail.com','2435675683'),(104,'David brown','Brown32@gmail.com','3456787654'),(105,'James Bond','james121@gmail.com','1234567866'),(106,'SDFGHFGD','FDS@GMAIL.COM','2436756767'),(109,'MOHIT RAj','raj716980@gmail.com','9097644568'),(113,'MOHIT RAJ','raj716980@gmail.com','9097644568'),(114,'rohan','rohan12@gmail.com','2346787654'),(115,'abhishek','abh@gmail.com','9097644568'),(116,'MOHIT RAJ','raj716980@gmail.com','9097644568'),(117,'Mohit sinha','raj767@gmail.com','9097644568'),(118,'undefined','undefined','undefined');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_doe','$2b$10$RFpTcQxPv3.aJhbrV34XUOoQu4HUyftqLJn46zZDfbCItVpftVp/6','john@example.com','John Doe'),(2,'alice_smith','$2b$10$RFpTcQxPv3.aJhbrV34XUOoQu4HUyftqLJn46zZDfbCItVpftVp/6','alice@example.com','Alice Smith'),(3,'bob_jones','$2b$10$RFpTcQxPv3.aJhbrV34XUOoQu4HUyftqLJn46zZDfbCItVpftVp/6','bob@example.com','Bob Jones'),(4,'pqr','$2b$10$AzeNDytGyBPCj8RtdTZyneMyjbhGm/EXc.SQN0pT81C7x/IHU5wli','raj716980@gmail.com','David Millar');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'simpledb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 12:30:22
