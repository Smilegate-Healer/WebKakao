-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: webkakao
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `chatroom_idx` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `recent_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최근 메세지 전송 시간',
  `creator_idx` int(10) unsigned NOT NULL COMMENT '채팅방을 만든 사람의 인덱스',
  `msg_object_id` char(26) NOT NULL DEFAULT 'null',
  `last_msg_idx` int(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chatroom_name` char(60) DEFAULT NULL,
  PRIMARY KEY (`chatroom_idx`),
  KEY `creator_idx_idx` (`creator_idx`),
  CONSTRAINT `creator_idx` FOREIGN KEY (`creator_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (38,'2019-02-24 06:50:37',2,'5c723eba6668628242224a21',500,'2019-02-24 04:16:19',NULL),(39,'2019-02-24 12:02:38',2,'5c7287de6668624172e65986',0,'2019-02-24 12:02:38',NULL),(40,'2019-02-24 12:02:42',2,'5c7287e26668624172e65987',0,'2019-02-24 12:02:42',NULL),(41,'2019-02-24 12:39:29',2,'5c72907c6668628242224a25',80,'2019-02-24 12:02:46',NULL);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom_member`
--

DROP TABLE IF EXISTS `chatroom_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatroom_member` (
  `chatroom_idx` int(10) unsigned NOT NULL COMMENT '채팅방 인덱스',
  `user_idx` int(10) unsigned NOT NULL COMMENT '사용자 인덱스',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_read_msg_idx` int(11) NOT NULL,
  `start_msg_idx` int(11) NOT NULL,
  PRIMARY KEY (`chatroom_idx`,`user_idx`),
  KEY `user_idx_idx` (`user_idx`),
  CONSTRAINT `chatroom_idx` FOREIGN KEY (`chatroom_idx`) REFERENCES `chat_room` (`chatroom_idx`),
  CONSTRAINT `user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom_member`
--

LOCK TABLES `chatroom_member` WRITE;
/*!40000 ALTER TABLE `chatroom_member` DISABLE KEYS */;
INSERT INTO `chatroom_member` VALUES (38,2,'2019-02-24 04:16:20',503,0),(38,4,'2019-02-24 04:16:20',1,0),(38,5,'2019-02-24 04:16:20',1,0),(38,6,'2019-02-24 04:16:20',464,0),(39,1,'2019-02-24 12:02:38',0,0),(39,2,'2019-02-24 12:02:38',1,0),(40,2,'2019-02-24 12:02:42',1,0),(40,3,'2019-02-24 12:02:42',0,0),(41,2,'2019-02-24 12:02:46',84,0),(41,6,'2019-02-24 12:02:46',0,0);
/*!40000 ALTER TABLE `chatroom_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `file_idx` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '파일 인덱스',
  `sender_idx` int(10) unsigned NOT NULL COMMENT '보내는 사람  인덱스',
  `chatroom_idx` int(10) unsigned NOT NULL COMMENT '채팅방 인덱스\n',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_url` varchar(200) NOT NULL DEFAULT '' COMMENT '데이터  URL',
  `uploaded` tinyint(1) NOT NULL DEFAULT '0' COMMENT '저장이 완료되었는지',
  `origin_name` varchar(64) NOT NULL DEFAULT '' COMMENT '원래 파일 이름 및 확장자',
  PRIMARY KEY (`file_idx`),
  UNIQUE KEY `file_idx_UNIQUE` (`file_idx`),
  KEY `sender_idx` (`sender_idx`),
  CONSTRAINT `sender_idx` FOREIGN KEY (`sender_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `from_user_idx` int(10) unsigned NOT NULL COMMENT '친구 요청자의 사용자 인덱스\n',
  `to_user_idx` int(10) unsigned NOT NULL COMMENT '친구의 인덱스',
  `state` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '친구 상태\n0 : 친구\n1 : 숨김\n2 : 차단',
  PRIMARY KEY (`from_user_idx`,`to_user_idx`),
  KEY `to_user_idx_idx` (`to_user_idx`),
  CONSTRAINT `from_user_idx` FOREIGN KEY (`from_user_idx`) REFERENCES `user` (`user_idx`),
  CONSTRAINT `to_user_idx` FOREIGN KEY (`to_user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,2,0),(1,3,0),(2,1,0),(2,3,0),(2,4,0),(2,5,0),(2,6,0),(3,1,0),(3,2,0),(4,6,0),(6,2,0),(6,3,0),(6,5,0);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_idx` int(10) NOT NULL,
  `url` varchar(30) NOT NULL DEFAULT '' COMMENT '파일서버 접근 경로',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성시각',
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '지워졌는지에대한',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (11,6,'6_1550638239899.png','2019-02-20 04:50:39',0),(12,4,'4_1550920171207.png','2019-02-23 11:09:31',0);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_idx` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'User Index',
  `email` varchar(100) NOT NULL COMMENT '사용자 이메일',
  `password` char(65) NOT NULL COMMENT '사용자 패스워드',
  `name` varchar(45) NOT NULL COMMENT '사용자 이름',
  `profile_img` int(10) DEFAULT NULL COMMENT '프로필 이미지',
  `back_img` int(10) DEFAULT NULL COMMENT '배경 이미지',
  `status_msg` varchar(50) DEFAULT NULL COMMENT '상태 메세지',
  `state` varchar(45) NOT NULL DEFAULT '0' COMMENT '사용자 계정 상태\n0 : Enable\n1 : Disable\n',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `access_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `salt` char(11) NOT NULL DEFAULT '',
  `user_type` char(10) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_idx`),
  UNIQUE KEY `idx_UNIQUE` (`user_idx`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hsm63746244@gmail.com','23faa1ce4d303e897154eb106c93cfec893c05af257f356aa5afebfde56e1495','홍성문',NULL,NULL,'hello','0','2019-01-22 06:47:14','2019-01-22 06:47:14','bDrV1kzxYA','user'),(2,'test2@test.test','23faa1ce4d303e897154eb106c93cfec893c05af257f356aa5afebfde56e1495','조영호',NULL,NULL,NULL,'0','2019-01-22 06:47:14','2019-01-22 06:47:14','bDrV1kzxYA','user'),(3,'test3@test.test','23faa1ce4d303e897154eb106c93cfec893c05af257f356aa5afebfde56e1495','정명지',NULL,NULL,NULL,'0','2019-01-22 06:47:14','2019-01-22 06:47:14','bDrV1kzxYA','user'),(4,'hi@naver.com','23faa1ce4d303e897154eb106c93cfec893c05af257f356aa5afebfde56e1495','누구세요',12,NULL,'저는 누구입니다','0','2019-02-11 07:04:56','2019-02-11 07:04:56','bDrV1kzxYA','user'),(5,'hi@hi.hi','d11f7e2375e4f82221d6ee166466a4a87ba648eeb28f1ba08b7230d68cc17f72','hi',NULL,NULL,NULL,'0','2019-02-20 02:38:56','2019-02-20 02:38:56','q9qh91Iv1L','user'),(6,'hi@hi.hi3','9c579055165299e81d6133a4937c5a2ff82a883e024ba2d02bbb35fccfaf57cb','hi3',11,NULL,NULL,'0','2019-02-20 02:42:09','2019-02-20 02:42:09','14ViVv7m80','user'),(7,'u1@u.u','e036b7babc3b3dd8eff7122587666ffaaaf5ddc405a8e6fae9ce35786e5cf8a5','User1',NULL,NULL,NULL,'0','2019-02-25 01:39:46','2019-02-25 01:39:46','jRAHvA2mne','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-31  6:12:58
