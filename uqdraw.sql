-- phpMyAdmin SQL Dump
-- version 4.3.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 03, 2015 at 05:31 AM
-- Server version: 5.6.19
-- PHP Version: 5.5.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uqdraw`
--

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE IF NOT EXISTS `Course` (
  `lecturerID` varchar(11) NOT NULL,
  `courseID` varchar(11) NOT NULL,
  `enteringCode` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`lecturerID`, `courseID`, `enteringCode`) VALUES
('t2345678', 'AAAA1234', 'D45'),
('t1234567', 'AAAA1324', 'A11'),
('t2345678', 'BBBB1234', '4xh'),
('s4371125', 'BBBB1234-15', 'ab6'),
('t2345678', 'BBBB1237', 'AAA');

-- --------------------------------------------------------

--
-- Table structure for table `Lecturer`
--

CREATE TABLE IF NOT EXISTS `Lecturer` (
  `lecturerID` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Lecturer`
--

INSERT INTO `Lecturer` (`lecturerID`) VALUES
('s4371125'),
('t1234567'),
('t2345678'),
('t3456789'),
('t45654565');

-- --------------------------------------------------------

--
-- Table structure for table `Question`
--

CREATE TABLE IF NOT EXISTS `Question` (
  `courseID` varchar(11) NOT NULL,
  `questionID` int(11) NOT NULL,
  `questionWeek` int(11) NOT NULL COMMENT 'A_I',
  `questionTitle` text NOT NULL,
  `questionImage` text COMMENT 'default_null',
  `status` tinyint(1) NOT NULL COMMENT 'boolean'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Question`
--

INSERT INTO `Question` (`courseID`, `questionID`, `questionWeek`, `questionTitle`, `questionImage`, `status`) VALUES
('AAAA1234', 1, 1, 'Draw a flower', NULL, 0),
('AAAA1234', 2, 3, 'Draw your hand', NULL, 0),
('BBBB1234', 3, 2, 'Draw an ERD Diagram by using following shapes', 'http://static3.creately.com/blog/wp-content/uploads/2012/03/ER-Diagram-Elements.jpeg', 0),
('BBBB1234-15', 5, 3, 'Draw a graph', NULL, 0),
('BBBB1237', 7, 3, 'Draw a class Diagram [week2 second lecture class]', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Submission`
--

CREATE TABLE IF NOT EXISTS `Submission` (
  `questionID` int(11) NOT NULL,
  `studentID` varchar(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `submittedImage` text NOT NULL,
  `result` tinyint(1) NOT NULL COMMENT 'correct or not, set initial to false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Submission`
--

INSERT INTO `Submission` (`questionID`, `studentID`, `date`, `submittedImage`, `result`) VALUES
(3, 's4378309', '2015-09-03 05:28:42', 'http://i.stack.imgur.com/QUbgf.gif', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`courseID`), ADD UNIQUE KEY `enteringCode` (`enteringCode`), ADD KEY `lecturerID` (`lecturerID`), ADD KEY `lecturerID_2` (`lecturerID`), ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `Lecturer`
--
ALTER TABLE `Lecturer`
  ADD PRIMARY KEY (`lecturerID`), ADD UNIQUE KEY `lecturerID` (`lecturerID`);

--
-- Indexes for table `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`questionID`), ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `Submission`
--
ALTER TABLE `Submission`
  ADD UNIQUE KEY `questionID` (`questionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Question`
--
ALTER TABLE `Question`
  MODIFY `questionID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Course`
--
ALTER TABLE `Course`
ADD CONSTRAINT `Course_ibfk_1` FOREIGN KEY (`lecturerID`) REFERENCES `Lecturer` (`lecturerID`);

--
-- Constraints for table `Question`
--
ALTER TABLE `Question`
ADD CONSTRAINT `Question_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `Course` (`courseID`);

--
-- Constraints for table `Submission`
--
ALTER TABLE `Submission`
ADD CONSTRAINT `Submission_ibfk_1` FOREIGN KEY (`questionID`) REFERENCES `Question` (`questionID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
