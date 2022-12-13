CREATE DATABASE IF NOT EXISTS `cityLibrary` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cityLibrary`;

-- Admin table --
DROP TABLE IF EXISTS `ADMIN`;
CREATE TABLE IF NOT EXISTS `ADMIN` (
  `ID` int(64) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8mb4;

-- Inserting Data here --
INSERT INTO `ADMIN` (`ID`, `PASSWORD`) VALUES 
(1, 'pass'),
(2, 'pass');
-----------------------------------
-- Person Table --
DROP TABLE IF EXISTS `PERSON`;
CREATE TABLE IF NOT EXISTS `PERSON` (
  `PId` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `PName` varchar(100) NOT NULL,
  PRIMARY KEY (`PId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

INSERT INTO `PERSON` (`PId`, `PName`) VALUES
(1, 'Author1'),
(2, 'GEditor1'),
(3, 'Author2'),
(4, 'Chair1'),
(5, 'Author3'),
(6, 'Editor1'),
(7, 'Editor2'),
(8, 'Author4'),
(9, 'Chair2'),
(10, 'GEditor2'),
(11, 'Author5'),
(12, 'GEditor3'),
(13, 'GEditor4'),
(14, 'Chair3'),
(15, 'Editor3'),
(16, 'Editor4');
-----------------------------------
-- Publisher Table --
DROP TABLE IF EXISTS `PUBLISHER`;
CREATE TABLE IF NOT EXISTS `PUBLISHER` (
  `PublisherId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `PubName` varchar(100) NOT NULL,
  `Address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`PublisherId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

INSERT INTO `PUBLISHER` VALUES
(1, 'BOOKPUB1', '141KevinSt,Newark'),
(2, 'BOOKPUB2', '33JumperSt,Harrison'),
(3, 'JOURNPUB1', '44Mlk Blvd,Newark'),
(4, 'JOURNPUB2', '5WashintonSt,Newark'),
(5, 'JOURNPUB3', '50HayesSt,Union'),
(6, 'JOURNPUB4', '15PrinceSt,Elizbeth'),
(7, 'CONFERPUB1', '1HanfordSt,Dayton'),
(8, 'JK Rowling', 'Indianapolis, USA'),
(9, 'JK Rowling', 'Indianapolis, USA'),
(10, 'JK Rowling', 'Indianapolis, USA'),
(11, 'JK Rowling', 'Lorenze high tow'),
(12, 'Elmaris, Navathe', 'Pearson'),
(13, 'Elmaris, Navathe ', 'kaleirst'),
(14, 'DUMBLEDORE', 'HOGWORTS'),
(15, 'AUTHOR1', 'ADDRESS1');
-----------------------------------
-- Document Table --
DROP TABLE IF EXISTS `DOCUMENT`;
CREATE TABLE IF NOT EXISTS `DOCUMENT` (
  `DocId` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `PDate` date NOT NULL,
  `PublisherId` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`DocId`),
  FOREIGN KEY (`PublisherId`) REFERENCES `PUBLISHER`(`PublisherId`)
--   KEY `PublisherId` (`PublisherId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

INSERT INTO `DOCUMENT` VALUES
(1, 'BookB', '1997-10-11', 2),
(2, 'BookC', '2001-06-12', 1),
(3, 'BookD', '2005-04-01', 1),
(4, 'JournalA', '2004-12-15', 3),
(5, 'JournalA', '1969-04-12', 4),
(6, 'JournalB', '2002-08-05', 5),
(7, 'JournalC', '1996-12-06', 3),
(8, 'JournalD', '2019-12-01', 6),
(9, 'JournalD', '2019-06-01', 6),
(10, 'BookE', '2018-01-11', 2),
(11, 'Conference1', '2018-01-11', 7),
(12, 'Conference2', '2020-08-11', 7),
(13, 'Conference3', '2020-09-11', 7),
(14, 'Harry Potter', '2011-01-13', 10),
(15, 'Friends', '2020-12-01', 11),
(16, 'DBMS DESIGN', '2020-07-18', 12),
(17, 'DBMS DESIGN 2', '2019-06-04', 13),
(18, 'Harry Potter : ORDER OF PHEONIX', '2018-02-14', 14),
(19, 'GOOGLE', '2020-10-12', 15);
-----------------------------------
-- Book Table --
DROP TABLE IF EXISTS `BOOK`;
CREATE TABLE IF NOT EXISTS `BOOK` (
  `Book_DocId` int(10) UNSIGNED NOT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`Book_DocId`),
  FOREIGN KEY (`Book_DocId`) REFERENCES `DOCUMENT`(`DocId`)
--   KEY `DocId` (`Book_DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `BOOK` VALUES
(1, '12345'),
(2, '12346'),
(3, '12347'),
(4, '12348'),
(5, '12349'),
(6, '12350');
-----------------------------------
-- Authors table --
DROP TABLE IF EXISTS `AUTHORS`;
CREATE TABLE IF NOT EXISTS `AUTHORS` (
  `Book_author` int(64) UNSIGNED NOT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  `DocId` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`Book_author`,`DocId`),
  FOREIGN KEY (`Book_author`) REFERENCES `PERSON`(`PId`),
  FOREIGN KEY (`DocId`) REFERENCES `BOOK`(`Book_DocId`)
--   KEY `PId` (`Book_author`),
--   KEY `Book_DocId` (`DocId`)
) DEFAULT CHARSET=utf8mb4;

INSERT INTO `AUTHORS` VALUES
(1, '12345', 1),
(2, '12346', 2),
(3, '12347', 4),
(4, '12348', 6);
-----------------------------------
-- Reader Table --
DROP TABLE IF EXISTS `READER`;
CREATE TABLE IF NOT EXISTS `READER` (
  `ReaderId` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) DEFAULT NULL,
  `ReadName` varchar(50) DEFAULT NULL,
  `NumBorBooks` int(10) UNSIGNED NOT NULL,
  `NumResBooks` int(10) UNSIGNED NOT NULL,
  `PhoneNo` varchar(16) DEFAULT NULL,
  `Address` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ReaderId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

INSERT INTO `READER` VALUES
(1, 'STUDENT', 'READER#1', 3, 2, '8625764763', '141SummitSt,Newark'),
(2, 'STUDENT', 'READER#2', 4, 5, '6107036642', '121Harissonave.,Harrison'),
(3, 'STAFF', 'READER#3', 0, 1, '2014679390', '234SpringfieldAve,Irington'),
(4, 'SENIOR CITIZEN', 'READER#4', 5, 6, '2019896893', '2OaklandSt.Irington'),
(5, 'STAFF', 'READER#5', 2, 3, '8622376448', '35NClintonSt,East Orange'),
(6, 'STUDENT', 'READER#6', 1, 0, '6096800093', '6MapleSt,Kearny'),
(7, 'READER', 'Rahul', 4, 3, '9664102923', 'NJIT, UNIVERSITY'),
(8, 'READER', 'Rahul', 2, 2, '9664102923', 'NJIT, UNIVERSITY'),
(9, 'STUDENT', 'Aarjavi', 1, 1, '3145829321', 'NJIT Newark'),
(10, 'SENIOR', 'Prem', 0, 0, '3145829323', 'DBMS palace'),
(11, 'SENIOR', 'Prerana', 5, 6, '3145872177', 'next to DBMS palace '),
(12, 'STAFF', 'Pranavi', 7, 3, '9664102922', 'Secaucus, NJ'),
(13, 'STUDENT', 'Michele', 1, 0, '3145829322', 'njit');
-----------------------------------
-- Bor_Transaction Table --
DROP TABLE IF EXISTS `BOR_TRANSACTION`;
CREATE TABLE IF NOT EXISTS `BOR_TRANSACTION` (
  `BorNumber` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `BorDateTime` datetime DEFAULT NULL,
  `RetDateTime` datetime DEFAULT NULL,
  `ReaderId` int(64) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`BorNumber`),
  FOREIGN KEY (`ReaderId`) REFERENCES `READER`(`ReaderId`)
--   KEY `ReaderId` (`ReaderId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

INSERT INTO `BOR_TRANSACTION` VALUES
(1, '2020-12-11 08:13:23', '2020-12-31 08:13:23', 1),
(2, '2020-12-11 08:14:02', '2020-12-31 08:14:02', 3),
(3, '2020-12-11 08:14:02', '2020-12-31 08:14:02', 4),
(4, '2020-12-11 08:14:02', '2020-12-31 08:14:02', 6),
(5, '2020-12-11 08:34:23', '2020-12-31 08:34:23', 2),
(6, '2020-12-11 11:05:08', '2020-12-31 11:05:08', 5),
(7, '2020-12-11 11:08:22', '2020-12-31 11:08:22', 7),
(8, '2020-12-11 11:08:22', '2020-12-31 11:08:22', 8);
-----------------------------------
-- Branch Table --
DROP TABLE IF EXISTS `BRANCH`;
CREATE TABLE IF NOT EXISTS `BRANCH` (
  `BId` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`BId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `BRANCH` (`BId`, `Name`, `Location`) VALUES
(1, 'LibraryA', 'Vailsberg'),
(2, 'LibraryB', 'Clinton'),
(3, 'LibraryC', 'Van Buren');
-----------------------------------
-- Copy Table --
DROP TABLE IF EXISTS `COPY`;
CREATE TABLE IF NOT EXISTS `COPY` (
  `Copy_DocId` int(64) UNSIGNED NOT NULL,
  `CopyNo` int(64) UNSIGNED NOT NULL,
  `Copy_BId` int(64) UNSIGNED NOT NULL,
  `Position` varchar(6) NOT NULL,
  PRIMARY KEY (`Copy_DocId`,`CopyNo`),
  FOREIGN KEY (`Copy_DocId`) REFERENCES `DOCUMENT`(`DocId`),
  FOREIGN KEY (`Copy_BId`) REFERENCES `BRANCH`(`BId`)
--   KEY `BId` (`Copy_BId`),
--   KEY `DocId` (`Copy_DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `COPY` VALUES
(2, 1, 1, '001C10'),
(3, 1, 1, '015Z23'),
(3, 2, 3, '012Z05'),
(4, 1, 3, '022Q03'),
(5, 2, 2, '011C01'),
(5, 3, 2, '003M09'),
(6, 1, 1, '006J12'),
(7, 2, 1, '007J23'),
(8, 1, 3, '008J25'),
(8, 4, 1, 'AB1Q21'),
(9, 2, 3, '008J26'),
(9, 5, 1, 'AB1Q21'),
(10, 1, 1, '002B05');
-----------------------------------
-- Borrows Table --
DROP TABLE IF EXISTS `BORROWS`;
CREATE TABLE IF NOT EXISTS `BORROWS` (
  `Copy_DocId` int(64) UNSIGNED NOT NULL,
  `CopyNo` int(64) UNSIGNED NOT NULL,
  `BorNumber` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`Copy_DocId`,`CopyNo`,`BorNumber`),
  FOREIGN KEY (`BorNumber`) REFERENCES `BOR_TRANSACTION`(`BorNumber`),
  FOREIGN KEY (`Copy_DocId`) REFERENCES `COPY`(`Copy_DocId`)
--   KEY `BorNumber` (`BorNumber`),
--   KEY `Copy_DocId` (`Copy_DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `BORROWS` VALUES
(3, 1, 1),
(4, 3, 3),
(6, 4, 6),
(9, 7, 8);
-----------------------------------
-- Borrows Triggers --
DROP TRIGGER IF EXISTS `NoOfCopiesBorrows_R`;
DELIMITER $$
CREATE TRIGGER `NoOfCopiesBorrows_R` BEFORE INSERT ON `BORROWS` FOR EACH ROW UPDATE Copy SET NoOfCopies = NoOfCopies - 1
WHERE Copy_DocId = NEW.Copy_DocId
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `NoOfCopiesReturn_R`;
DELIMITER $$
CREATE TRIGGER `NoOfCopiesReturn_R` AFTER DELETE ON `BORROWS` FOR EACH ROW UPDATE Copy SET NoOfCopies = NoOfCopies + 1
WHERE Copy_DocId = OLD.Copy_DocId
$$
DELIMITER ;

-- Journal Issue Table --
DROP TABLE IF EXISTS `JOURNAL_ISSUE`;
CREATE TABLE IF NOT EXISTS `JOURNAL_ISSUE` (
  `Vol_DocId` int(64) UNSIGNED NOT NULL,
  `IssueNo` int(10) UNSIGNED NOT NULL,
  `Scope` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Vol_DocId`,`IssueNo`),
  UNIQUE KEY `IssueNo` (`IssueNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `JOURNAL_ISSUE` VALUES
(2, 2, 'Slice of Life'),
(2, 4, 'Science'),
(3, 3, 'Economics'),
(4, 8, 'Business'),
(5, 7, 'Sports'),
(6, 9, 'Music');
-----------------------------------
-- Gedit Table --
DROP TABLE IF EXISTS `GEDITS`;
CREATE TABLE IF NOT EXISTS `GEDITS` (
  `Vol_DocId` int(64) UNSIGNED NOT NULL,
  `IssueNo` int(10) UNSIGNED NOT NULL,
  `Guest_Editor` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`Vol_DocId`,`IssueNo`),
  FOREIGN KEY (`Vol_DocId`) REFERENCES `JOURNAL_ISSUE`(`Vol_DocId`),
  FOREIGN KEY (`Guest_Editor`) REFERENCES `PERSON`(`PId`)
--   KEY `Vol_DocId` (`Vol_DocId`),
--   KEY `PId` (`Guest_Editor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `GEDITS` VALUES
(2, 2, 2),
(3, 2, 7),
(4, 8, 12),
(5, 4, 9);
-----------------------------------
-- Journal Volume Table --
DROP TABLE IF EXISTS `JOURNAL_VOLUME`;
CREATE TABLE IF NOT EXISTS `JOURNAL_VOLUME` (
  `Vol_DocId` int(64) UNSIGNED NOT NULL,
  `VolumeNo` int(10) UNSIGNED NOT NULL,
  `Chief_Editor` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`Vol_DocId`),
  FOREIGN KEY (`Chief_Editor`) REFERENCES `PERSON`(`PId`),
  FOREIGN KEY (`Vol_DocId`) REFERENCES `DOCUMENT`(`DocId`)
--   KEY `Chief_Editor` (`Chief_Editor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `JOURNAL_VOLUME` VALUES
(2, 1, 6),
(3, 2, 6),
(4, 1, 7),
(5, 3, 16),
(6, 4, 15),
(7, 5, 15);
-----------------------------------
-- Proceedings Table --
DROP TABLE IF EXISTS `PROCEEDINGS`;
CREATE TABLE IF NOT EXISTS `PROCEEDINGS` (
  `P_DocId` int(64) UNSIGNED NOT NULL,
  `CDate` date NOT NULL,
  `CLocation` varchar(150) NOT NULL,
  PRIMARY KEY (`P_DocId`),
  FOREIGN KEY (`P_DocId`) REFERENCES `DOCUMENT`(`DocId`)
--   KEY `DocId` (`P_DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `PROCEEDINGS` VALUES
(11, '2003-10-19', 'NEWARK'),
(12, '2012-12-10', 'NEW YORK CITY'),
(13, '2016-06-13', 'JERSEY CITY');
-----------------------------------
-- Proceedings Chairs Table --
DROP TABLE IF EXISTS `CHAIRS`;
CREATE TABLE IF NOT EXISTS `CHAIRS` (
  `ChairId` int(64) UNSIGNED NOT NULL,
  `P_DocId` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`P_DocId`,`ChairId`),
  FOREIGN KEY (`P_DocId`) REFERENCES `PROCEEDINGS`(`P_DocId`),
  FOREIGN KEY (`ChairId`) REFERENCES `PERSON`(`PId`)
--   KEY `PId` (`ChairId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `CHAIRS` VALUES
(4, 11),
(8, 12),
(1, 13);
-----------------------------------
-- Reservation Table --
DROP TABLE IF EXISTS `RESERVATION`;
CREATE TABLE IF NOT EXISTS `RESERVATION` (
  `ResNumber` int(64) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ResDateTime` datetime NOT NULL,
  `ResStatus` varchar(64) DEFAULT NULL,
  `Res_reader_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`ResNumber`),
  FOREIGN KEY (`Res_reader_Id`) REFERENCES `READER`(`ReaderId`)
--   KEY `ReaderId` (`Res_reader_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

INSERT INTO `RESERVATION` VALUES
(1, '2020-12-11 08:34:59', 'Reserved', 1),
(2, '2020-12-11 10:49:51', 'Borrowed', 2),
(3, '2020-12-11 11:03:35', 'Returned', 3),
(4, '2020-12-11 11:25:15', 'Borrowed', 4);
-----------------------------------
-- Reserves Table --
DROP TABLE IF EXISTS `RESERVES`;
CREATE TABLE IF NOT EXISTS `RESERVES` (
  `ResNumber` int(64) UNSIGNED NOT NULL,
  `Copy_DocId` int(64) UNSIGNED NOT NULL,
  `CopyNo` int(64) UNSIGNED NOT NULL,
  PRIMARY KEY (`Copy_DocId`,`CopyNo`,`ResNumber`),
  FOREIGN KEY (`Copy_DocId`) REFERENCES `COPY`(`Copy_DocId`),
  FOREIGN KEY (`ResNumber`) REFERENCES `RESERVATION`(`ResNumber`)
--   KEY `ResNumber` (`ResNumber`),
--   KEY `Copy_DocId` (`Copy_DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `RESERVES` VALUES
(1, 2, 1),
(2, 3, 2);
-----------------------------------
-- `RESERVES` Triggers --
DROP TRIGGER IF EXISTS `NoOfCopiesReserves_R`;
DELIMITER $$
CREATE TRIGGER `NoOfCopiesReserves_R` BEFORE INSERT ON `RESERVES` FOR EACH ROW UPDATE Copy SET NoOfCopies = NoOfCopies - 1
WHERE Copy_DocId = NEW.Copy_DocId
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `NoOfCopiesReturnReserve_R`;
DELIMITER $$
CREATE TRIGGER `NoOfCopiesReturnReserve_R` AFTER DELETE ON `RESERVES` FOR EACH ROW UPDATE Copy SET NoOfCopies = NoOfCopies + 1
WHERE Copy_DocId = OLD.Copy_DocId
$$
DELIMITER ;
-----------------------------------
-- `AUTHORS` Constraints --

----- UNCOMMENT FROM BELOW !!!-----

-- ALTER TABLE `AUTHORS`
--   ADD CONSTRAINT `authors_ibfk_1` FOREIGN KEY (`PId`) REFERENCES `person` (`PId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `BOOK` Constraints --
-- ALTER TABLE `book`
--   ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`BookId`) REFERENCES `document` (`DocId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `BORROWS` Constraints --
-- ALTER TABLE `borrows`
--   ADD CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`DocId`,`CopyNo`,`BId`) REFERENCES `copy` (`DocId`, `CopyNo`, `BId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`BorNumber`) REFERENCES `bor_transaction` (`BorNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `borrows_ibfk_3` FOREIGN KEY (`ReaderId`) REFERENCES `reader` (`ReaderId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `COPY` Constraints --
-- ALTER TABLE `copy`
--   ADD CONSTRAINT `copy_ibfk_2` FOREIGN KEY (`BId`) REFERENCES `branch` (`BId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `DOCUMENT` Constraints --
-- ALTER TABLE `document`
--   ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`PublisherId`) REFERENCES `publisher` (`PublisherId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `GEDITS` Constraints --
-- ALTER TABLE `gedit`
--   ADD CONSTRAINT `gedit_ibfk_1` FOREIGN KEY (`DocId`) REFERENCES `document` (`DocId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `gedit_ibfk_2` FOREIGN KEY (`IssueNo`) REFERENCES `journal_issue` (`IssueNo`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `gedit_ibfk_3` FOREIGN KEY (`GuestEditorId`) REFERENCES `person` (`PId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `JOURNAL_ISSUE` Constraints --
-- ALTER TABLE `journal_issue`
--   ADD CONSTRAINT `journal_issue_ibfk_1` FOREIGN KEY (`DocId`) REFERENCES `journal_volumes` (`DocId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `journal_issue_ibfk_2` FOREIGN KEY (`DocId`) REFERENCES `document` (`DocId`),
--   ADD CONSTRAINT `journal_issue_ibfk_3` FOREIGN KEY (`DocId`) REFERENCES `document` (`DocId`);
-- -----------------------------------
-- -- `JOURNAL_VOLUME` Constraints --
-- ALTER TABLE `journal_volumes`
--   ADD CONSTRAINT `journal_volumes_ibfk_1` FOREIGN KEY (`ChiefEditorId`) REFERENCES `person` (`PId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `journal_volumes_ibfk_2` FOREIGN KEY (`DocId`) REFERENCES `document` (`DocId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `PROCEEDINGS` Constraints --
-- ALTER TABLE `proceedings`
--   ADD CONSTRAINT `proceedings_ibfk_1` FOREIGN KEY (`ProceedingsId`) REFERENCES `document` (`DocId`);
-- -----------------------------------
-- -- `CHAIRS` Constraints --
-- ALTER TABLE `proceedings_chairs`
--   ADD CONSTRAINT `proceedings_chairs_ibfk_1` FOREIGN KEY (`ProceedingsId`) REFERENCES `proceedings` (`ProceedingsId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `proceedings_chairs_ibfk_2` FOREIGN KEY (`ChairId`) REFERENCES `person` (`PId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- -----------------------------------
-- -- `RESERVES` Constraints --
-- ALTER TABLE `reserves`
--   ADD CONSTRAINT `reserves_ibfk_1` FOREIGN KEY (`DocId`,`CopyNo`,`BId`) REFERENCES `copy` (`DocId`, `CopyNo`, `BId`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `reserves_ibfk_2` FOREIGN KEY (`ResNumber`) REFERENCES `reservation` (`ResNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `reserves_ibfk_3` FOREIGN KEY (`ReaderId`) REFERENCES `reader` (`ReaderId`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
-----------------------------------
-- EVENTS --
DROP EVENT `CALC_FINE2`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE2` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 01:43:17' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '2' AND CURRENT_TIMESTAMP() > '2020-12-31 01:43:17'$$

DROP EVENT `CALC_FINE3`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE3` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 01:43:17' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '3' AND CURRENT_TIMESTAMP() > '2020-12-31 01:43:17'$$

DROP EVENT `REMOVE_RESERVATION`$$
CREATE DEFINER=`root`@`localhost` EVENT `REMOVE_RESERVATION` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 18:00:00' ON COMPLETION PRESERVE ENABLE DO DELETE FROM RESERVATION$$

DROP EVENT `CALC_FINE1`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE1` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 08:13:23' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '1' AND CURRENT_TIMESTAMP() > '2020-12-31 08:13:23'$$

DROP EVENT `CALC_FINE4`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE4` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 08:14:02' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '4' AND CURRENT_TIMESTAMP() > '2020-12-31 08:14:02'$$

DROP EVENT `CALC_FINE5`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE5` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 08:34:24' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '5' AND CURRENT_TIMESTAMP() > '2020-12-31 08:34:23'$$

DROP EVENT `CALC_FINE6`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE6` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:05:08' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '6' AND CURRENT_TIMESTAMP() > '2020-12-31 11:05:08'$$

DROP EVENT `CALC_FINE7`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE7` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:08:22' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '7' AND CURRENT_TIMESTAMP() > '2020-12-31 11:08:22'$$

DROP EVENT `CALC_FINE8`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE8` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:08:22' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '8' AND CURRENT_TIMESTAMP() > '2020-12-31 11:08:22'$$

DROP EVENT `CALC_FINE9`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE9` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:08:22' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '9' AND CURRENT_TIMESTAMP() > '2020-12-31 11:08:22'$$

DROP EVENT `CALC_FINE10`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE10` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:25:46' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '10' AND CURRENT_TIMESTAMP() > '2020-12-31 11:25:45'$$

DROP EVENT `CALC_FINE11`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE11` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:35:12' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '11' AND CURRENT_TIMESTAMP() > '2020-12-31 11:35:12'$$

DROP EVENT `CALC_FINE12`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE12` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:35:56' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '12' AND CURRENT_TIMESTAMP() > '2020-12-31 11:35:56'$$

DROP EVENT `CALC_FINE13`$$
CREATE DEFINER=`root`@`localhost` EVENT `CALC_FINE13` ON SCHEDULE EVERY 1 DAY STARTS '2020-12-11 11:35:56' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE BOR_TRANSACTION SET Fine = Fine + 20  WHERE BorNumber = '13' AND CURRENT_TIMESTAMP() > '2020-12-31 11:35:56'$$

DELIMITER ;
COMMIT;