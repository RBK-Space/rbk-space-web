-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS
, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS
, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE
, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rbk-space
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rbk-space
-- -----------------------------------------------------
CREATE SCHEMA
IF NOT EXISTS `rbk-space` DEFAULT CHARACTER
SET utf8 ;
USE `rbk-space`
;

-- -----------------------------------------------------
-- Table `rbk-space`.`users`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`users`
(
  `userID` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR
(100) NOT NULL,
  `username` VARCHAR
(45) NOT NULL,
  `email` VARCHAR
(45) NOT NULL,
  `token` VARCHAR
(45) NULL,
  `imgUrl` VARCHAR
(500) NULL COMMENT 'Table for basic user’s information',
  PRIMARY KEY
(`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`posts`
-- -----------------------------------------------------
CREATE TABLE `posts`
(
  `postId` int
(11) NOT NULL AUTO_INCREMENT,
  `postType` tinyint
(4) NOT NULL DEFAULT '0' COMMENT '0: Text (default value)\n1: Image ',
  `postBody` longtext,
  `userId` int
(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`postId`),
  UNIQUE KEY `postId_UNIQUE`
(`postId`),
  KEY `userId_idx`
(`userId`),
  CONSTRAINT `userId` FOREIGN KEY
(`userId`) REFERENCES `users`
(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


-- -----------------------------------------------------
-- Table `rbk-space`.`skills`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`skills`
(
  `skillId` INT NOT NULL AUTO_INCREMENT,
  `skillName` VARCHAR
(45) NOT NULL,
  PRIMARY KEY
(`skillId`),
  UNIQUE INDEX `skillId_UNIQUE`
(`skillId` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`userSkills`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`userSkills`
(
  `userId` INT NOT NULL,
  `skillId` INT NOT NULL,
  INDEX `skillId_idx`
(`skillId` ASC, `userId` ASC),
  CONSTRAINT `userIdFK`
    FOREIGN KEY
(`userId`)
    REFERENCES `rbk-space`.`users`
(`userID`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION,
  CONSTRAINT `skillId`
    FOREIGN KEY
(`skillId`)
    REFERENCES `rbk-space`.`skills`
(`skillId` )
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`cohorts`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`cohorts`
(
  `cohortId` INT NOT NULL AUTO_INCREMENT,
  `cohortName` VARCHAR
(45) NOT NULL,
  PRIMARY KEY
(`cohortId`),
  UNIQUE INDEX `cohortId_UNIQUE`
(`cohortId` ASC),
  UNIQUE INDEX `cohortName_UNIQUE`
(`cohortName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`empStatus`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`empStatus`
(
  `empId` INT NOT NULL AUTO_INCREMENT,
  `empStatus` VARCHAR
(45) NULL,
  PRIMARY KEY
(`empId`),
  UNIQUE INDEX `empId_UNIQUE`
(`empId` ASC),
  UNIQUE INDEX `empStatus_UNIQUE`
(`empStatus` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`userDetails`
-- -----------------------------------------------------
CREATE TABLE `userDetails`
(
  `userId` int
(11) NOT NULL,
  `cohortId` int
(11) NOT NULL,
  `empStatus` int
(11) NOT NULL,
  `github` varchar
(500) DEFAULT NULL,
  `facebook` varchar
(500) DEFAULT NULL,
  `twitter` varchar
(500) DEFAULT NULL,
  `linkedin` varchar
(500) DEFAULT NULL,
  `imgUrl` varchar
(500) DEFAULT NULL,
  `bio` varchar
(500) DEFAULT NULL,
  KEY `userId_idx`
(`userId`),
  KEY `cohortId_idx`
(`cohortId`),
  KEY `empStatus_idx`
(`empStatus`),
  CONSTRAINT `cohortId` FOREIGN KEY
(`cohortId`) REFERENCES `cohorts`
(`cohortId`),
  CONSTRAINT `empStatus` FOREIGN KEY
(`empStatus`) REFERENCES `empstatus`
(`empId`),
  CONSTRAINT `userIdDetFk` FOREIGN KEY
(`userId`) REFERENCES `users`
(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


-- -----------------------------------------------------
-- Table `rbk-space`.`projects`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`projects`
(
  `projectId` INT NOT NULL,
  `title` VARCHAR
(100) NULL,
  `desc` MEDIUMTEXT NULL,
  `link` VARCHAR
(500) NULL,
  PRIMARY KEY
(`projectId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`portfolio`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `rbk-space`.`portfolio`
(
  `userId` INT NOT NULL,
  `projectId` INT NOT NULL,
  INDEX `userId_idx`
(`userId` ASC),
  INDEX `projectId_idx`
(`projectId` ASC),
  CONSTRAINT `userIdPtFk`
    FOREIGN KEY
(`userId`)
    REFERENCES `rbk-space`.`users`
(`userID`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION,
  CONSTRAINT `projectId`
    FOREIGN KEY
(`projectId`)
    REFERENCES `rbk-space`.`projects`
(`projectId`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE
=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS
=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS
=@OLD_UNIQUE_CHECKS;


DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCohorts`
()
BEGIN
  select c.cohortId as cohortId, c.cohortName
  from `rbk
  -space`.cohorts as c;
END
;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPostsByCohort`
(IN cohort varchar
(10))
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl as imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt, c.cohortName
  from `rbk
  -space`.users u 
	left join `rbk-space`.posts p on
  (u.userID = p.userId) 
    left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
    left join `rbk-space`.cohorts as c on
  (ud.cohortId = c.cohortId)
	where c.cohortName REGEXP cohort;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmpStatus`
()
BEGIN
  select es.empId as empId, es.empStatus
  from `rbk
  -space`.empStatus as es;
END
;;
DELIMITER ;

USE `rbk-space`;
DROP procedure IF EXISTS `getPosts`;

DELIMITER ;;
USE `rbk-space`
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPosts`
()
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl as imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt
  from `rbk
  -space`.users u 
	left join `rbk-space`.posts p on
  (u.userID = p.userId)
;
END

DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPostsByBody`
(IN body varchar
(100))
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt
  from `rbk
  -space`.users u 
    left join `rbk-space`.userDetails ud on
  (u.useriD = ud.userId)
	left join `rbk-space`.posts p on
  (u.userID = p.userId) 
	where p.postBody REGEXP body;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPostsByCohort`
(IN cohort varchar
(10))
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl as imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt, c.cohortName
  from `rbk
  -space`.users u 
	left join `rbk-space`.posts p on
  (u.userID = p.userId) 
    left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
    left join `rbk-space`.cohorts as c on
  (ud.cohortId = c.cohortId)
	where c.cohortName REGEXP cohort;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPostsByType`
(IN type tinyint)
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl as imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt
  from `rbk
  -space`.users u 
    left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
	left join `rbk-space`.posts p on
  (u.userID = p.userId) 
	where p.postType = type;

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPostsByUser`
(IN user varchar
(10))
BEGIN
  select u.userID as userId, u.username as userName, u.fullName as fullName, ud.imgUrl as imgUrl, p.postId as postId,
    p.postBody as postBody, p.postType as postType, p.createdAt as createdAt
  from `rbk
  -space`.users u 
    left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
	left join `rbk-space`.posts p on
  (u.userID = p.userId) 
	where u.fullName REGEXP user;
END;;
DELIMITER ;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProjectById`
(IN id int)
BEGIN
  select u.userID as userId, u.fullName, pr.projectId as projectId,
    pr.title as projectTitle, pr.link as projectLink, pr.desc as projectDesc
  from `rbk
  -space`.users u
left join `rbk-space`.portfolio pt on
  (pt.userId = u.userID)
left join `rbk-space`.projects pr on
  (pt.projectId = pr.projectId)
where pt.projectId = id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProjects`
(IN id int)
BEGIN
  select u.userID as userId, u.fullName, pr.projectId as projectId,
    pr.title as projectTitle, pr.link as projectLink, pr.desc as projectDesc
  from `rbk
  -space`.users u
	left join `rbk-space`.portfolio pt on
  (pt.userId = u.userID)
	left join `rbk-space`.projects pr on
  (pt.projectId = pr.projectId);
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserById`
(IN userId int)
BEGIN
  select u.userID as userId, u.fullName as fullName, u.username as username, ud.imgUrl as image,
    u.email as email, ud.facebook as fb, ud.github as gh, ud.linkedin as li, ud.twitter as tw,
    c.cohortName as cohort, es.empStatus as empStat
  from `rbk
  -space`.users u 
left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
left join `rbk-space`.cohorts c on
  (ud.cohortId = c.cohortId)
left join `rbk-space`.empStatus es on
  (ud.empStatus = es.empId)
where u.userId = userId;

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByName`
(IN name varchar
(20))
BEGIN
  select u.userID as userId, u.fullName as fullName, u.username as username, ud.imgUrl as image,
    u.email as email, ud.facebook as fb, ud.github as gh, ud.linkedin as li, ud.twitter as tw,
    c.cohortName as cohort, es.empStatus as empStat
  from `rbk
  -space`.users u 
	left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
	left join `rbk-space`.cohorts c on
  (ud.cohortId = c.cohortId)
	left join `rbk-space`.empStatus es on
  (ud.empStatus = es.empId)
	where u.fullName REGEXP name;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserBySkill`
(IN skill varchar
(10))
BEGIN
  select u.userID as userId, u.fullName as fullName, u.username as username, ud.imgUrl as image,
    u.email as email, ud.facebook as fb, ud.github as gh, ud.linkedin as li, ud.twitter as tw,
    c.cohortName as cohort, es.empStatus as empStat, s.skillName as skill
  from `rbk
  -space`.users u 
	left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
	left join `rbk-space`.cohorts c on
  (ud.cohortId = c.cohortId)
	left join `rbk-space`.empStatus es on
  (ud.empStatus = es.empId)
    left join `rbk-space`.userSkills  us on
  (u.userId = us.userId)
    left join `rbk-space`.skills s on
  (us.skillId = s.skillId)
	where s.skillName REGEXP skill;

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserProjects`
(IN userName varchar
(20))
BEGIN
  select u.userID as userId, u.fullName, pr.projectId as projectId,
    pr.title as projectTitle, pr.link as projectLink, pr.desc as projectDesc
  from `rbk
  -space`.users u
left join `rbk-space`.portfolio pt on
  (pt.userId = u.userID)
left join `rbk-space`.projects pr on
  (pt.projectId = pr.projectId)
where u.fullName REGEXP userName;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsers`
()
BEGIN
  select u.userID as userId, u.fullName as fullName, u.username as username, ud.imgUrl as image,
    u.email as email, ud.facebook as fb, ud.github as gh, ud.linkedin as li, ud.twitter as tw,
    c.cohortName as cohort, es.empStatus as empStat
  from `rbk
  -space`.users u 
left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
left join `rbk-space`.cohorts c on
  (ud.cohortId = c.cohortId)
left join `rbk-space`.empStatus es on
  (ud.empStatus = es.empId);

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsersByEmpStat`
(IN status varchar
(10))
BEGIN
  select u.userID as userId, u.fullName as fullName, u.username as username, ud.imgUrl as image,
    u.email as email, ud.facebook as fb, ud.github as gh, ud.linkedin as li, ud.twitter as tw,
    c.cohortName as cohort, es.empStatus as empStat
  from `rbk
  -space`.users u 
	left join `rbk-space`.userDetails ud on
  (u.userID = ud.userId)
	left join `rbk-space`.cohorts c on
  (ud.cohortId = c.cohortId)
	left join `rbk-space`.empStatus es on
  (ud.empStatus = es.empId)
	where es.empStatus REGEXP status;
END ;;
DELIMITER ;

USE `rbk-space`;
DROP procedure IF EXISTS `addUser`;

DELIMITER ;;
USE `rbk-space`
CREATE PROCEDURE `addUser`
(IN fullName varchar
(100), username varchar
(45), email varchar
(45), token varchar
(45),
															github varchar
(500), imgUrl varchar
(500))
BEGIN
    START TRANSACTION;
INSERT INTO users
  (fullName, username, email, token)
VALUES(fullName, username, email, token);
INSERT INTO userDetails
  (userid, github, imgUrl)
VALUES(LAST_INSERT_ID(), github, imgUrl);
COMMIT;

END;;

DELIMITER ;