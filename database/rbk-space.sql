-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rbk-space
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rbk-space
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rbk-space` DEFAULT CHARACTER SET utf8 ;
USE `rbk-space` ;

-- -----------------------------------------------------
-- Table `rbk-space`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `token` VARCHAR(45) NULL,
  `imgUrl` VARCHAR(500) NULL COMMENT 'Table for basic user’s information',
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`posts` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `postType` VARCHAR(45) NOT NULL,
  `postBody` LONGTEXT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE INDEX `postId_UNIQUE` (`postId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `rbk-space`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`skills` (
  `skillId` INT NOT NULL AUTO_INCREMENT,
  `skillName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`skillId`),
  UNIQUE INDEX `skillId_UNIQUE` (`skillId` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`userSkills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`userSkills` (
  `userId` INT NOT NULL,
  `skillId` INT NOT NULL,
  INDEX `skillId_idx` (`skillId` ASC, `userId` ASC),
  CONSTRAINT `userIdFK`
    FOREIGN KEY (`userId`)
    REFERENCES `rbk-space`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `skillId`
    FOREIGN KEY (`skillId`)
    REFERENCES `rbk-space`.`skills` (`skillId` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`cohorts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`cohorts` (
  `cohortId` INT NOT NULL AUTO_INCREMENT,
  `cohortName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cohortId`),
  UNIQUE INDEX `cohortId_UNIQUE` (`cohortId` ASC),
  UNIQUE INDEX `cohortName_UNIQUE` (`cohortName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`empStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`empStatus` (
  `empId` INT NOT NULL AUTO_INCREMENT,
  `empStatus` VARCHAR(45) NULL,
  PRIMARY KEY (`empId`),
  UNIQUE INDEX `empId_UNIQUE` (`empId` ASC),
  UNIQUE INDEX `empStatus_UNIQUE` (`empStatus` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`userDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`userDetails` (
  `userId` INT NOT NULL,
  `cohortId` INT NOT NULL,
  `empStatus` INT NOT NULL,
  `github` VARCHAR(500) NULL,
  `facebook` VARCHAR(500) NULL,
  `twitter` VARCHAR(500) NULL,
  `linkedin` VARCHAR(500) NULL,
  INDEX `userId_idx` (`userId` ASC),
  INDEX `cohortId_idx` (`cohortId` ASC),
  INDEX `empStatus_idx` (`empStatus` ASC),
  CONSTRAINT `userIdDetFk`
    FOREIGN KEY (`userId`)
    REFERENCES `rbk-space`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cohortId`
    FOREIGN KEY (`cohortId`)
    REFERENCES `rbk-space`.`cohorts` (`cohortId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `empStatus`
    FOREIGN KEY (`empStatus`)
    REFERENCES `rbk-space`.`empStatus` (`empId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`projects` (
  `projectId` INT NOT NULL,
  `title` VARCHAR(100) NULL,
  `desc` MEDIUMTEXT NULL,
  `link` VARCHAR(500) NULL,
  PRIMARY KEY (`projectId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rbk-space`.`portfolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rbk-space`.`portfolio` (
  `userId` INT NOT NULL,
  `projectId` INT NOT NULL,
  INDEX `userId_idx` (`userId` ASC),
  INDEX `projectId_idx` (`projectId` ASC),
  CONSTRAINT `userIdPtFk`
    FOREIGN KEY (`userId`)
    REFERENCES `rbk-space`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `projectId`
    FOREIGN KEY (`projectId`)
    REFERENCES `rbk-space`.`projects` (`projectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
