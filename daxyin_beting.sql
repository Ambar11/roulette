-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 10, 2020 at 10:51 PM
-- Server version: 10.3.24-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daxyin_beting`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `privilege` varchar(256) NOT NULL DEFAULT 'admin',
  `email` varchar(256) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `username`, `password`, `privilege`, `email`, `status`) VALUES
(2, 'karan', '8169157711', '$2a$10$Kt.zLq/qntiXWgcygLaQV.H5YaCqK3Hgap6PV5rXI7HVMbksOeZtG', 'admin', 'karan2000patil@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `beting`
--

CREATE TABLE `beting` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `beting`
--

INSERT INTO `beting` (`id`, `game_id`, `u_id`, `number`, `points`) VALUES
(219, 22, 41, 5, 100),
(220, 23, 41, 12, 12),
(221, 23, 41, 25, 50),
(222, 23, 41, 29, 50),
(223, 23, 41, 10, 100),
(224, 23, 41, 54, 50),
(225, 23, 41, 9, 10),
(226, 23, 42, 1, 1000),
(227, 23, 42, 99, 800),
(228, 23, 42, 56, 700),
(229, 23, 42, 1, 50),
(230, 24, 41, 21, 21),
(231, 24, 41, 21, 233),
(232, 24, 41, 12, 234),
(233, 24, 41, 10, 200);

-- --------------------------------------------------------

--
-- Table structure for table `cashier`
--

CREATE TABLE `cashier` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `privilege` varchar(256) NOT NULL DEFAULT 'cashier',
  `email` varchar(256) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cashier`
--

INSERT INTO `cashier` (`id`, `name`, `username`, `password`, `privilege`, `email`, `status`) VALUES
(1, 'ambar', '8169157712', '$2a$10$Kt.zLq/qntiXWgcygLaQV.H5YaCqK3Hgap6PV5rXI7HVMbksOeZtG', 'cashier', 'ambarpatil@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `date` varchar(256) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `date`, `status`) VALUES
(22, 'Sun Aug 09 2020 10:03:14 GMT+0000 (Coordinated Universal Time)', 2),
(23, 'Sun Aug 09 2020 10:12:52 GMT+0000 (Coordinated Universal Time)', 2),
(24, 'Mon Aug 10 2020 05:13:13 GMT+0000 (Coordinated Universal Time)', 0);

-- --------------------------------------------------------

--
-- Table structure for table `points`
--

CREATE TABLE `points` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `points`
--

INSERT INTO `points` (`id`, `u_id`, `points`) VALUES
(41, 41, 9440),
(42, 42, 122449),
(43, 43, 0),
(44, 44, 0),
(45, 45, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `refrence` int(11) NOT NULL,
  `cashier_id` int(11) NOT NULL DEFAULT 0,
  `type` varchar(256) NOT NULL,
  `date` varchar(256) NOT NULL,
  `points` int(11) NOT NULL,
  `status` varchar(256) NOT NULL DEFAULT 'DEBITED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `refrence`, `cashier_id`, `type`, `date`, `points`, `status`) VALUES
(304, 41, 1, 'CASHIER', 'Sun Aug 09 2020 10:04:45 GMT+0000 (Coordinated Universal Time)', 500, 'CREDITED'),
(305, 219, 0, 'BETING', 'Sun Aug 09 2020 10:05:53 GMT+0000 (Coordinated Universal Time)', 100, 'DEBITED'),
(306, 49, 0, 'WINNER', 'Sun Aug 09 2020 10:07:24 GMT+0000 (Coordinated Universal Time)', 10000, 'CREDITED'),
(307, 220, 0, 'BETING', 'Sun Aug 09 2020 17:37:18 GMT+0000 (Coordinated Universal Time)', 12, 'DEBITED'),
(308, 221, 0, 'BETING', 'Sun Aug 09 2020 18:20:48 GMT+0000 (Coordinated Universal Time)', 50, 'DEBITED'),
(309, 222, 0, 'BETING', 'Sun Aug 09 2020 18:21:53 GMT+0000 (Coordinated Universal Time)', 50, 'DEBITED'),
(310, 223, 0, 'BETING', 'Sun Aug 09 2020 18:22:17 GMT+0000 (Coordinated Universal Time)', 100, 'DEBITED'),
(311, 224, 0, 'BETING', 'Sun Aug 09 2020 18:22:54 GMT+0000 (Coordinated Universal Time)', 50, 'DEBITED'),
(312, 225, 0, 'BETING', 'Sun Aug 09 2020 18:35:40 GMT+0000 (Coordinated Universal Time)', 10, 'DEBITED'),
(313, 42, 1, 'CASHIER', 'Sun Aug 09 2020 19:05:46 GMT+0000 (Coordinated Universal Time)', 19999, 'CREDITED'),
(314, 226, 0, 'BETING', 'Sun Aug 09 2020 19:06:13 GMT+0000 (Coordinated Universal Time)', 1000, 'DEBITED'),
(315, 227, 0, 'BETING', 'Sun Aug 09 2020 19:06:32 GMT+0000 (Coordinated Universal Time)', 800, 'DEBITED'),
(316, 228, 0, 'BETING', 'Sun Aug 09 2020 19:06:47 GMT+0000 (Coordinated Universal Time)', 700, 'DEBITED'),
(317, 229, 0, 'BETING', 'Sun Aug 09 2020 19:07:04 GMT+0000 (Coordinated Universal Time)', 50, 'DEBITED'),
(318, 50, 0, 'WINNER', 'Sun Aug 09 2020 19:07:38 GMT+0000 (Coordinated Universal Time)', 105000, 'CREDITED'),
(319, 230, 0, 'BETING', 'Mon Aug 10 2020 05:14:01 GMT+0000 (Coordinated Universal Time)', 21, 'DEBITED'),
(320, 231, 0, 'BETING', 'Mon Aug 10 2020 05:14:53 GMT+0000 (Coordinated Universal Time)', 233, 'DEBITED'),
(321, 232, 0, 'BETING', 'Mon Aug 10 2020 05:15:31 GMT+0000 (Coordinated Universal Time)', 234, 'DEBITED'),
(322, 233, 0, 'BETING', 'Mon Aug 10 2020 05:15:58 GMT+0000 (Coordinated Universal Time)', 200, 'DEBITED');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `privilege` varchar(256) NOT NULL DEFAULT 'user',
  `email` varchar(256) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `privilege`, `email`, `status`) VALUES
(41, 'harry potter', '1234567890', '$2a$10$7zSuLpDleOW2MBm0SqCaC.tQ0Kr0vgju0WFxH5RvKtoRzG4AplCWK', 'user', NULL, 0),
(42, 'Ambar', '7977338720', '$2a$10$ucSHITv49MldtyM1mwv6geu/erADcC4/.JkM.yhJIkE.vyjPGxthS', 'user', NULL, 0),
(43, 'Yash Karade', '9322244007', '$2a$10$h2BPkcUzu767.4XAPE6Jc.CPJwEXDP5HUwiq2d9DmYUDqTpZgA8ja', 'user', NULL, 0),
(44, 'kajal', '8169157714', '$2a$10$q.gbvhKKirJA3SiGGuINSeLNDeao225xroIPnAV5PajPSzch65ajO', 'user', NULL, 0),
(45, 'Raj', '8778140570', '$2a$10$dbwQb9/.YuB6muTzZnm15O34CWiY9iSs/RnUn0BXsu8jwVd5oSLWW', 'user', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `winner`
--

CREATE TABLE `winner` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `winner`
--

INSERT INTO `winner` (`id`, `game_id`, `u_id`, `number`) VALUES
(49, 22, 41, 5),
(50, 23, 42, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beting`
--
ALTER TABLE `beting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cashier`
--
ALTER TABLE `cashier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `winner`
--
ALTER TABLE `winner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `beting`
--
ALTER TABLE `beting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT for table `cashier`
--
ALTER TABLE `cashier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `points`
--
ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=323;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `winner`
--
ALTER TABLE `winner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
