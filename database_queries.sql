-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 16.12.2021 klo 10:05
-- Palvelimen versio: 5.5.68-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forsale`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `listings`
--

CREATE TABLE IF NOT EXISTS `listings` (
  `listing_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `description` text,
  `price` int(11) NOT NULL,
  `listing_date` datetime NOT NULL,
  `title` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL DEFAULT 'Helsinki'
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  `unique_key` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '1',
  `profile_pic` varchar(100) DEFAULT '0',
  `joined_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `passwd`, `role`, `profile_pic`, `joined_date`) VALUES
(94, 'admin', 'admin', 'admin@admin.fi', '$2a$10$6mt8DQtMzjzqz9xY.SZvk.G7ghiFxgoEXR0ef6lNJ2JTan4CsE6CG', 0, '0', '2021-12-15 10:23:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `listing_id` (`listing_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`listing_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`unique_key`),
  ADD UNIQUE KEY `index_reviews_unique_key` (`unique_key`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=129;
--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `listing_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=98;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
