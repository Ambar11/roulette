-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 18, 2020 at 11:33 PM
-- Server version: 10.3.23-MariaDB
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
(1, 'karan', '8169157711', '$2a$10$Kt.zLq/qntiXWgcygLaQV.H5YaCqK3Hgap6PV5rXI7HVMbksOeZtG', 'admin', 'karan2000patil@gmail.com', 0);

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
(1, 1, 1, 9, 115),
(2, 1, 1, 10, 500),
(3, 1, 1, 10, 10),
(4, 1, 1, 10, 50),
(5, 1, 1, 10, 150),
(6, 1, 1, 11, 50),
(7, 1, 1, 11, 50);

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
(1, 'Mon Jul 13 2020 07:37:47 GMT+0530 (India Standard Time)', 2),
(5, 'Sat Jul 18 2020 19:54:33 GMT+0530 (India Standard Time)', 0);

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
(1, 2, 500),
(2, 3, 1566),
(3, 4, 0),
(4, 5, 0),
(5, 6, 0),
(6, 7, 0),
(7, 8, 0),
(8, 1, 72000),
(9, 9, 0),
(10, 10, 0),
(11, 11, 0);

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
(1, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 566, 'CREDITED'),
(2, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 566, 'CREDITED'),
(3, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 200, 'CREDITED'),
(4, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 132, 'CREDITED'),
(5, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 400, 'CREDITED'),
(6, 1, 0, 'BETING', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 5, 'DEBITED'),
(7, 0, 0, 'BETING', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 5, 'DEBITED'),
(8, 0, 0, 'BETING', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 5, 'DEBITED'),
(9, 0, 0, 'BETING', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 50, 'DEBITED'),
(10, 0, 0, 'BETING', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 50, 'DEBITED'),
(11, 1, 1, 'CASHIER', 'Mon Jul 13 2020 20:49:38 GMT+0530 (India Standard Time)', 400, 'DEBITED'),
(12, 5, 0, 'BETING', 'Tue Jul 14 2020 13:03:03 GMT+0530 (India Standard Time)', 50, 'DEBITED'),
(13, 6, 0, 'BETING', 'Tue Jul 14 2020 13:03:43 GMT+0530 (India Standard Time)', 50, 'DEBITED'),
(42, 37, 0, 'WINNER', 'Sat Jul 18 2020 19:42:18 GMT+0530 (India Standard Time)', 71000, 'CREDITED'),
(43, 2, 1, 'CASHIER', 'Sun Jul 19 2020 01:22:37 GMT+0530 (India Standard Time)', 500, 'CREDITED'),
(44, 2, 1, 'CASHIER', 'Sun Jul 19 2020 01:25:33 GMT+0530 (India Standard Time)', 500, 'DEBITED'),
(45, 1, 1, 'CASHIER', 'Sun Jul 19 2020 01:30:55 GMT+0530 (India Standard Time)', 500, 'CREDITED'),
(46, 1, 1, 'CASHIER', 'Sun Jul 19 2020 01:33:23 GMT+0530 (India Standard Time)', 500, 'CREDITED'),
(47, 2, 1, 'CASHIER', 'Sun Jul 19 2020 01:42:24 GMT+0530 (India Standard Time)', 500, 'CREDITED'),
(48, 2, 1, 'CASHIER', 'Sun Jul 19 2020 01:43:30 GMT+0530 (India Standard Time)', 500, 'CREDITED'),
(49, 2, 1, 'CASHIER', 'Sun Jul 19 2020 01:43:40 GMT+0530 (India Standard Time)', 500, 'DEBITED');

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
  `email` varchar(256) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `privilege`, `email`, `status`) VALUES
(1, 'karan', '8169157715', '$2a$10$4xI69JqKe0SD0fFuUiCETu9ONL9AE6jESTPpwwVOdEjyeAEonX.hi', 'user', 'kp@gmail.com', 0),
(2, 'karan', '7977338720', '$2a$10$ylS4.lAB3sgSahS/fMsKNOkum72P0nLqw1tR7OaQySvk.NMDkhvo2', 'user', 'kp1@gmail.com', 0),
(3, 'karan', '7977338721', '$2a$10$0VYAx7Nkje2q51zreWik6Oi3GRDZijb5a45s2AQyFCgtjMsrRivlO', 'user', 'kp2@gmail.com', 0),
(4, 'karan', '7977338723', '$2a$10$WSgpXFYnRzt9SnZmLRqs4up8SJFyZVAuhyoJVHxYdcAZ4jCv09XOq', 'user', 'kp12@gmail.com', 0),
(5, 'karan', '7977338712', '$2a$10$VdyW4kDG2v5o96Tboad3Zu/JXz2kQRkZh3P2QgMYxsLR48iaEjcAe', 'user', 'kp122@gmail.com', 0),
(6, 'karan', '7977338133', '$2a$10$aC8F0PIENh7qdDiRkFjWq.hnd6aZMAYg8pG2QWU/QcziVuQ67OpdC', 'user', 'kp1222@gmail.com', 0),
(7, 'karan', '7977338132', '$2a$10$44JV7dL3X93tgxLfV0TRR.a7MpMGCbBlb4dvtTtqSWwP5oC/8qipq', 'user', 'kp121222@gmail.com', 0),
(8, 'karan', '7977338136', '$2a$10$kKYq4of/YB6FjOBlbpAuGupNbmAlfy7IwgTvo8BYvP58JB2NDO7Ke', 'user', 'kp1212222@gmail.com', 0),
(9, 'karan', '7977338167', '$2a$10$mrtf8DcgKLSPvCq31zY6eOcP0m1YyuwaNPB7cAOWESdURYmY7u3MW', 'user', 'kp18@gmail.com', 0),
(10, 'karan', '9892329395', '$2a$10$Lj0o2uupN7cPd4Px0W2w.OdI40M2PVcCvmlSU950t0H6ggL/NE9pW', 'user', 'karan@gmail.com', 0),
(11, 'gajan powar', '9321219320', '$2a$10$E0qV17AomkbQuSe5P.YMguhs1IdpNROtvEiShIsriVmwm72RfgYuW', 'user', 'gaja@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `winner`
--

CREATE TABLE `winner` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `winner`
--

INSERT INTO `winner` (`id`, `game_id`, `u_id`) VALUES
(37, 1, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beting`
--
ALTER TABLE `beting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cashier`
--
ALTER TABLE `cashier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `points`
--
ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `winner`
--
ALTER TABLE `winner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
