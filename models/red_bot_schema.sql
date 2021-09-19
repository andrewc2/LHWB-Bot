-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 19, 2021 at 01:30 AM
-- Server version: 5.7.31-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-30+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `red_bot`
--

-- --------------------------------------------------------

--
-- Table structure for table `command`
--

CREATE TABLE `command` (
  `id` int(11) NOT NULL,
  `guildID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commandID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countdown`
--

CREATE TABLE `countdown` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `counters`
--

CREATE TABLE `counters` (
  `word` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lastUsed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `counter` bigint(20) NOT NULL DEFAULT '0',
  `user` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gifs`
--

CREATE TABLE `gifs` (
  `id` int(11) NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gifs`
--

INSERT INTO `gifs` (`id`, `path`) VALUES
(1, 'https://i.imgur.com/N96cDAN.gif'),
(2, 'https://i.imgur.com/y9nCr8K.gif'),
(3, 'https://i.imgur.com/HUgn5FB.gif'),
(4, 'https://i.imgur.com/9eJcIEW.gif'),
(5, 'https://i.imgur.com/CTFXOal.gif'),
(6, 'https://i.imgur.com/WBmJLsn.gif'),
(7, 'https://i.imgur.com/1zRv5y3.gif'),
(8, 'https://i.imgur.com/plbLBsr.gif'),
(9, 'https://i.imgur.com/LUof3FC.gif'),
(10, 'https://i.imgur.com/RVOluRU.gif'),
(11, 'https://i.imgur.com/dpKhyC4.gif'),
(12, 'https://i.imgur.com/Fc2ya.gif'),
(13, 'https://i.imgur.com/8GUNd.gif'),
(14, 'https://i.imgur.com/HRG7v.gif'),
(15, 'https://i.imgur.com/RmIlpHo.gif'),
(16, 'https://i.imgur.com/grqED.gif'),
(17, 'https://i.imgur.com/j4IZG.gif'),
(18, 'https://i.imgur.com/Ejn9v.gif'),
(19, 'https://i.imgur.com/y5VV3.gif'),
(20, 'https://i.imgur.com/XKOpG.gif'),
(21, 'https://i.imgur.com/LGz72.gif'),
(22, 'https://i.imgur.com/IrMnQM4.gif'),
(23, 'https://i.imgur.com/sBK82.gif'),
(24, 'https://i.imgur.com/ud2jC.gif'),
(25, 'https://i.imgur.com/cHs5W.gif'),
(26, 'https://i.imgur.com/nUqb7.gif'),
(27, 'https://i.imgur.com/er2zw.gif'),
(28, 'https://i.imgur.com/uiSJX.gif'),
(29, 'https://i.imgur.com/sxKPT.gif'),
(30, 'https://i.imgur.com/Ue7Xu.gif'),
(31, 'https://i.imgur.com/tMs83.gif'),
(32, 'https://i.imgur.com/bQhHA.gif'),
(33, 'https://i.imgur.com/BYV34.gif'),
(34, 'https://i.imgur.com/88QKD.gif'),
(35, 'https://i.imgur.com/6wlRmxk.gif'),
(36, 'https://i.imgur.com/N96cDAN.gif'),
(37, 'https://i.imgur.com/cO5VtkB.gif'),
(38, 'https://i.imgur.com/5Cztq2n.gif'),
(39, 'https://i.imgur.com/C8sH7lE.gif'),
(40, 'https://i.imgur.com/zZjCwrh.gif'),
(41, 'https://i.imgur.com/pqN8xi1.gif'),
(42, 'https://i.imgur.com/yVgwhav.gif'),
(43, 'https://i.imgur.com/wfLjviC.gif'),
(44, 'https://i.imgur.com/lRUXb8B.gif'),
(45, 'https://i.imgur.com/U726YpF.gif'),
(46, 'https://i.imgur.com/uXsxa0k.gif'),
(47, 'https://i.imgur.com/mJNShZj.gif'),
(48, 'https://i.imgur.com/zjZXhTg.gif'),
(49, 'https://i.imgur.com/4u2m2KI.gif'),
(50, 'https://i.imgur.com/R49orXF.gif'),
(51, 'https://i.imgur.com/hUx9BuE.gif'),
(52, 'https://i.imgur.com/IrMnQM4.gif'),
(53, 'https://i.imgur.com/SXwmt6K.gif'),
(54, 'https://i.imgur.com/Gwk4SK6.gif'),
(55, 'https://i.imgur.com/TWGlNDq.gif'),
(56, 'https://i.imgur.com/YuhdbL3.gif'),
(57, 'https://i.imgur.com/hCfBo2G.gif'),
(58, 'https://i.imgur.com/rYeoGT4.gif'),
(59, 'https://i.imgur.com/vU68tTb.gif'),
(60, 'https://i.imgur.com/9WEbXzp.gif'),
(61, 'https://i.imgur.com/Zp6BniE.gif'),
(62, 'https://i.imgur.com/bL3M89J.gif'),
(63, 'https://i.imgur.com/5X42KN3.gif'),
(64, 'https://i.imgur.com/jUen2ng.gif'),
(65, 'https://i.imgur.com/Q3zIq1o.gif'),
(66, 'https://i.imgur.com/XrdfXUR.gif'),
(67, 'https://i.imgur.com/JDSymTX.gif'),
(68, 'https://i.imgur.com/CgtlAWB.gif'),
(69, 'https://i.imgur.com/C7yOjCQ.gif'),
(70, 'https://i.imgur.com/x2cdDM5.gif'),
(71, 'https://i.imgur.com/0MTBUhN.gif'),
(72, 'https://i.imgur.com/h76qReN.gif'),
(73, 'https://i.imgur.com/dbFd3Yd.gif'),
(74, 'https://i.imgur.com/G0fSROf.gif'),
(75, 'https://i.imgur.com/BJ4FWbM.gif'),
(76, 'https://i.imgur.com/IrMnQM4.gif'),
(77, 'https://i.imgur.com/z043KQi.gif'),
(78, 'https://i.imgur.com/xU6Wjon.gif'),
(79, 'https://i.imgur.com/RKOwPeb.gif'),
(80, 'https://i.imgur.com/cLnSNmH.gif'),
(81, 'https://i.imgur.com/GTiIzU4.gif'),
(82, 'https://i.imgur.com/OIQPrvl.gif'),
(83, 'https://i.imgur.com/KyBd6xa.gif'),
(84, 'https://i.imgur.com/DRFrnCd.gif'),
(85, 'https://i.imgur.com/tzgwirM.gif'),
(86, 'https://i.imgur.com/RsmUqqa.gif'),
(87, 'https://i.imgur.com/7iR3WnF.gif'),
(88, 'https://i.imgur.com/oTWCldj.gif'),
(89, 'https://i.imgur.com/leZxsbI.gif');

-- --------------------------------------------------------

--
-- Table structure for table `lastfm`
--

CREATE TABLE `lastfm` (
  `lastfmUsername` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discordTag` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discordID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `guild_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permission_type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ping`
--

CREATE TABLE `Ping` (
  `pingID` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guildID` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `queue_new`
--

CREATE TABLE `queue_new` (
  `id` int(11) NOT NULL,
  `song_detail_id` int(11) NOT NULL,
  `guild_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queued_by` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recent_new`
--

CREATE TABLE `recent_new` (
  `id` int(11) NOT NULL,
  `song_detail_id` int(11) NOT NULL,
  `guild_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queued_by` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requested`
--

CREATE TABLE `requested` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `song_detail`
--

CREATE TABLE `song_detail` (
  `id` int(11) NOT NULL,
  `official_name` varchar(600) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `artist_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoplay` tinyint(1) NOT NULL DEFAULT '1',
  `can_queue` tinyint(1) NOT NULL DEFAULT '1',
  `play_count` int(11) NOT NULL DEFAULT '0',
  `album` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_album` tinyint(1) DEFAULT '0',
  `track_number` int(11) DEFAULT '1',
  `album_art_url` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_play_count` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `song_detail`
--

INSERT INTO `song_detail` (`id`, `official_name`, `artist_name`, `path`, `autoplay`, `can_queue`, `play_count`, `album`, `is_album`, `track_number`, `album_art_url`, `old_play_count`) VALUES
(3, 'Viva La Vida', 'Taylor Swift', 'Viva La Vida.mp3', 1, 1, 67, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1708),
(4, 'Wildest Dreams Grammys', 'Taylor Swift', 'Wildest Dreams Grammys.mp3', 1, 1, 75, 'Grammy Museum', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1721),
(5, 'Blank Space Grammys', 'Taylor Swift', 'Blank Space Grammys.mp3', 1, 1, 79, 'Grammy Museum', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1700),
(6, 'I Wish You Would', 'Taylor Swift', '1989/I Wish You Would.mp3', 1, 1, 71, '1989', 1, 7, 'https://i.imgur.com/i1QDoZR.jpg', 1746),
(7, '22', 'Taylor Swift', 'Red/22.mp3', 1, 1, 130, 'Red', 1, 6, 'http://i.imgur.com/as6dlgi.jpg', 1942),
(8, 'This Love', 'Taylor Swift', '1989/This Love.mp3', 1, 1, 86, '1989', 1, 11, 'https://i.imgur.com/i1QDoZR.jpg', 1761),
(9, 'New Romantics', 'Taylor Swift', '1989/New Romantics.mp3', 1, 1, 81, '1989', 1, 16, 'https://i.imgur.com/i1QDoZR.jpg', 1824),
(10, 'Style', 'Taylor Swift', '1989/Style.mp3', 1, 1, 105, '1989', 1, 3, 'https://i.imgur.com/i1QDoZR.jpg', 1840),
(11, 'Safe & Sound', 'Taylor Swift', 'Safe & Sound.mp3', 1, 1, 81, 'The Hunger Games Soundtrack', 0, 1, 'https://i.imgur.com/KvcKd6Y.jpg', 1754),
(12, 'Sweet Tea And God\'s Graces', 'Taylor Swift', 'Sweet Tea And God\'s Graces.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 9),
(13, 'A Perfectly Good Heart', 'Taylor Swift', 'A Perfectly Good Heart.mp3', 1, 1, 61, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1763),
(14, 'A Place In This World', 'Taylor Swift', 'A Place In This World.mp3', 1, 1, 61, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1745),
(15, 'All Too Well Grammys', 'Taylor Swift', 'All Too Well Grammys.mp3', 1, 1, 74, 'Grammy Awards', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1759),
(16, 'All Too Well', 'Taylor Swift', 'Red/All Too Well.mp3', 1, 1, 113, 'Red', 1, 5, 'http://i.imgur.com/as6dlgi.jpg', 1802),
(17, 'All You Had To Do Was Stay', 'Taylor Swift', '1989/All You Had To Do Was Stay.mp3', 1, 1, 78, '1989', 1, 5, 'https://i.imgur.com/i1QDoZR.jpg', 1783),
(18, 'Am I Ready For Love', 'Taylor Swift', 'Am I Ready For Love.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 6),
(19, 'American Girl', 'Taylor Swift', 'American Girl.mp3', 1, 1, 57, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1772),
(20, 'Angelina', 'Taylor Swift', 'Angelina.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(21, 'Back To December Acoustic', 'Taylor Swift', 'Back To December Acoustic.mp3', 1, 1, 59, 'Speak Now Acoustic', 0, 1, 'https://i.imgur.com/TNKbt8Y.jpg', 1722),
(22, 'Back To December', 'Taylor Swift', 'SpeakNow/Back To December.mp3', 1, 1, 96, 'Speak Now', 1, 3, 'https://i.imgur.com/TNKbt8Y.jpg', 1792),
(23, 'Beautiful Eyes', 'Taylor Swift', 'Beautiful Eyes.mp3', 1, 1, 77, 'Beautiful Eyes EP', 0, 1, 'https://i.imgur.com/7q3N0F6.jpg', 1627),
(24, 'Begin Again', 'Taylor Swift', 'Red/Begin Again.mp3', 1, 1, 74, 'Red', 1, 16, 'http://i.imgur.com/as6dlgi.jpg', 1800),
(25, 'Being With My Baby Acoustic', 'Taylor Swift', 'Being With My Baby Acoustic.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(26, 'Better Off', 'Taylor Swift', 'Better Off.mp3', 0, 1, 6, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 18),
(27, 'Blank Space - Voice Memos', 'Taylor Swift', 'Blank Space - Voice Memos.mp3', 0, 1, 0, '1989', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 2),
(28, 'Blank Space', 'Taylor Swift', '1989/Blank Space.mp3', 1, 1, 93, '1989', 1, 2, 'https://i.imgur.com/i1QDoZR.jpg', 1784),
(29, 'Brand New World', 'Taylor Swift', 'Brand New World.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(30, 'Breathless', 'Taylor Swift', 'Breathless.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(31, 'Brought Up That Way', 'Taylor Swift', 'Brought Up That Way.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 15),
(32, 'By The Way', 'Taylor Swift', 'By The Way.mp3', 0, 1, 2, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 9),
(33, 'Change', 'Taylor Swift', 'Change.mp3', 1, 1, 48, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1747),
(34, 'Check Out This View', 'Taylor Swift', 'Check Out This View.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(35, 'Clean Live', 'Taylor Swift', 'Clean Live.mp3', 1, 1, 80, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1742),
(36, 'Closest To A Cowboy', 'Taylor Swift', 'Closest To A Cowboy.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(37, 'Come In With The Rain', 'Taylor Swift', 'Come In With The Rain.mp3', 1, 1, 64, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1667),
(38, 'Cross My Heart', 'Taylor Swift', 'Cross My Heart.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(39, 'Didn\'t They', 'Taylor Swift', 'Didn\'t They.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(40, 'Don\'t Hate Me For Loving You', 'Taylor Swift', 'Don\'t Hate Me For Loving You.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 4),
(41, 'Drops Of Jupiter Live', 'Taylor Swift', 'Drops Of Jupiter Live.mp3', 1, 1, 70, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1726),
(42, 'Everything Has Changed', 'Taylor Swift', 'Red/Everything Has Changed.mp3', 1, 1, 76, 'Red', 1, 14, 'http://i.imgur.com/as6dlgi.jpg', 1740),
(43, 'Eyes Open', 'Taylor Swift', 'Eyes Open.mp3', 1, 1, 62, 'The Hunger Games', 0, 1, 'https://i.imgur.com/FIQdRNK.jpg', 1776),
(44, 'Fall Back On You', 'Taylor Swift', 'Fall Back On You.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(45, 'Fearless', 'Taylor Swift', 'Fearless.mp3', 1, 1, 82, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1800),
(46, 'Firefly', 'Taylor Swift', 'Firefly.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(47, 'For You', 'Taylor Swift', 'For You.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(48, 'Forever & Always Piano', 'Taylor Swift', 'Forever & Always Piano.mp3', 1, 1, 65, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1704),
(49, 'Half Of My Heart', 'Taylor Swift', 'Half Of My Heart.mp3', 1, 1, 84, 'Battle Studies - Feature', 0, 1, 'https://i.imgur.com/Bs34TEr.jpg', 1729),
(50, 'Haunted Live', 'Taylor Swift', 'Haunted Live.mp3', 1, 1, 58, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1731),
(51, 'Here You Come Again', 'Taylor Swift', 'Here You Come Again.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(52, 'Highway Don\'t Care', 'Taylor Swift', 'Highway Don\'t Care.mp3', 1, 1, 67, 'Two Lanes of Freedom - Feature', 0, 1, 'https://i.imgur.com/6Dxgc9J.jpg', 1721),
(53, 'Holy Ground', 'Taylor Swift', 'Red/Holy Ground.mp3', 1, 1, 74, 'Red', 1, 11, 'http://i.imgur.com/as6dlgi.jpg', 1805),
(54, 'How You Get The Girl', 'Taylor Swift', '1989/How You Get The Girl.mp3', 1, 1, 93, '1989', 1, 10, 'https://i.imgur.com/i1QDoZR.jpg', 1801),
(55, 'Hysteria ft. Def Leppard', 'Taylor Swift', 'Hysteria ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 27),
(56, 'I Don\'t Wanna Live Forever', 'Taylor Swift', 'I Don\'t Wanna Live Forever.mp3', 1, 1, 79, 'Fifty Shades Darker Soundtrack', 0, 1, 'https://i.imgur.com/Etkvhn0.jpg', 1795),
(57, 'I Knew You Were Trouble.', 'Taylor Swift', 'Red/I Knew You Were Trouble..mp3', 1, 1, 252, 'Red', 1, 4, 'http://i.imgur.com/as6dlgi.jpg', 2286),
(60, 'I Know What I Want', 'Taylor Swift', 'I Know What I Want.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(61, 'I Want You Back Live', 'Taylor Swift', 'I Want You Back Live.mp3', 1, 1, 60, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1804),
(62, 'I Want You Back', 'Taylor Swift', 'I Want You Back.mp3', 1, 1, 60, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1747),
(63, 'I\'d Lie', 'Taylor Swift', 'I\'d Lie.mp3', 0, 1, 14, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 55),
(64, 'In The Pouring Rain', 'Taylor Swift', 'In The Pouring Rain.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(65, 'Invisible', 'Taylor Swift', 'Invisible.mp3', 1, 1, 80, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1767),
(66, 'Last Christmas', 'Taylor Swift', 'Last Christmas.mp3', 0, 1, 0, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 7),
(67, 'Last Kiss Live', 'Taylor Swift', 'Last Kiss Live.mp3', 1, 1, 58, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1784),
(68, 'Live For The Little Things', 'Taylor Swift', 'Live For The Little Things.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(69, 'Long Live Live', 'Taylor Swift', 'Long Live Live.mp3', 1, 1, 57, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1735),
(70, 'Long Time Coming', 'Taylor Swift', 'Long Time Coming.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(71, 'Love Story 1989', 'Taylor Swift', 'Love Story 1989.mp3', 1, 1, 79, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1757),
(72, 'Love Story Live', 'Taylor Swift', 'Love Story Live.mp3', 1, 1, 70, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1742),
(73, 'Love They Haven\'t Thought Of Yet', 'Taylor Swift', 'Love They Haven\'t Thought Of Yet.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(74, 'Lucky You', 'Taylor Swift', 'Lucky You.mp3', 0, 1, 4, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 16),
(75, 'Mandolin', 'Taylor Swift', 'Mandolin.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(76, 'Mary\'s Song Oh My My My', 'Taylor Swift', 'Mary\'s Song Oh My My My.mp3', 1, 1, 147, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1941),
(77, 'Me And Britney', 'Taylor Swift', 'Me And Britney.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(78, 'Mean Live', 'Taylor Swift', 'Mean Live.mp3', 1, 1, 67, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1745),
(79, 'Mine', 'Taylor Swift', 'SpeakNow/Mine.mp3', 1, 1, 89, 'Speak Now', 1, 1, 'https://i.imgur.com/TNKbt8Y.jpg', 1829),
(80, 'My Cure', 'Taylor Swift', 'My Cure.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 4),
(81, 'My Turn To Be Me', 'Taylor Swift', 'My Turn To Be Me.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(82, 'Nashville', 'Taylor Swift', 'Nashville.mp3', 1, 1, 56, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1853),
(83, 'Need You Now', 'Taylor Swift', 'Need You Now.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 11),
(84, 'Never Mind', 'Taylor Swift', 'Never Mind.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 4),
(85, 'Oh My My My Demo', 'Taylor Swift', 'Oh My My My Demo.mp3', 1, 1, 64, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1597),
(86, 'One Thing Studio', 'Taylor Swift', 'One Thing Studio.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(87, 'One Thing', 'Taylor Swift', 'One Thing.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(88, 'Our Last Night', 'Taylor Swift', 'Our Last Night.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(89, 'Our Song ft. Def Leppard', 'Taylor Swift', 'Our Song ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 34),
(90, 'Our Song Pop Mix', 'Taylor Swift', 'Our Song Pop Mix.mp3', 1, 1, 58, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1748),
(91, 'Out Of The Woods Live', 'Taylor Swift', 'Out Of The Woods Live.mp3', 1, 1, 65, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1732),
(92, 'Out Of The Woods', 'Taylor Swift', '1989/Out Of The Woods.mp3', 1, 1, 79, '1989', 1, 4, 'https://i.imgur.com/i1QDoZR.jpg', 1818),
(93, 'Permanent Marker', 'Taylor Swift', 'Permanent Marker.mp3', 0, 1, 2, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 19),
(94, 'Picture To Burn ft. Def Leppard', 'Taylor Swift', 'Picture To Burn ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 23),
(95, 'Pour Some Sugar On Me ft. Def Leppard', 'Taylor Swift', 'Pour Some Sugar On Me ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 29),
(96, 'Rain Song', 'Taylor Swift', 'Rain Song.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(97, 'Red', 'Taylor Swift', 'Red/Red.mp3', 1, 1, 116, 'Red', 1, 2, 'http://i.imgur.com/as6dlgi.jpg', 1923),
(98, 'Sad Beautiful Tragic', 'Taylor Swift', 'Red/Sad Beautiful Tragic.mp3', 1, 1, 90, 'Red', 1, 12, 'http://i.imgur.com/as6dlgi.jpg', 1827),
(99, 'Same Girl', 'Taylor Swift', 'Same Girl.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(100, 'Shake It Off Acoustic', 'Taylor Swift', 'Shake It Off Acoustic.mp3', 1, 1, 69, '1989 Acoustic', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1736),
(101, 'Shake It Off', 'Taylor Swift', '1989/Shake It Off.mp3', 1, 1, 87, '1989', 1, 6, 'https://i.imgur.com/i1QDoZR.jpg', 1791),
(102, 'Should\'ve Said No US', 'Taylor Swift', 'Should\'ve Said No US.mp3', 1, 1, 52, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1771),
(103, 'Sparks Fly Original Lyrics', 'Taylor Swift', 'Sparks Fly Original Lyrics.mp3', 1, 1, 48, 'Speak Now', 0, 1, 'https://i.imgur.com/TNKbt8Y.jpg', 1817),
(104, 'Sparks Fly Live', 'Taylor Swift', 'Sparks Fly Live.mp3', 1, 1, 57, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1778),
(105, 'Starlight', 'Taylor Swift', 'Red/Starlight.mp3', 1, 1, 69, 'Red', 1, 15, 'http://i.imgur.com/as6dlgi.jpg', 1751),
(106, 'Stay Beautiful', 'Taylor Swift', 'Stay Beautiful.mp3', 1, 1, 65, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1754),
(107, 'Stay Stay Stay', 'Taylor Swift', 'Red/Stay Stay Stay.mp3', 1, 1, 87, 'Red', 1, 9, 'http://i.imgur.com/as6dlgi.jpg', 1755),
(108, 'Stupid Boy', 'Taylor Swift', 'Stupid Boy.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(109, 'Style Live', 'Taylor Swift', 'Style Live.mp3', 1, 1, 71, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1702),
(110, 'Teardrops On My Guitar ft. Def Leppard', 'Taylor Swift', 'Teardrops On My Guitar ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 27),
(111, 'Teardrops On My Guitar Pop', 'Taylor Swift', 'Teardrops On My Guitar Pop.mp3', 1, 1, 77, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1798),
(112, 'Tell Me Why', 'Taylor Swift', 'Tell Me Why.mp3', 1, 1, 59, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1775),
(113, 'Tell Me', 'Taylor Swift', 'Tell Me.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(114, 'Ten Dollars And A Six Pack', 'Taylor Swift', 'Ten Dollars And A Six Pack.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(115, 'The Last Time', 'Taylor Swift', 'Red/The Last Time.mp3', 1, 1, 77, 'Red', 1, 10, 'http://i.imgur.com/as6dlgi.jpg', 1793),
(116, 'The Outside', 'Taylor Swift', 'The Outside.mp3', 1, 1, 54, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1672),
(117, 'The Story Of Us Live', 'Taylor Swift', 'The Story Of Us Live.mp3', 1, 1, 122, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1934),
(118, 'The Way I Loved You', 'Taylor Swift', 'The Way I Loved You.mp3', 1, 1, 72, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1771),
(119, 'Tied Together With A Smile', 'Taylor Swift', 'Tied Together With A Smile.mp3', 1, 1, 80, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1795),
(120, 'Today Was a Fairytale', 'Taylor Swift', 'Today Was a Fairytale.mp3', 1, 1, 57, 'Valentine\'s Day', 0, 1, 'https://i.imgur.com/8pPGLAG.jpg', 1771),
(121, 'Treacherous', 'Taylor Swift', 'Red/Treacherous.mp3', 1, 1, 76, 'Red', 1, 3, 'http://i.imgur.com/as6dlgi.jpg', 1802),
(122, 'Umbrella', 'Taylor Swift', 'Umbrella.mp3', 1, 1, 71, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1734),
(123, 'We Are Never Ever Getting Back Together Live', 'Taylor Swift', 'We Are Never Ever Getting Back Together Live.mp3', 1, 1, 116, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1964),
(125, 'We Are Never Ever Getting Back Together Seine', 'Taylor Swift', 'We Are Never Ever Getting Back Together Seine.mp3', 1, 1, 121, 'Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1924),
(127, 'We Are Never Ever Getting Back Together', 'Taylor Swift', 'Red/We Are Never Ever Getting Back Together.mp3', 1, 1, 182, 'Red', 1, 8, 'http://i.imgur.com/as6dlgi.jpg', 2141),
(130, 'We Are Never Getting Back Together Live', 'Taylor Swift', 'We Are Never Getting Back Together Live.mp3', 1, 1, 128, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1956),
(132, 'What Do You Say', 'Taylor Swift', 'What Do You Say.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 9),
(133, 'When Daddy Let Me Drive', 'Taylor Swift', 'When Daddy Let Me Drive.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(134, 'When Love And Hate Collide ft. Def Leppard', 'Taylor Swift', 'When Love And Hate Collide ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 24),
(135, 'White Blank Page', 'Taylor Swift', 'White Blank Page.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(136, 'Wonderland', 'Taylor Swift', '1989/Wonderland.mp3', 1, 1, 98, '1989', 1, 14, 'https://i.imgur.com/i1QDoZR.jpg', 1784),
(137, 'You Belong With Me', 'Taylor Swift', 'You Belong With Me.mp3', 1, 1, 69, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1781),
(138, 'Your Anything', 'Taylor Swift', 'Your Anything.mp3', 0, 1, 3, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(139, 'Your Face Acoustic', 'Taylor Swift', 'Your Face Acoustic.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(140, 'Your Face', 'Taylor Swift', 'Your Face.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 6),
(141, 'Mean', 'Taylor Swift', 'SpeakNow/Mean.mp3', 1, 1, 99, 'Speak Now', 1, 6, 'https://i.imgur.com/TNKbt8Y.jpg', 1843),
(142, 'Haunted', 'Taylor Swift', 'SpeakNow/Haunted.mp3', 1, 1, 89, 'Speak Now', 1, 12, 'https://i.imgur.com/TNKbt8Y.jpg', 1811),
(143, 'Fearless Acoustic', 'Taylor Swift', 'Fearless Acoustic.mp3', 1, 1, 61, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1820),
(144, 'Come Back... Be Here', 'Taylor Swift', 'Red/Come Back... Be Here.mp3', 1, 1, 178, 'Red', 1, 18, 'http://i.imgur.com/as6dlgi.jpg', 1955),
(145, 'Honey Baby', 'Taylor Swift', 'Honey Baby.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(146, 'I Know Places', 'Taylor Swift', '1989/I Know Places.mp3', 1, 1, 73, '1989', 1, 12, 'https://i.imgur.com/i1QDoZR.jpg', 1788),
(147, 'Just South Of Knowing Why Drive All Night', 'Taylor Swift', 'Just South Of Knowing Why Drive All Night.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(148, 'I Heart Question Mark Demo', 'Taylor Swift', 'I Heart Question Mark Demo.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(149, 'Haunted Acoustic', 'Taylor Swift', 'Haunted Acoustic.mp3', 1, 1, 86, 'Speak Now Acoustic', 0, 1, 'https://i.imgur.com/TNKbt8Y.jpg', 1730),
(150, 'Jump Then Fall', 'Taylor Swift', 'Jump Then Fall.mp3', 1, 1, 69, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1688),
(151, 'Clean', 'Taylor Swift', '1989/Clean.mp3', 1, 1, 108, '1989', 1, 13, 'https://i.imgur.com/i1QDoZR.jpg', 1824),
(152, 'Dear John Live', 'Taylor Swift', 'Dear John Live.mp3', 1, 1, 68, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1775),
(153, 'I Heart', 'Taylor Swift', 'I Heart.mp3', 0, 1, 18, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 26),
(154, 'If This Was A Movie', 'Taylor Swift', 'SpeakNow/If This Was A Movie.mp3', 1, 1, 95, 'Speak Now', 1, 16, 'https://i.imgur.com/TNKbt8Y.jpg', 1734),
(155, 'American Boy', 'Taylor Swift', 'American Boy.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(156, 'Fearless Demo', 'Taylor Swift', 'Fearless Demo.mp3', 1, 1, 72, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1806),
(157, 'Matches', 'Taylor Swift', 'Matches.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 7),
(158, 'Love Story 2.0', 'Taylor Swift', 'Love Story 2.0.m4a', 1, 1, 70, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1730),
(159, 'Bad Blood Remix', 'Taylor Swift', 'Bad Blood Remix.mp3', 1, 1, 78, '1989', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1687),
(160, 'Bad Blood', 'Taylor Swift', '1989/Bad Blood.mp3', 1, 1, 74, '1989', 1, 8, 'https://i.imgur.com/i1QDoZR.jpg', 1764),
(161, 'I Wished On A Plane', 'Taylor Swift', 'I Wished On A Plane.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(162, 'Love To Lose', 'Taylor Swift', 'Love To Lose.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(163, 'Innocent', 'Taylor Swift', 'SpeakNow/Innocent.mp3', 1, 1, 68, 'Speak Now', 1, 11, 'https://i.imgur.com/TNKbt8Y.jpg', 1811),
(164, 'Dear John', 'Taylor Swift', 'SpeakNow/Dear John.mp3', 1, 1, 83, 'Speak Now', 1, 5, 'https://i.imgur.com/TNKbt8Y.jpg', 1795),
(165, 'Enchanted Live', 'Taylor Swift', 'Enchanted Live.mp3', 1, 1, 58, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1765),
(166, 'Breathe', 'Taylor Swift', 'Breathe.mp3', 1, 1, 65, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1810),
(167, 'All Night Diner', 'Taylor Swift', 'All Night Diner.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 20),
(168, 'Love ft. Def Leppard', 'Taylor Swift', 'Love ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 25),
(169, 'My Songs Know What You Did', 'Taylor Swift', 'My Songs Know What You Did.mp3', 1, 1, 59, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1778),
(170, 'Christmas Must Be Something More', 'Taylor Swift', 'Christmas Must Be Something More.mp3', 0, 1, 1, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 4),
(171, 'Better Than Revenge', 'Taylor Swift', 'SpeakNow/Better Than Revenge.mp3', 1, 1, 79, 'Speak Now', 1, 10, 'https://i.imgur.com/TNKbt8Y.jpg', 1738),
(172, 'Both Of Us', 'Taylor Swift', 'Both Of Us.mp3', 1, 1, 70, 'Strange Clouds - Feature', 0, 1, 'https://i.imgur.com/z5gPv3w.jpg', 1847),
(173, 'Our Last Night Acoustic', 'Taylor Swift', 'Our Last Night Acoustic.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(174, 'Out Of The Woods Grammys', 'Taylor Swift', 'Out Of The Woods Grammys.mp3', 1, 1, 85, 'Grammy Museum', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1729),
(175, 'Perfect Have I Loved Acoustic Demo', 'Taylor Swift', 'Perfect Have I Loved Acoustic Demo.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(176, 'Picture To Burn', 'Taylor Swift', 'Picture To Burn.mp3', 1, 1, 89, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1698),
(177, 'Point Of View', 'Taylor Swift', 'Point Of View.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(178, 'R-E-V-E-N-G-E', 'Taylor Swift', 'R-E-V-E-N-G-E.mp3', 0, 1, 8, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 23),
(179, 'Riptide', 'Taylor Swift', 'Riptide.mp3', 1, 1, 64, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1796),
(180, 'Ronan', 'Taylor Swift', 'Ronan.mp3', 0, 1, 18, 'Ronan', 0, 1, 'https://i.imgur.com/BPAffst.jpg', 39),
(181, 'Santa Baby', 'Taylor Swift', 'Santa Baby.mp3', 0, 1, 2, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 4),
(182, 'Shake It Off Live', 'Taylor Swift', 'Shake It Off Live.mp3', 1, 1, 60, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1738),
(183, 'Speak Now Live', 'Taylor Swift', 'Speak Now Live.mp3', 1, 1, 67, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1707),
(184, 'Speak Now', 'Taylor Swift', 'SpeakNow/Speak Now.mp3', 1, 1, 73, 'Speak Now', 1, 4, 'https://i.imgur.com/TNKbt8Y.jpg', 1810),
(185, 'State Of Grace', 'Taylor Swift', 'Red/State Of Grace.mp3', 1, 1, 95, 'Red', 1, 1, 'http://i.imgur.com/as6dlgi.jpg', 1770),
(186, 'Sugar', 'Taylor Swift', 'Sugar.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 4),
(187, 'Superman', 'Taylor Swift', 'SpeakNow/Superman.mp3', 1, 1, 67, 'Speak Now', 1, 17, 'https://i.imgur.com/TNKbt8Y.jpg', 1775),
(188, 'Superstar', 'Taylor Swift', 'Superstar.mp3', 1, 1, 64, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1709),
(189, 'Teardrops On My Guitar', 'Taylor Swift', 'Teardrops On My Guitar.mp3', 1, 1, 84, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1700),
(190, 'That\'s Life', 'Taylor Swift', 'That\'s Life.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(191, 'Thats When', 'Taylor Swift', 'Thats When.mp3', 0, 1, 11, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(192, 'The Best Day', 'Taylor Swift', 'The Best Day.mp3', 1, 1, 66, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1721),
(193, 'The Diary Of Me', 'Taylor Swift', 'The Diary Of Me.mp3', 0, 1, 3, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 11),
(194, 'The Moment I Knew', 'Taylor Swift', 'Red/The Moment I Knew.mp3', 1, 1, 70, 'Red', 1, 17, 'http://i.imgur.com/as6dlgi.jpg', 1672),
(195, 'The Story Of Us', 'Taylor Swift', 'SpeakNow/The Story Of Us.mp3', 1, 1, 162, 'Speak Now', 1, 7, 'https://i.imgur.com/TNKbt8Y.jpg', 2056),
(196, 'Thirteen Blocks', 'Taylor Swift', 'Thirteen Blocks.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(197, 'This Is Really Happening', 'Taylor Swift', 'This Is Really Happening.mp3', 0, 1, 4, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 6),
(198, 'This Love Live', 'Taylor Swift', 'This Love Live.mp3', 1, 1, 63, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1714),
(199, 'Till Brad Pitt Comes Along', 'Taylor Swift', 'Till Brad Pitt Comes Along.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 9),
(200, 'Tim McGraw Acoustic', 'Taylor Swift', 'Tim McGraw Acoustic.mp3', 1, 1, 58, 'Taylor Swift Acoustic', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1765),
(201, 'Tim Mcgraw', 'Taylor Swift', 'Tim Mcgraw.mp3', 1, 1, 89, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1790),
(202, 'Untouchable', 'Taylor Swift', 'Untouchable.mp3', 1, 1, 63, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1714),
(203, 'Wait For Me', 'Taylor Swift', 'Wait For Me.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(204, 'We Were Happy', 'Taylor Swift', 'We Were Happy.mp3', 0, 1, 6, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(205, 'Welcome Distraction', 'Taylor Swift', 'Welcome Distraction.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(206, 'Welcome To New York', 'Taylor Swift', '1989/Welcome To New York.mp3', 1, 1, 121, '1989', 1, 1, 'https://i.imgur.com/i1QDoZR.jpg', 2026),
(207, 'What To Wear', 'Taylor Swift', 'What To Wear.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(208, 'Who I\'ve Always Been', 'Taylor Swift', 'Who I\'ve Always Been.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(209, 'Wildest Dreams Acoustic', 'Taylor Swift', 'Wildest Dreams Acoustic.mp3', 1, 1, 81, '1989 Acoustic', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1694),
(212, 'Enchanted/Wildest Dreams Live', 'Taylor Swift', 'Wildest Dreams Enchanted Live.mp3', 1, 1, 250, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 2239),
(213, 'Wildest Dreams', 'Taylor Swift', '1989/Wildest Dreams.mp3', 1, 1, 120, '1989', 1, 9, 'https://i.imgur.com/i1QDoZR.jpg', 1842),
(214, 'You Do', 'Taylor Swift', 'You Do.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(215, 'You Don\'t Have To Call Me', 'Taylor Swift', 'You Don\'t Have To Call Me.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(216, 'You\'re Not Sorry', 'Taylor Swift', 'You\'re Not Sorry.mp3', 1, 1, 59, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1788),
(217, 'Gracie Acoustic', 'Taylor Swift', 'Gracie Acoustic.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(218, 'Can I Go With You', 'Taylor Swift', 'Can I Go With You.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(219, 'We Are Coming Undone', 'Taylor Swift', 'We Are Coming Undone.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(220, 'Look At You Like That', 'Taylor Swift', 'Look At You Like That.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(221, 'Thinking About You', 'Taylor Swift', 'Thinking About You.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(222, 'Love Story', 'Taylor Swift', 'Love Story.mp3', 1, 1, 91, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1727),
(223, 'Red Demo', 'Taylor Swift', 'Red/Red Demo.mp3', 1, 1, 54, 'Red', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1821),
(224, 'Bette Davis Eyes Live', 'Taylor Swift', 'Bette Davis Eyes Live.mp3', 1, 1, 59, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1738),
(225, 'Ours', 'Taylor Swift', 'SpeakNow/Ours.mp3', 1, 1, 96, 'Speak Now', 1, 15, 'https://i.imgur.com/TNKbt8Y.jpg', 1750),
(226, 'Back To December Apologize Live', 'Taylor Swift', 'Back To December Apologize Live.mp3', 1, 1, 70, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1686),
(227, 'Hey Stephen', 'Taylor Swift', 'Hey Stephen.mp3', 1, 1, 77, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1792),
(228, 'I Know Places Live', 'Taylor Swift', 'I Know Places Live.mp3', 1, 1, 69, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1714),
(229, 'Last Kiss', 'Taylor Swift', 'SpeakNow/Last Kiss.mp3', 1, 1, 98, 'Speak Now', 1, 13, 'https://i.imgur.com/TNKbt8Y.jpg', 1834),
(230, 'Love Story ft. Def Leppard', 'Taylor Swift', 'Love Story ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 39),
(231, 'Just a Dream', 'Taylor Swift', 'Just a Dream.m4a', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 5),
(232, 'I Almost Do', 'Taylor Swift', 'Red/I Almost Do.mp3', 1, 1, 84, 'Red', 1, 7, 'http://i.imgur.com/as6dlgi.jpg', 1744),
(233, 'Baby Don\'t You Break My Heart Slow', 'Taylor Swift', 'Baby Don\'t You Break My Heart Slow.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(234, 'White Christmas', 'Taylor Swift', 'White Christmas.mp3', 0, 1, 0, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 3),
(235, 'Spinning Around', 'Taylor Swift', 'Spinning Around.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(236, 'Sweeter Than Fiction', 'Taylor Swift', 'Sweeter Than Fiction.mp3', 1, 1, 69, 'One Chance Soundtrack', 0, 1, 'https://i.imgur.com/zh7m1cn.jpg', 1762),
(237, 'Christmases When You Were Mine', 'Taylor Swift', 'Christmases When You Were Mine.mp3', 0, 1, 0, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 7),
(238, 'Smokey Black Nights', 'Taylor Swift', 'Smokey Black Nights.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 3),
(239, 'Thug Story', 'Taylor Swift', 'Thug Story.mp3', 1, 1, 88, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1899),
(240, 'Enchanted Wildest Dreams Tokyo', 'Taylor Swift', 'Enchanted Wildest Dreams Tokyo.mp3', 0, 1, 0, '1989 World Tour Tokyo', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 784),
(241, 'Welcome To New York Live', 'Taylor Swift', 'Welcome To New York Live.mp3', 1, 1, 120, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1912),
(242, 'Cold As You', 'Taylor Swift', 'Cold As You.mp3', 1, 1, 77, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1797),
(243, 'Two Is Better Than One', 'Taylor Swift', 'Two Is Better Than One.mp3', 1, 1, 64, 'Boys Like Girls - Feature', 0, 1, 'http://i.imgur.com/x0K7vjd.jpg', 1639),
(244, 'Should\'ve Said No', 'Taylor Swift', 'Should\'ve Said No.mp3', 1, 1, 73, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1717),
(245, 'Enchanted', 'Taylor Swift', 'SpeakNow/Enchanted.mp3', 1, 1, 107, 'Speak Now', 1, 9, 'https://i.imgur.com/TNKbt8Y.jpg', 1787),
(246, 'Forever & Always', 'Taylor Swift', 'Forever & Always.mp3', 1, 1, 76, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1725),
(247, 'Crazier', 'Taylor Swift', 'Crazier.mp3', 1, 1, 64, 'Crazier Soundtrack', 0, 1, 'https://i.imgur.com/FEdhdtz.jpg', 1748),
(248, 'Bad Blood Live', 'Taylor Swift', 'Bad Blood Live.mp3', 1, 1, 73, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1671),
(249, 'Treacherous Demo', 'Taylor Swift', 'Red/Treacherous Demo.mp3', 1, 1, 79, 'Red', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1688),
(250, 'Never Grow Up', 'Taylor Swift', 'SpeakNow/Never Grow Up.mp3', 1, 1, 70, 'Speak Now', 1, 8, 'https://i.imgur.com/TNKbt8Y.jpg', 1790),
(251, 'I\'m Every Woman', 'Taylor Swift', 'I\'m Every Woman.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 2),
(252, 'Silent Night', 'Taylor Swift', 'Silent Night.mp3', 0, 1, 0, 'Sounds of the Season', 0, 1, 'https://i.imgur.com/Gov7vXz.jpg', 6),
(253, 'New Romantics Live', 'Taylor Swift', 'New Romantics Live.mp3', 1, 1, 68, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1728),
(254, 'Mine Pop Mix', 'Taylor Swift', 'Mine Pop Mix.mp3', 1, 1, 59, 'Speak Now', 0, 1, 'https://i.imgur.com/TNKbt8Y.jpg', 1728),
(255, 'How You Get The Girl Live', 'Taylor Swift', 'How You Get The Girl Live.mp3', 1, 1, 85, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1751),
(256, 'Our Song', 'Taylor Swift', 'Our Song.mp3', 1, 1, 71, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1715),
(257, 'I\'m Only Me When I\'m With You', 'Taylor Swift', 'I\'m Only Me When I\'m With You.mp3', 1, 1, 87, 'Taylor Swift', 0, 1, 'https://i.imgur.com/w0bksSN.jpg', 1733),
(258, 'The Other Side Of The Door', 'Taylor Swift', 'The Other Side Of The Door.mp3', 1, 1, 72, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1721),
(259, 'Fifteen', 'Taylor Swift', 'Fifteen.mp3', 1, 1, 71, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1787),
(260, 'Girl At Home', 'Taylor Swift', 'Red/Girl At Home.mp3', 1, 1, 69, 'Red', 1, 19, 'http://i.imgur.com/as6dlgi.jpg', 1808),
(261, 'State Of Grace Acoustic', 'Taylor Swift', 'Red/State Of Grace Acoustic.mp3', 1, 1, 60, 'Red Acoustic', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1717),
(262, 'Under My Head', 'Taylor Swift', 'Under My Head.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 0),
(263, 'Two Steps Behind ft. Def Leppard', 'Taylor Swift', 'Two Steps Behind ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 30),
(264, 'I Knew You Were Trouble Live', 'Taylor Swift', 'I Knew You Were Trouble Live.mp3', 1, 1, 169, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 2204),
(267, 'Photograph ft. Def Leppard', 'Taylor Swift', 'Photograph ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 32),
(268, 'Run ft. Def Leppard', 'Taylor Swift', 'Run ft. Def Leppard.mp3', 0, 1, 0, 'Def Leppard', 0, 1, 'https://i.imgur.com/Xmmt4tY.jpg', 39),
(269, 'Sparks Fly', 'Taylor Swift', 'SpeakNow/Sparks Fly.mp3', 1, 1, 93, 'Speak Now', 1, 2, 'https://i.imgur.com/TNKbt8Y.jpg', 1764),
(270, 'Better Than Revenge Live', 'Taylor Swift', 'Better Than Revenge Live.mp3', 1, 1, 62, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1730),
(271, 'Dark Blue Tennessee', 'Taylor Swift', 'Dark Blue Tennessee.mp3', 0, 1, 5, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 28),
(272, 'I Used To Fly', 'Taylor Swift', 'I Used To Fly.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(273, 'The Lucky One', 'Taylor Swift', 'Red/The Lucky One.mp3', 1, 1, 73, 'Red', 1, 13, 'http://i.imgur.com/as6dlgi.jpg', 1707),
(274, 'White Horse', 'Taylor Swift', 'White Horse.mp3', 1, 1, 68, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 1819),
(275, 'Never Mind Country', 'Taylor Swift', 'Never Mind Country.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(276, 'All You Had To Do Was Stay Live', 'Taylor Swift', 'All You Had To Do Was Stay Live.mp3', 1, 1, 63, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1630),
(277, 'I Wish You Would Live', 'Taylor Swift', 'I Wish You Would Live.mp3', 1, 1, 59, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1669),
(278, 'Ours Live', 'Taylor Swift', 'Ours Live.mp3', 1, 1, 76, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1764),
(279, 'Blank Space Live', 'Taylor Swift', 'Blank Space Live.mp3', 1, 1, 69, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1745),
(280, 'Long Live', 'Taylor Swift', 'SpeakNow/Long Live.mp3', 1, 1, 91, 'Speak Now', 1, 14, 'https://i.imgur.com/TNKbt8Y.jpg', 1787),
(281, 'Wildest Dreams R3hab', 'Taylor Swift', 'Wildest Dreams R3hab.mp3', 1, 1, 64, '1989', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1758),
(282, 'Writing Songs About You', 'Taylor Swift', 'Writing Songs About You.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 6),
(283, 'You Are In Love Live', 'Taylor Swift', 'You Are In Love Live.mp3', 1, 1, 71, '1989 World Tour', 0, 1, 'https://i.imgur.com/cVP4obR.jpg', 1742),
(284, 'You Are In Love', 'Taylor Swift', '1989/You Are In Love.mp3', 1, 1, 69, '1989', 1, 15, 'https://i.imgur.com/i1QDoZR.jpg', 1793),
(292, 'Treacherous Acoustic Live', 'Taylor Swift', 'Treacherous Acoustic Live.m4a', 1, 1, 55, 'Red Acoustic', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1754),
(293, 'You All Over Me', 'Taylor Swift', 'You All Over Me.mp3', 0, 1, 18, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.png', 14),
(295, 'Out Of The Woods Grammy Awards', 'Taylor Swift', 'Out of the Woods Grammy Awards.mp3', 1, 1, 62, 'Grammy Awards', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1782),
(296, 'Fearless I\'m Yours Hey Soul Sister Live', 'Taylor Swift', 'Fearless I\'m Yours Hey Soul Sister Live.mp3', 1, 1, 134, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1843),
(298, 'Down Came The Rain', 'Taylor Swift', 'Down Came The Rain.mp3', 0, 1, 0, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 1),
(299, 'Fifteen Live', 'Taylor Swift', 'Fifteen Live.mp3', 1, 1, 74, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1652),
(300, 'Love Story SN Live', 'Taylor Swift', 'Love Story SN Live.mp3', 1, 1, 74, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1718),
(301, 'Mine Live', 'Taylor Swift', 'Mine Live.m4a', 1, 1, 65, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1765),
(302, 'Our Song Live', 'Taylor Swift', 'Our Song Live.mp3', 1, 1, 66, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1733),
(303, 'Sweet Escape Live', 'Taylor Swift', 'Sweet Escape Live.mp3', 1, 1, 62, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1726),
(304, 'You Belong With Me Live', 'Taylor Swift', 'You Belong With Me Live.mp3', 1, 1, 63, 'Speak Now World Tour', 0, 1, 'https://i.imgur.com/bywo8nm.jpg', 1660),
(305, 'New Romantics SS Live', 'Taylor Swift', 'New Romantics SS Live.mp3', 1, 1, 54, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1681),
(307, 'Blank Space SS Live', 'Taylor Swift', 'Blank Space SS Live.mp3', 1, 1, 56, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1723),
(308, 'I Knew You Were Trouble SS Live', 'Taylor Swift', 'I Knew You Were Trouble SS Live.mp3', 1, 1, 134, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1894),
(309, 'I Don\'t Wanna Live Forever SS Live', 'Taylor Swift', 'I Don\'t Wanna Live Forever SS Live.mp3', 1, 1, 128, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1878),
(311, 'You Belong With Me SS Live', 'Taylor Swift', 'You Belong With Me SS Live.mp3', 1, 1, 132, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1886),
(313, 'RED SS Live', 'Taylor Swift', 'RED SS Live.mp3', 1, 1, 49, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1668),
(314, 'All Too Well SS Live', 'Taylor Swift', 'All Too Well SS Live.mp3', 1, 1, 73, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1711),
(315, 'Shake It Off SS Live', 'Taylor Swift', 'Shake It Off SS Live.mp3', 1, 1, 105, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1821),
(318, 'Out Of The Woods SS Live', 'Taylor Swift', 'Out Of The Woods SS Live.mp3', 1, 1, 128, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1775),
(319, 'Bad Blood SS Live', 'Taylor Swift', 'Bad Blood SS Live.mp3', 1, 1, 56, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1599),
(320, 'Look What You Made Me Do', 'Taylor Swift', 'reputation/Look What You Made Me Do.m4a', 1, 1, 150, 'reputation', 1, 6, 'https://i.imgur.com/o2v3b7E.jpg', 1660),
(322, 'Ready For It', 'Taylor Swift', 'reputation/Ready For It.m4a', 1, 1, 96, 'reputation', 1, 1, 'https://i.imgur.com/o2v3b7E.jpg', 1482),
(323, 'How You Get The Girl Grammys', 'Taylor Swift', 'How You Get The Girl Grammys.m4a', 1, 1, 75, 'Grammy Museum', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 1414),
(325, 'Gorgeous', 'Taylor Swift', 'reputation/Gorgeous.m4a', 1, 1, 90, 'reputation', 1, 8, 'https://i.imgur.com/o2v3b7E.jpg', 1401),
(327, 'Call It What You Want', 'Taylor Swift', 'reputation/Call It What You Want.mp3', 1, 1, 158, 'reputation', 1, 14, 'https://i.imgur.com/o2v3b7E.jpg', 1604),
(330, 'End Game', 'Taylor Swift', 'reputation/End Game.mp3', 1, 1, 98, 'reputation', 1, 2, 'https://i.imgur.com/o2v3b7E.jpg', 1353),
(331, 'I Did Something Bad', 'Taylor Swift', 'reputation/I Did Something Bad.mp3', 1, 1, 84, 'reputation', 1, 3, 'https://i.imgur.com/o2v3b7E.jpg', 1337),
(332, 'Don\'t Blame Me', 'Taylor Swift', 'reputation/Don\'t Blame Me.mp3', 1, 1, 112, 'reputation', 1, 4, 'https://i.imgur.com/o2v3b7E.jpg', 1405),
(333, 'Delicate', 'Taylor Swift', 'reputation/Delicate.mp3', 1, 1, 88, 'reputation', 1, 5, 'https://i.imgur.com/o2v3b7E.jpg', 1451),
(334, 'So It Goes', 'Taylor Swift', 'reputation/So It Goes.mp3', 1, 1, 86, 'reputation', 1, 7, 'https://i.imgur.com/o2v3b7E.jpg', 1322),
(335, 'Getaway Car', 'Taylor Swift', 'reputation/Getaway Car.mp3', 1, 1, 103, 'reputation', 1, 9, 'https://i.imgur.com/o2v3b7E.jpg', 1454),
(336, 'King Of My Heart', 'Taylor Swift', 'reputation/King Of My Heart.mp3', 1, 1, 100, 'reputation', 1, 10, 'https://i.imgur.com/o2v3b7E.jpg', 1336),
(337, 'Dancing With Our Hands Tied', 'Taylor Swift', 'reputation/Dancing With Our Hands Tied.mp3', 1, 1, 82, 'reputation', 1, 11, 'https://i.imgur.com/o2v3b7E.jpg', 1304),
(338, 'Dress', 'Taylor Swift', 'reputation/Dress.mp3', 1, 1, 102, 'reputation', 1, 12, 'https://i.imgur.com/o2v3b7E.jpg', 1342),
(339, 'This Is Why We Can\'t Have Nice Things', 'Taylor Swift', 'reputation/This Is Why We Can\'t Have Nice Things.mp3', 1, 1, 87, 'reputation', 1, 13, 'https://i.imgur.com/o2v3b7E.jpg', 1316),
(340, 'New Years Day', 'Taylor Swift', 'reputation/New Years Day.mp3', 1, 1, 87, 'reputation', 1, 15, 'https://i.imgur.com/o2v3b7E.jpg', 1331),
(341, 'New Years Day Piano', 'Taylor Swift', 'New Years Day Piano.mp3', 1, 1, 59, 'reputation', 0, 1, 'https://i.imgur.com/o2v3b7E.jpg', 1347),
(343, 'Better Man SS Live', 'Taylor Swift', 'Better Man SS Live.mp3', 1, 1, 68, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1247),
(344, 'This Is What You Came For SS Live', 'Taylor Swift', 'This Is What You Came For SS Live.mp3', 1, 1, 134, 'Super Saturday Night', 0, 1, 'http://i.imgur.com/ZyxiSQe.jpg', 1407),
(346, 'Run George Strait', 'Taylor Swift', 'Run George Strait.m4a', 1, 1, 53, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 998),
(348, '22 Seine', 'Taylor Swift', '22 Seine.mp3', 1, 1, 64, 'Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1044),
(349, 'I Knew You Were Trouble Seine', 'Taylor Swift', 'I Knew You Were Trouble Seine.mp3', 1, 1, 128, 'Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1157),
(350, 'Love Story Seine', 'Taylor Swift', 'Love Story Seine.mp3', 1, 1, 59, 'Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1070),
(351, 'Red Seine', 'Taylor Swift', 'Red Seine.mp3', 1, 1, 55, 'Red - Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1057),
(352, 'You Belong With Me Seine', 'Taylor Swift', 'You Belong With Me Seine.mp3', 1, 1, 70, 'Live on the Seine', 0, 1, 'http://i.imgur.com/fv5H8w8.jpg', 1032),
(354, 'Delicate Remix', 'Taylor Swift', 'Delicate Remix.m4a', 1, 1, 67, 'reputation', 0, 1, 'https://i.imgur.com/erPJidF.jpg', 997),
(355, 'Ready for It BloodPop', 'Taylor Swift', 'Ready for It BloodPop.mp3', 1, 1, 68, 'reputation', 0, 1, 'https://i.imgur.com/xjWOsyQ.jpg', 1018),
(356, 'Delicate Acoustic Spotify', 'Taylor Swift', 'Delicate Acoustic Spotify.mp3', 1, 1, 70, 'reputation', 0, 1, 'https://i.imgur.com/xjWOsyQ.jpg', 998),
(357, 'September Acoustic Spotify', 'Taylor Swift', 'September Acoustic Spotify.mp3', 1, 1, 62, 'Covers', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1034),
(358, 'New Years Day Piano SXM', 'Taylor Swift', 'New Years Day Piano SXM.mp3', 1, 1, 65, 'reputation Celebration', 0, 1, 'https://i.imgur.com/o2v3b7E.jpg', 1000),
(359, 'Call It What You Want Acoustic SXM', 'Taylor Swift', 'Call It What You Want Acoustic SXM.mp3', 1, 1, 64, 'reputation Celebration', 0, 1, 'https://i.imgur.com/o2v3b7E.jpg', 1066),
(360, 'American Girl Piano SXM', 'Taylor Swift', 'American Girl Piano SXM.mp3', 1, 1, 60, 'reputation Celebration', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 1004),
(361, 'We Are Never Ever Getting Back Together Country Mix', 'Taylor Swift', 'Red/We Are Never Ever Getting Back Together Country Mix.mp3', 1, 1, 124, 'Red', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 1162),
(363, 'Delicate Seeb Remix', 'Taylor Swift', 'Delicate Seeb Remix.mp3', 1, 1, 117, 'reputation', 0, 1, 'https://i.imgur.com/erPJidF.jpg', 1127),
(365, 'Let\'s Go', 'Taylor Swift', 'Let\'s Go.mp3', 0, 1, 7, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 51),
(366, 'Ready For It rep Live', 'Taylor Swift', 'Ready For It rep Live.m4a', 1, 1, 124, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 765),
(368, 'All Too Well rep Live', 'Taylor Swift', 'All Too Well rep Live.m4a', 1, 1, 134, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 757),
(370, 'Bad Blood Should\'ve Said No rep Live', 'Taylor Swift', 'Bad Blood Should\'ve Said No rep Live.m4a', 1, 1, 59, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 641),
(371, 'Blank Space rep Live', 'Taylor Swift', 'Blank Space rep Live.m4a', 1, 1, 64, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 572),
(372, 'Call It What You Want rep Live', 'Taylor Swift', 'Call It What You Want rep Live.m4a', 1, 1, 129, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 832),
(374, 'Dancing With Our Hands Tied rep Live', 'Taylor Swift', 'Dancing With Our Hands Tied rep Live.m4a', 1, 1, 129, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 816),
(376, 'Delicate rep Live', 'Taylor Swift', 'Delicate rep Live.m4a', 1, 1, 59, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 554),
(377, 'Don\'t Blame Me rep Live', 'Taylor Swift', 'Don\'t Blame Me rep Live.m4a', 1, 1, 98, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 558),
(378, 'Dress rep Live', 'Taylor Swift', 'Dress rep Live.m4a', 1, 1, 56, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 584),
(379, 'End Game rep Live', 'Taylor Swift', 'End Game rep Live.m4a', 1, 1, 62, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 576),
(380, 'Getaway Car rep Live', 'Taylor Swift', 'Getaway Car rep Live.m4a', 1, 1, 75, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 609),
(381, 'Gorgeous rep Live', 'Taylor Swift', 'Gorgeous rep Live.m4a', 1, 1, 68, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 610),
(382, 'I Did Something Bad rep Live', 'Taylor Swift', 'I Did Something Bad rep Live.m4a', 1, 1, 149, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 824),
(384, 'King of My Heart rep Live', 'Taylor Swift', 'King of My Heart rep Live.m4a', 1, 1, 145, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 741),
(386, 'Long Live New Year\'s Day rep Live', 'Taylor Swift', 'Long Live New Year\'s Day rep Live.m4a', 1, 1, 127, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 776),
(388, 'Look What You Made Me Do Intro rep Live', 'Taylor Swift', 'Look What You Made Me Do Intro rep Live.m4a', 1, 1, 127, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 739),
(390, 'Look What You Made Me Do rep Live', 'Taylor Swift', 'Look What You Made Me Do rep Live.m4a', 1, 1, 130, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 830),
(392, 'reputation Intro rep Live', 'Taylor Swift', 'reputation Intro rep Live.m4a', 1, 1, 74, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 571),
(393, 'Shake It Off rep Live', 'Taylor Swift', 'Shake It Off rep Live.m4a', 1, 1, 70, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 592),
(394, 'So It Goes rep Live', 'Taylor Swift', 'So It Goes rep Live.m4a', 1, 1, 75, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 606),
(395, 'Style Love Story You Belong With Me rep Live', 'Taylor Swift', 'Style Love Story You Belong With Me rep Live.m4a', 1, 1, 68, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 589),
(396, 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live', 'Taylor Swift', 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live.m4a', 1, 1, 123, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 800),
(398, 'Why She Disappeared rep Live', 'Taylor Swift', 'Why She Disappeared rep Live.m4a', 1, 1, 84, 'reputation Stadium Tour', 0, 1, 'https://i.imgur.com/D3RHbx6.jpg', 607);
INSERT INTO `song_detail` (`id`, `official_name`, `artist_name`, `path`, `autoplay`, `can_queue`, `play_count`, `album`, `is_album`, `track_number`, `album_art_url`, `old_play_count`) VALUES
(399, 'Holy Ground F1 Live', 'Taylor Swift', 'Holy Ground F1 Live.mp3', 1, 1, 68, 'COTA Formula 1 Austin', 0, 1, 'https://i.imgur.com/9rBYl44.jpg', 568),
(400, 'ME!', 'Taylor Swift', 'ME!.m4a', 1, 1, 105, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 621),
(401, 'You Need To Calm Down', 'Taylor Swift', 'You Need To Calm Down.m4a', 1, 1, 70, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 518),
(402, 'The Archer', 'Taylor Swift', 'The Archer.m4a', 1, 1, 76, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 468),
(403, 'Lover', 'Taylor Swift', 'Lover.m4a', 1, 1, 95, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 414),
(404, 'I Forgot That You Existed', 'Taylor Swift', 'I Forgot That You Existed.m4a', 1, 1, 82, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 372),
(405, 'Cruel Summer', 'Taylor Swift', 'Cruel Summer.m4a', 1, 1, 109, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 426),
(406, 'The Man', 'Taylor Swift', 'The Man.m4a', 1, 1, 75, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 357),
(407, 'I Think He Knows', 'Taylor Swift', 'I Think He Knows.m4a', 1, 1, 82, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 384),
(408, 'Miss Americana & The Heartbreak Prince', 'Taylor Swift', 'Miss Americana & The Heartbreak Prince.m4a', 1, 1, 86, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 368),
(409, 'Paper Rings', 'Taylor Swift', 'Paper Rings.m4a', 1, 1, 90, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 389),
(410, 'Cornelia Street', 'Taylor Swift', 'Cornelia Street.m4a', 1, 1, 87, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 407),
(411, 'Death By A Thousand Cuts', 'Taylor Swift', 'Death By A Thousand Cuts.m4a', 1, 1, 96, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 364),
(412, 'London Boy', 'Taylor Swift', 'London Boy.m4a', 1, 1, 89, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 401),
(413, 'Soon You\'ll Get Better', 'Taylor Swift', 'Soon You\'ll Get Better.m4a', 1, 1, 77, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 333),
(414, 'False God', 'Taylor Swift', 'False God.m4a', 1, 1, 72, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 386),
(415, 'Afterglow', 'Taylor Swift', 'Afterglow.m4a', 1, 1, 88, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 449),
(416, 'It\'s Nice To Have A Friend', 'Taylor Swift', 'It\'s Nice To Have A Friend.m4a', 1, 1, 79, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 416),
(417, 'Daylight', 'Taylor Swift', 'Daylight.m4a', 1, 1, 79, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 371),
(418, 'The Archer SXM Live', 'Taylor Swift', 'The Archer Acoustic SXM Live.mp3', 1, 1, 70, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 367),
(419, 'You Need To Calm Down SXM Live', 'Taylor Swift', 'You Need To Calm Down Acoustic SXM Live.mp3', 1, 1, 74, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 338),
(420, 'Daylight SXM Live', 'Taylor Swift', 'Daylight Piano SXM Live.mp3', 1, 1, 64, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 353),
(421, 'Beautiful Ghosts', 'Taylor Swift', 'Beautiful Ghosts.m4a', 1, 1, 57, 'Cats Soundtrack', 0, 1, 'https://m.media-amazon.com/images/I/611hhvdmJEL._SS500_.jpg', 237),
(422, 'Babe', 'Taylor Swift', 'Babe.mp3', 1, 1, 71, 'Bigger - Feature', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fd/Sugarland_Babe.png', 261),
(423, 'Christmas Tree Farm', 'Taylor Swift', 'Christmas Tree Farm.mp3', 1, 1, 89, 'Christmas Tree Farm', 0, 1, 'https://i.imgur.com/Mf8wn2Q.jpg', 272),
(439, 'Only The Young', 'Taylor Swift', 'Only The Young.m4a', 1, 1, 74, 'Only The Young', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/6/69/Taylor_Swift_-_Only_the_Young.png', 169),
(440, 'False God SNL Live', 'Taylor Swift', 'False God SNL Live.mp3', 1, 1, 56, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 161),
(441, 'Lover SNL Live', 'Taylor Swift', 'Lover SNL Live.mp3', 1, 1, 56, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 172),
(442, 'The Man AMA Live', 'Taylor Swift', 'The Man AMA Live.mp3', 1, 1, 70, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 181),
(443, 'Lover AMA Live', 'Taylor Swift', 'Lover AMA Live.mp3', 1, 1, 62, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 160),
(444, 'Love Story AMA Live', 'Taylor Swift', 'Love Story AMA Live.mp3', 1, 1, 59, 'Fearless', 0, 1, 'https://i.imgur.com/TPL7mge.jpg', 178),
(445, 'I Knew You Were Trouble AMA Live', 'Taylor Swift', 'I Knew You Were Trouble AMA Live.mp3', 1, 1, 56, 'Red - AMA', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 162),
(446, 'Blank Space Shake It Off AMA Live', 'Taylor Swift', 'Blank Space Shake It Off AMA Live.mp3', 1, 1, 76, '1989', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 180),
(447, 'Can\'t Stop Loving You BBC Live', 'Taylor Swift', 'Can\'t Stop Loving You BBC Live.mp3', 1, 1, 60, 'Cover', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 172),
(448, 'London Boy BBC Live', 'Taylor Swift', 'London Boy BBC Live.mp3', 1, 1, 51, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 154),
(449, 'Lover BBC Live', 'Taylor Swift', 'Lover BBC Live.mp3', 1, 1, 65, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 185),
(450, 'The Archer BBC Live', 'Taylor Swift', 'The Archer BBC Live.mp3', 1, 1, 74, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 162),
(451, 'You Need To Calm Down BBC Live', 'Taylor Swift', 'You Need To Calm Down BBC Live.mp3', 1, 1, 63, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 181),
(452, 'Holy Ground BBC Live', 'Taylor Swift', 'Holy Ground BBC Live.mp3', 1, 1, 73, 'Red - BBC', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 162),
(453, 'The Man NPR Live', 'Taylor Swift', 'The Man NPR Live.mp3', 1, 1, 50, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 157),
(454, 'Lover NPR Live', 'Taylor Swift', 'Lover NPR Live.mp3', 1, 1, 76, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 156),
(455, 'Death by a Thousand Cuts NPR Live', 'Taylor Swift', 'Death by a Thousand Cuts NPR Live.mp3', 1, 1, 74, 'Lover', 0, 1, 'https://i.imgur.com/cNnUR0M.jpg', 193),
(456, 'All Too Well NPR Live', 'Taylor Swift', 'All Too Well NPR Live.mp3', 1, 1, 68, 'Red - NPR', 0, 1, 'http://i.imgur.com/as6dlgi.jpg', 168),
(457, 'Green Light', 'Lorde', '/melo/Green Light.mp3', 0, 1, 11, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 10),
(458, 'Sober', 'Lorde', '/melo/Sober.mp3', 0, 1, 5, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 7),
(459, 'Homemade Dynamite', 'Lorde', '/melo/Homemade Dynamite.mp3', 0, 1, 7, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 4),
(460, 'The Louvre', 'Lorde', '/melo/The Louvre.mp3', 0, 1, 5, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 8),
(461, 'Liability', 'Lorde', '/melo/Liability.mp3', 0, 1, 3, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 9),
(462, 'Hard Feelings-Loveless', 'Lorde', '/melo/Hard Feelings-Loveless.mp3', 0, 1, 5, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 8),
(463, 'Sober II', 'Lorde', '/melo/Sober II (Melodrama).mp3', 0, 1, 10, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 5),
(464, 'Writer In the Dark', 'Lorde', '/melo/Writer In the Dark.mp3', 0, 1, 1, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 5),
(465, 'Supercut', 'Lorde', '/melo/Supercut.mp3', 0, 1, 7, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 4),
(466, 'Liability (Reprise)', 'Lorde', '/melo/Liability (Reprise).mp3', 0, 1, 2, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 5),
(467, 'Perfect Places', 'Lorde', '/melo/Perfect Places.mp3', 0, 1, 11, 'Lorde: Melodrama', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png', 10),
(488, 'Moonlight', 'Ariana Grande', '/DangerousWoman/Moonlight.mp3', 0, 1, 3, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 5),
(489, 'Dangerous Woman', 'Ariana Grande', '/DangerousWoman/Dangerous Woman.mp3', 0, 1, 4, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 9),
(490, 'Be Alright', 'Ariana Grande', '/DangerousWoman/Be Alright.mp3', 0, 1, 2, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 2),
(491, 'Into You', 'Ariana Grande', '/DangerousWoman/Into You.mp3', 0, 1, 4, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 9),
(492, 'Side To Side', 'Ariana Grande', '/DangerousWoman/Side To Side.mp3', 0, 1, 2, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 9),
(493, 'Let Me Love You', 'Ariana Grande', '/DangerousWoman/Let Me Love You.mp3', 0, 1, 0, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 1),
(494, 'Greedy', 'Ariana Grande', '/DangerousWoman/Greedy.mp3', 0, 1, 6, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 14),
(495, 'Leave Me Lonely', 'Ariana Grande', '/DangerousWoman/Leave Me Lonely.mp3', 0, 1, 1, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 1),
(496, 'Everyday', 'Ariana Grande', '/DangerousWoman/Everyday.mp3', 0, 1, 2, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 2),
(497, 'Sometimes', 'Ariana Grande', '/DangerousWoman/Sometimes.mp3', 0, 1, 3, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 3),
(498, 'I Don\'t Care', 'Ariana Grande', '/DangerousWoman/I Don\'t Care.mp3', 0, 1, 0, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 1),
(499, 'Bad Decisions', 'Ariana Grande', '/DangerousWoman/Bad Decisions.mp3', 0, 1, 3, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 1),
(500, 'Touch It', 'Ariana Grande', '/DangerousWoman/Touch It.mp3', 0, 1, 6, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 3),
(501, 'Knew Better Forever Boy', 'Ariana Grande', '/DangerousWoman/Knew Better Forever Boy.mp3', 0, 1, 0, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 1),
(502, 'Thinking Bout You', 'Ariana Grande', '/DangerousWoman/Thinking Bout You.mp3', 0, 1, 0, 'Dangerous Woman', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', 2),
(503, 'American Kids', 'Kenny Chesney', '/LydiaThrowbacks/American Kids.mp3', 0, 1, 0, 'Throwbacks - Kenny Chesney: The Big Revival', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(504, 'To Zion', 'Lauryn Hill - Carlos Santana', '/LydiaThrowbacks/To Zion.mp3', 0, 1, 0, 'Throwbacks - Ms. Lauryn Hill, Carlos Santana: The Miseducation of Lauryn Hill', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(505, 'In Da Club', '50 Cent', '/LydiaThrowbacks/In Da Club.mp3', 0, 1, 1, 'Throwbacks - 50 Cent: Get Rich Or Die Tryin', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(506, 'Lips of an Angel', 'Hinder', '/LydiaThrowbacks/Lips of an Angel.mp3', 0, 1, 0, 'Throwbacks - Hinder: Extreme Behavior', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 2),
(507, 'Airplanes', 'B.o.B and Hayley Williams', '/LydiaThrowbacks/Airplanes.mp3', 0, 1, 5, 'Throwbacks - B.o.B, Hayley Williams: B.o.B Presents: The Adventures of Bobby Ray', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 3),
(508, 'When Can I See You Again', 'Owl City', '/LydiaThrowbacks/When Can I See You Again.mp3', 0, 1, 2, 'Throwbacks - Owl City: Wreck-It Ralph Soundtrack', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(509, 'Valerie', 'Amy Winehouse', '/LydiaThrowbacks/Valerie.mp3', 0, 1, 2, 'Throwbacks - Amy Winehouse: Lioness: Hidden Treasures', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(510, 'Smooth', 'Santana - Rob Thomas', '/LydiaThrowbacks/Smooth.mp3', 0, 1, 0, 'Throwbacks - Santana, Rob Thomas: Supernatural', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 6),
(511, 'Unwritten', 'Natasha Bedingfield', '/LydiaThrowbacks/Unwritten.mp3', 0, 1, 2, 'Throwbacks - Natasha Bedingfield: Unwritten', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 4),
(512, 'Torn', 'Natalie Imbruglia', '/LydiaThrowbacks/Torn.mp3', 0, 1, 7, 'Throwbacks - Natalie Imbruglia: Left of the Middle', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 10),
(513, 'Paradise', 'Coldplay', '/LydiaThrowbacks/Paradise.mp3', 0, 1, 1, 'Throwbacks - Coldplay: Mylo Xyloto', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 2),
(514, 'Angels On The Moon', 'Thriving Ivory', '/LydiaThrowbacks/Angels On The Moon.mp3', 0, 1, 0, 'Throwbacks - Thriving Ivory: Thriving Ivory', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(515, 'Get Back', 'Demi Lovato', '/LydiaThrowbacks/Get Back.mp3', 0, 1, 3, 'Throwbacks - Demi Lovato: Don\'t Forget', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(516, 'Take Me Home Country Roads', 'John Denver', '/LydiaThrowbacks/Take Me Home Country Roads.mp3', 0, 1, 5, 'Throwbacks - John Denver: The John Denver Collection', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 5),
(517, 'Walking On A Dream', 'Empire of the Sun', '/LydiaThrowbacks/Walking On A Dream.mp3', 0, 1, 0, 'Throwbacks - Empire of the Sun: Walking On A Dream', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(518, 'Oh No!', 'MARINA', '/LydiaThrowbacks/Oh No!.mp3', 0, 1, 0, 'Throwbacks - MARINA: The Family Jewels', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 2),
(519, 'La La La', 'LMFAO', '/LydiaThrowbacks/La La La.mp3', 0, 1, 2, 'Throwbacks - LMFAO: Party Rock', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(520, 'Chandelier', 'Sia', '/LydiaThrowbacks/Chandelier.mp3', 0, 1, 3, 'Throwbacks - Sia: 1000 Forms of Fear', 0, 1, 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png', 1),
(521, 'august', 'Taylor Swift', 'folklore/august.mp3', 1, 1, 98, 'folklore', 1, 8, 'https://i.imgur.com/oZvDEky.jpg', 137),
(522, 'betty', 'Taylor Swift', 'folklore/betty.mp3', 1, 1, 86, 'folklore', 1, 14, 'https://i.imgur.com/oZvDEky.jpg', 107),
(523, 'cardigan', 'Taylor Swift', 'folklore/cardigan.mp3', 1, 1, 77, 'folklore', 1, 2, 'https://i.imgur.com/oZvDEky.jpg', 123),
(524, 'epiphany', 'Taylor Swift', 'folklore/epiphany.mp3', 1, 1, 72, 'folklore', 1, 13, 'https://i.imgur.com/oZvDEky.jpg', 79),
(525, 'exile', 'Taylor Swift', 'folklore/exile.mp3', 1, 1, 83, 'folklore', 1, 4, 'https://i.imgur.com/oZvDEky.jpg', 119),
(526, 'hoax', 'Taylor Swift', 'folklore/hoax.mp3', 1, 1, 88, 'folklore', 1, 16, 'https://i.imgur.com/oZvDEky.jpg', 87),
(527, 'illicit affairs', 'Taylor Swift', 'folklore/illicit affairs.mp3', 1, 1, 85, 'folklore', 1, 10, 'https://i.imgur.com/oZvDEky.jpg', 102),
(528, 'invisible string', 'Taylor Swift', 'folklore/invisible string.mp3', 1, 1, 80, 'folklore', 1, 11, 'https://i.imgur.com/oZvDEky.jpg', 103),
(529, 'mad woman', 'Taylor Swift', 'folklore/mad woman.mp3', 1, 1, 73, 'folklore', 1, 12, 'https://i.imgur.com/oZvDEky.jpg', 90),
(530, 'mirrorball', 'Taylor Swift', 'folklore/mirrorball.mp3', 1, 1, 63, 'folklore', 1, 6, 'https://i.imgur.com/oZvDEky.jpg', 87),
(531, 'my tears ricochet', 'Taylor Swift', 'folklore/my tears ricochet.mp3', 1, 1, 89, 'folklore', 1, 5, 'https://i.imgur.com/oZvDEky.jpg', 108),
(532, 'peace', 'Taylor Swift', 'folklore/peace.mp3', 1, 1, 60, 'folklore', 1, 15, 'https://i.imgur.com/oZvDEky.jpg', 86),
(533, 'seven', 'Taylor Swift', 'folklore/seven.mp3', 1, 1, 72, 'folklore', 1, 7, 'https://i.imgur.com/oZvDEky.jpg', 80),
(534, 'the 1', 'Taylor Swift', 'folklore/the 1.mp3', 1, 1, 82, 'folklore', 1, 1, 'https://i.imgur.com/oZvDEky.jpg', 99),
(535, 'the lakes', 'Taylor Swift', 'folklore/the lakes.mp3', 1, 1, 73, 'folklore', 1, 17, 'https://i.imgur.com/oZvDEky.jpg', 97),
(536, 'the last great american dynasty', 'Taylor Swift', 'folklore/the last great american dynasty.mp3', 1, 1, 73, 'folklore', 1, 3, 'https://i.imgur.com/oZvDEky.jpg', 105),
(537, 'this is me trying', 'Taylor Swift', 'folklore/this is me trying.mp3', 1, 1, 88, 'folklore', 1, 9, 'https://i.imgur.com/oZvDEky.jpg', 85),
(538, 'Don\'t Stop', 'Fleetwood Mac', 'Rumours/Don\'t Stop.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 1),
(539, 'Dreams', 'Fleetwood Mac', 'Rumours/Dreams.mp3', 0, 1, 2, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 3),
(540, 'Go Your Own Way', 'Fleetwood Mac', 'Rumours/Go Your Own Way.mp3', 0, 1, 1, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 1),
(541, 'Gold Dust Woman', 'Fleetwood Mac', 'Rumours/Gold Dust Woman.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 1),
(542, 'I Don\'t Want to Know', 'Fleetwood Mac', 'Rumours/I Don\'t Want to Know.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 2),
(543, 'Never Going Back Again', 'Fleetwood Mac', 'Rumours/Never Going Back Again.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 1),
(544, 'Oh Daddy', 'Fleetwood Mac', 'Rumours/Oh Daddy.mp3', 0, 1, 1, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 2),
(545, 'Second Hand News', 'Fleetwood Mac', 'Rumours/Second Hand News.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 3),
(546, 'Songbird', 'Fleetwood Mac', 'Rumours/Songbird.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 1),
(547, 'The Chain', 'Fleetwood Mac', 'Rumours/The Chain.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 2),
(548, 'You Make Loving Fun', 'Fleetwood Mac', 'Rumours/You Make Loving Fun.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 2),
(549, 'Silver Springs', 'Fleetwood Mac', 'Rumours/Silver Springs.mp3', 0, 1, 0, 'Fleetwood Mac - Rumours', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG', 3),
(550, 'Tennis Court', 'Lorde', 'PureHeroine/Tennis Court.mp3', 0, 1, 2, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 6),
(551, '400 Lux', 'Lorde', 'PureHeroine/400 Lux.mp3', 0, 1, 4, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 2),
(552, 'Royals', 'Lorde', 'PureHeroine/Royals.mp3', 0, 1, 5, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 2),
(553, 'Ribs', 'Lorde', 'PureHeroine/Ribs.mp3', 0, 1, 13, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 2),
(554, 'Buzzcut Season', 'Lorde', 'PureHeroine/Buzzcut Season.mp3', 0, 1, 1, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 2),
(555, 'Team', 'Lorde', 'PureHeroine/Team.mp3', 0, 1, 12, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 7),
(556, 'Glory and Gore', 'Lorde', 'PureHeroine/Glory and Gore.mp3', 0, 1, 1, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(557, 'Still Sane', 'Lorde', 'PureHeroine/Still Sane.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(558, 'White Teeth Teens', 'Lorde', 'PureHeroine/White Teeth Teens.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(559, 'A World Alone', 'Lorde', 'PureHeroine/A World Alone.mp3', 0, 1, 2, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(560, 'No Better', 'Lorde', 'PureHeroine/No Better.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(561, 'Bravado', 'Lorde', 'PureHeroine/Bravado.mp3', 0, 1, 1, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(562, 'Million Dollar Bills', 'Lorde', 'PureHeroine/Million Dollar Bills.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(563, 'The Love Club', 'Lorde', 'PureHeroine/The Love Club.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(564, 'Biting Down', 'Lorde', 'PureHeroine/Biting Down.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(565, 'Swingin Party', 'Lorde', 'PureHeroine/Swingin Party.mp3', 0, 1, 0, 'Lorde: Pure Heroine', 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png', 1),
(566, 'Chiquitita', 'ABBA', 'Abba/Chiquitita.mp3', 0, 1, 2, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(567, 'Dancing Queen', 'ABBA', 'Abba/Dancing Queen.mp3', 0, 1, 5, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(568, 'Does Your Mother Know', 'ABBA', 'Abba/Does Your Mother Know.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(569, 'Fernando', 'ABBA', 'Abba/Fernando.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(570, 'Gimme Gimme Gimme A Man After Midnight', 'ABBA', 'Abba/Gimme Gimme Gimme A Man After Midnight.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(571, 'I Have A Dream', 'ABBA', 'Abba/I Have A Dream.mp3', 0, 1, 0, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(572, 'Knowing Me Knowing You', 'ABBA', 'Abba/Knowing Me Knowing You.mp3', 0, 1, 0, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(573, 'Lay All Your Love On Me', 'ABBA', 'Abba/Lay All Your Love On Me.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(574, 'Mamma Mia', 'ABBA', 'Abba/Mamma Mia.mp3', 0, 1, 5, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(575, 'Money Money Money', 'ABBA', 'Abba/Money Money Money.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(576, 'One Of Us', 'ABBA', 'Abba/One Of Us.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(577, 'S.O.S.', 'ABBA', 'Abba/S.O.S..mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(578, 'Super Trouper', 'ABBA', 'Abba/Super Trouper.mp3', 0, 1, 3, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(579, 'Take A Chance On Me', 'ABBA', 'Abba/Take A Chance On Me.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 2),
(580, 'Thank You For The Music', 'ABBA', 'Abba/Thank You For The Music.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(581, 'The Name Of The Game', 'ABBA', 'Abba/The Name Of The Game.mp3', 0, 1, 3, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(582, 'The Winner Takes It All', 'ABBA', 'Abba/The Winner Takes It All.mp3', 0, 1, 0, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(583, 'Voulez Vous', 'ABBA', 'Abba/Voulez Vous.mp3', 0, 1, 1, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 1),
(584, 'Waterloo', 'ABBA', 'Abba/Waterloo.mp3', 0, 1, 2, 'ABBA Gold: Greatest Hits', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png', 3),
(605, 'Begin Again Instrumental', 'Taylor Swift', 'QuietCalmArt/Begin Again Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(606, 'betty All Too Well Cornelia Street Mashup', 'Taylor Swift', 'QuietCalmArt/betty All Too Well Cornelia Street Mashup.mp3', 0, 1, 5, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 17),
(607, 'Clean Instrumental', 'Taylor Swift', 'QuietCalmArt/Clean Instrumental.mp3', 0, 1, 8, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(608, 'Death by a Thousand Cuts Instrumental', 'Taylor Swift', 'QuietCalmArt/Death by a Thousand Cuts Instrumental.mp3', 0, 1, 3, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(609, 'Enchanted Instrumental', 'Taylor Swift', 'QuietCalmArt/Enchanted Instrumental.mp3', 0, 1, 7, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(610, 'Fearless Instrumental', 'Taylor Swift', 'QuietCalmArt/Fearless Instrumental.mp3', 0, 1, 6, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(611, 'Getaway Car Instrumental', 'Taylor Swift', 'QuietCalmArt/Getaway Car Instrumental.mp3', 0, 1, 5, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 6),
(612, 'Holy Ground Instrumental', 'Taylor Swift', 'QuietCalmArt/Holy Ground Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(613, 'How You Get the Girl Instrumental', 'Taylor Swift', 'QuietCalmArt/How You Get the Girl Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(614, 'I Dont Wanna Live Forever Instrumental', 'Taylor Swift', 'QuietCalmArt/I Dont Wanna Live Forever Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(615, 'King of My Heart Cornelia Street Mashup', 'Taylor Swift', 'QuietCalmArt/King of My Heart Cornelia Street Mashup.mp3', 0, 1, 4, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(616, 'Look What You Made Me Do Instrumental', 'Taylor Swift', 'QuietCalmArt/Look What You Made Me Do Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(617, 'Lover Instrumental', 'Taylor Swift', 'QuietCalmArt/Lover Instrumental.mp3', 0, 1, 5, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(618, 'Miss Americana and the Heartbreak Prince So It Goes Mashup', 'Taylor Swift', 'QuietCalmArt/Miss Americana and the Heartbreak Prince So It Goes Mashup.mp3', 0, 1, 3, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(619, 'Only the Young Instrumental', 'Taylor Swift', 'QuietCalmArt/Only the Young Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(620, 'Sparks Fly Instrumental', 'Taylor Swift', 'QuietCalmArt/Sparks Fly Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(621, 'State of Grace Instrumental', 'Taylor Swift', 'QuietCalmArt/State of Grace Instrumental.mp3', 0, 1, 3, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 5),
(622, 'Style Instrumental', 'Taylor Swift', 'QuietCalmArt/Style Instrumental.mp3', 0, 1, 3, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(623, 'The Last Time Instrumental', 'Taylor Swift', 'QuietCalmArt/The Last Time Instrumental.mp3', 0, 1, 0, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(624, 'The Story of Us Instrumental', 'Taylor Swift', 'QuietCalmArt/The Story of Us Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(625, 'Today Was A Fairytale Instrumental', 'Taylor Swift', 'QuietCalmArt/Today Was A Fairytale Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(626, 'Treacherous Instrumental', 'Taylor Swift', 'QuietCalmArt/Treacherous Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(627, 'Wildest Dreams Ready For It Mashup', 'Taylor Swift', 'QuietCalmArt/Wildest Dreams Ready For It Mashup.mp3', 0, 1, 3, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 5),
(628, 'You Are in Love Call It What You Want Mashup', 'Taylor Swift', 'QuietCalmArt/You Are in Love Call It What You Want Mashup.mp3', 0, 1, 2, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(629, 'You Need To Calm Down Instrumental', 'Taylor Swift', 'QuietCalmArt/You Need To Calm Down Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(630, 'Mariners Apartment Complex', 'Lana Del Rey', 'QuietCalmArt/Mariners Apartment Complex.mp3', 0, 1, 2, 'Lana Del Rey - Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(631, 'Landslide', 'Fleetwood Mac', 'QuietCalmArt/Landslide.mp3', 0, 1, 0, 'Fleetwood Mac - Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(632, 'Fallingwater', 'Maggie Rogers', 'QuietCalmArt/Fallingwater.mp3', 0, 1, 0, 'Maggie Rogers - Quiet Calm Art', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(633, 'Barnyard Song', 'Taylor Swift', 'Unreleased/Barnyard Song.mp3', 0, 1, 1, 'Unreleased', 0, 1, 'https://i.imgur.com/EJDtG33.jpg', 4),
(648, 'Aint Nothing Bout You', 'Taylor Swift', 'Covers/Aint Nothing Bout You.mp3', 1, 1, 52, 'Covers - Brooks & Dunn', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 50),
(649, 'Drive', 'Taylor Swift', 'Covers/Drive.mp3', 1, 1, 68, 'Covers - Alan Jackson', 0, 1, 'https://i.imgur.com/Yv6xiKL.jpg', 42),
(664, 'Out of Love', 'Alessia Cara', 'QuietCalmArt2/Alessia Cara - Out of Love.mp3', 0, 1, 0, 'Alessia Cara - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(665, 'Monster Mash', 'Bobby Pickett', 'QuietCalmArt2/Bobby Pickett - Monster Mash.mp3', 0, 1, 1, 'Bobby Pickett - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(666, 'Falling Asleep At The Wheel', 'Holly Humberstone', 'QuietCalmArt2/Holly Humberstone - Falling Asleep At The Wheel.mp3', 0, 1, 0, 'Holly Humberstone - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(667, 'Peacock', 'Katy Perry', 'QuietCalmArt2/Katy Perry - Peacock.mp3', 0, 1, 1, 'Katy Perry - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(668, 'Thriller', 'Michael Jackson', 'QuietCalmArt2/Michael Jackson - Thriller.mp3', 0, 1, 1, 'Michael Jackson - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(669, 'Saturn', 'Sleeping At Last', 'QuietCalmArt2/Sleeping at Last - Saturn.mp3', 0, 1, 0, 'Sleeping at Last - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(670, 'Sandalwood I.mp3', 'Jonny Greenwood', 'QuietCalmArt2/Jonny Greenwood - Sandalwood I.mp3', 0, 1, 0, 'Jonny Greenwood - Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(671, '22 Instrumental', 'Taylor Swift', 'QuietCalmArt2/22 Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(672, 'All You Had to Do Was Stay Instrumental', 'Taylor Swift', 'QuietCalmArt2/All You Had to Do Was Stay Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(673, 'Call It What You Want Instrumental', 'Taylor Swift', 'QuietCalmArt2/Call It What You Want Instrumental.mp3', 0, 1, 5, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(674, 'Cruel Summer Instrumental', 'Taylor Swift', 'QuietCalmArt2/Cruel Summer Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(675, 'Enchanted Instrumental', 'Taylor Swift', 'QuietCalmArt2/Enchanted Instrumental.mp3', 0, 1, 0, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(676, 'GhostBusters Theme', 'Taylor Swift', 'QuietCalmArt2/GhostBusters Theme.mp3', 0, 1, 8, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(677, 'I Forgot That You Existed Instrumental', 'Taylor Swift', 'QuietCalmArt2/I Forgot That You Existed Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(678, 'I Knew You Were Trouble Instrumental', 'Taylor Swift', 'QuietCalmArt2/I Knew You Were Trouble Instrumental.mp3', 0, 1, 3, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(679, 'Love Story Instrumental', 'Taylor Swift', 'QuietCalmArt2/Love Story Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(680, 'Mine Instrumental', 'Taylor Swift', 'QuietCalmArt2/Mine Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(681, 'Miss Americana and the Heartbreak Prince Instrumental', 'Taylor Swift', 'QuietCalmArt2/Miss Americana and the Heartbreak Prince Instrumental.mp3', 0, 1, 5, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(682, 'New Years Day Instrumental', 'Taylor Swift', 'QuietCalmArt2/New Years Day Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(683, 'Our Song Instrumental', 'Taylor Swift', 'QuietCalmArt2/Our Song Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(684, 'Out of the Woods Instrumental', 'Taylor Swift', 'QuietCalmArt2/Out of the Woods Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(685, 'Starlight Instrumental', 'Taylor Swift', 'QuietCalmArt2/Starlight Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(686, 'The Man Instrumental', 'Taylor Swift', 'QuietCalmArt2/The Man Instrumental.mp3', 0, 1, 1, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(687, 'The Moment I Knew Instrumental', 'Taylor Swift', 'QuietCalmArt2/The Moment I Knew Instrumental.mp3', 0, 1, 0, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(688, 'This Is Halloween', 'Taylor Swift', 'QuietCalmArt2/This Is Halloween.mp3', 0, 1, 2, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(689, 'Wildest Dreams Instrumental', 'Taylor Swift', 'QuietCalmArt2/Wildest Dreams Instrumental.mp3', 0, 1, 4, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 3),
(690, 'You Belong With Me Instrumental', 'Taylor Swift', 'QuietCalmArt2/You Belong With Me Instrumental.mp3', 0, 1, 3, 'Quiet Calm Art 2', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(691, 'Purgatory', 'Kim Petras', 'TurnOfftheLight/Purgatory.mp3', 0, 1, 1, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(692, 'There Will Be Blood', 'Kim Petras', 'TurnOfftheLight/There Will Be Blood.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(693, 'Bloody Valentine', 'Kim Petras', 'TurnOfftheLight/Bloody Valentine.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(694, 'Wrong Turn', 'Kim Petras', 'TurnOfftheLight/Wrong Turn.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(695, 'Demons', 'Kim Petras', 'TurnOfftheLight/Demons.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 0),
(696, 'Massacre', 'Kim Petras', 'TurnOfftheLight/Massacre.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(697, 'Knives', 'Kim Petras', 'TurnOfftheLight/Knives.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(698, 'Death By Sex', 'Kim Petras', 'TurnOfftheLight/Death By Sex.mp3', 0, 1, 2, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(699, 'o m e n', 'Kim Petras', 'TurnOfftheLight/o m e n.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(700, 'Close Your Eyes', 'Kim Petras', 'TurnOfftheLight/Close Your Eyes.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(701, 'TRANSylvania', 'Kim Petras', 'TurnOfftheLight/TRANSylvania.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(702, 'Turn Off The Light', 'Kim Petras', 'TurnOfftheLight/Turn Off The Light.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(703, 'Tell Me It\'s A Nightmare', 'Kim Petras', 'TurnOfftheLight/Tell Me It\'s A Nightmare.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(704, 'i don’t wanna die…', 'Kim Petras', 'TurnOfftheLight/i don’t wanna die.mp3', 0, 1, 3, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(705, 'In The Next Life', 'Kim Petras', 'TurnOfftheLight/In The Next Life.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(706, 'Boo! Bitch!', 'Kim Petras', 'TurnOfftheLight/Boo! Bitch!.mp3', 0, 1, 2, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(707, 'Everybody Dies', 'Kim Petras', 'TurnOfftheLight/Everybody Dies.mp3', 0, 1, 3, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(708, 'Party Till I Die', 'Kim Petras', 'TurnOfftheLight/Party Till I Die.mp3', 0, 1, 0, 'Kim Petras: Turn Off the Light', 0, 1, 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png', 2),
(709, 'Small Things', 'Ben Howard', 'QuietCalmArt3/Ben Howard - Small Things.mp3', 0, 1, 0, 'Ben Howard - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(710, 'How You Like That Acoustic', 'Blackpink', 'QuietCalmArt3/Blackpink - How You Like That Acoustic.mp3', 0, 1, 2, 'Blackpink - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 4),
(711, 'Lovesick Girls Acoustic', 'Blackpink', 'QuietCalmArt3/Blackpink - Lovesick Girls Acoustic.mp3', 0, 1, 0, 'Blackpink - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 7),
(712, 'Ice Cream Acoustic', 'Blackpink - Selena Gomez', 'QuietCalmArt3/Blackpink Selena Gomez - Ice Cream Acoustic.mp3', 0, 1, 0, 'Blackpink / Selena Gomez - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(713, 'Revelator Eyes', 'The Paper Kites', 'QuietCalmArt3/The Paper Kites - Revelator Eyes.mp3', 0, 1, 0, 'The Paper Kites - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(714, 'Only One', 'Yellowcard', 'QuietCalmArt3/Yellowcard - Only One.mp3', 0, 1, 0, 'Yellowcard - Quiet Calm Art 3', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(715, 'Santa Tell Me Piano', 'Ariana Grande', 'QuietCalmArt4/Ariana Grande - Santa Tell Me Piano.mp3', 0, 1, 0, 'Ariana Grande - Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(716, 'Steps', 'Handsome Ghost', 'QuietCalmArt4/Handsome Ghost - Steps.mp3', 0, 1, 6, 'Handsome Ghost - Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 2),
(717, 'Christmas Tree Farm Piano Instrumental', 'Taylor Swift', 'QuietCalmArt4/Christmas Tree Farm Piano Instrumental.mp3', 0, 1, 2, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(718, 'Here Comes Santa Claus Piano', 'Taylor Swift', 'QuietCalmArt4/Here Comes Santa Claus Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(719, 'I\'ll Be Home For Christmas Piano', 'Taylor Swift', 'QuietCalmArt4/I\'ll Be Home For Christmas Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(720, 'It\'s The Most Wonderful Time of the Year Piano', 'Taylor Swift', 'QuietCalmArt4/It\'s The Most Wonderful Time of the Year Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(721, 'Jingle Bells Piano', 'Taylor Swift', 'QuietCalmArt4/Jingle Bells Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(722, 'Last Christmas Piano.mp3', 'Taylor Swift', 'QuietCalmArt4/Last Christmas Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(723, 'Let It Snow Piano', 'Taylor Swift', 'QuietCalmArt4/Let It Snow Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(724, 'All I Want For Christmas Is You Piano', 'Mariah Carey', 'QuietCalmArt4/Mariah Carey - All I Want For Christmas Is You Piano.mp3', 0, 1, 2, 'Mariah Carey - Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(725, 'Meteor Shower', 'Taylor Swift', 'QuietCalmArt4/Meteor Shower.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(726, 'O Christmas Tree Piano', 'Taylor Swift', 'QuietCalmArt4/O Christmas Tree Piano.mp3', 0, 1, 2, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(727, 'Rockin Around The Christmas Tree Piano', 'Taylor Swift', 'QuietCalmArt4/Rockin Around The Christmas Tree Piano.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(728, 'Space Girl', 'Taylor Swift', 'QuietCalmArt4/Space Girl.mp3', 0, 1, 0, 'Quiet Calm Art 4', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 1),
(729, 'willow', 'Taylor Swift', 'evermore/willow.m4a', 1, 1, 78, 'evermore', 1, 1, 'https://i.imgur.com/YcHPqib.jpg', 28),
(730, 'champagne problems', 'Taylor Swift', 'evermore/champagne problems.m4a', 1, 1, 103, 'evermore', 1, 2, 'https://i.imgur.com/YcHPqib.jpg', 13),
(731, 'gold rush', 'Taylor Swift', 'evermore/gold rush.m4a', 1, 1, 80, 'evermore', 1, 3, 'https://i.imgur.com/YcHPqib.jpg', 13),
(732, '\'tis the damn season', 'Taylor Swift', 'evermore/\'tis the damn season.m4a', 1, 1, 72, 'evermore', 1, 4, 'https://i.imgur.com/YcHPqib.jpg', 11),
(733, 'tolerate it', 'Taylor Swift', 'evermore/tolerate it.m4a', 1, 1, 83, 'evermore', 1, 5, 'https://i.imgur.com/YcHPqib.jpg', 10),
(734, 'no body, no crime', 'Taylor Swift', 'evermore/no body, no crime.m4a', 1, 1, 87, 'evermore', 1, 6, 'https://i.imgur.com/YcHPqib.jpg', 11),
(735, 'happiness', 'Taylor Swift', 'evermore/happiness.m4a', 1, 1, 67, 'evermore', 1, 7, 'https://i.imgur.com/YcHPqib.jpg', 13),
(736, 'dorothea', 'Taylor Swift', 'evermore/dorothea.m4a', 1, 1, 77, 'evermore', 1, 8, 'https://i.imgur.com/YcHPqib.jpg', 9),
(737, 'coney island', 'Taylor Swift', 'evermore/coney island.m4a', 1, 1, 70, 'evermore', 1, 9, 'https://i.imgur.com/YcHPqib.jpg', 8),
(738, 'ivy', 'Taylor Swift', 'evermore/ivy.m4a', 1, 1, 71, 'evermore', 1, 10, 'https://i.imgur.com/YcHPqib.jpg', 16),
(739, 'cowboy like me', 'Taylor Swift', 'evermore/cowboy like me.m4a', 1, 1, 72, 'evermore', 1, 11, 'https://i.imgur.com/YcHPqib.jpg', 7),
(740, 'long story short', 'Taylor Swift', 'evermore/long story short.m4a', 1, 1, 70, 'evermore', 1, 12, 'https://i.imgur.com/YcHPqib.jpg', 15),
(741, 'marjorie', 'Taylor Swift', 'evermore/marjorie.m4a', 1, 1, 75, 'evermore', 1, 13, 'https://i.imgur.com/YcHPqib.jpg', 4),
(742, 'closure', 'Taylor Swift', 'evermore/closure.m4a', 1, 1, 74, 'evermore', 1, 14, 'https://i.imgur.com/YcHPqib.jpg', 4),
(743, 'evermore', 'Taylor Swift', 'evermore/evermore.m4a', 1, 1, 70, 'evermore', 1, 15, 'https://i.imgur.com/YcHPqib.jpg', 10),
(745, 'it\'s time to go', 'Taylor Swift', 'evermore/it\'s time to go.mp3', 1, 1, 63, 'evermore', 1, 17, 'https://i.imgur.com/YcHPqib.jpg', 0),
(746, 'right where you left me', 'Taylor Swift', 'evermore/right where you left me.mp3', 1, 1, 96, 'evermore', 1, 16, 'https://i.imgur.com/YcHPqib.jpg', 0),
(747, 'willow dancing witch', 'Taylor Swift', 'evermore/willow dancing witch version.mp3', 1, 1, 96, 'evermore (Elvira remix)', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(748, 'willow lonely witch', 'Taylor Swift', 'evermore/willow lonely witch version.mp3', 1, 1, 69, 'evermore', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(749, 'willow moonlit witch', 'Taylor Swift', 'evermore/willow moonlit witch version.mp3', 1, 1, 71, 'evermore', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(750, 'willow songwriting demo', 'Taylor Swift', 'evermore/willow songwriting demo.mp3', 0, 1, 2, 'evermore', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(751, 'Christmas Tree Farm Jingle Ball Live', 'Taylor Swift', 'Christmas/Christmas Tree Farm Jingle Ball.mp3', 1, 1, 66, 'Christmas Tree Farm', 0, 1, 'https://i.imgur.com/Mf8wn2Q.jpg', 0),
(763, 'Love Story TV', 'Taylor Swift', '/fearlessv2/Love Story.m4a', 1, 1, 59, 'Fearless (Taylor\'s Version)', 1, 3, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(764, 'Gasoline', 'Taylor Swift', '/Features/Gasoline Haim.mp3', 1, 1, 58, 'Haim (feat. Taylor Swift) - Women In Music Pt III', 0, 1, 'https://i.imgur.com/SxblGwj.jpg', 0),
(765, 'august Instrumental', 'Taylor Swift', 'QuietCalmArt5/august Instrumental.mp3', 0, 1, 5, 'folklore - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(766, 'betty Instrumental', 'Taylor Swift', 'QuietCalmArt5/betty Instrumental.mp3', 0, 1, 5, 'folklore - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(767, 'seven Instrumental', 'Taylor Swift', 'QuietCalmArt5/seven Instrumental.mp3', 0, 1, 3, 'folklore - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(768, 'Viva La Vida Epic Orchestra', 'Coldplay', 'QuietCalmArt5/Coldplay - Viva La Vida Epic Orchestra.mp3', 0, 1, 0, 'Coldplay - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(769, 'The Driveway', 'Miley Cyrus', 'QuietCalmArt5/Miley Cyrus - The Driveway.mp3', 0, 1, 1, 'Miley Cyrus - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(770, 'Wonderland Piano', 'Taylor Swift', 'QuietCalmArt5/Wonderland Piano.mp3', 0, 1, 4, '1989 - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(771, 'You Are In Love Piano', 'Taylor Swift', 'QuietCalmArt5/You Are In Love Piano.mp3', 0, 1, 1, '1989 - Quiet Calm Art 5', 0, 1, 'https://i.imgur.com/C95l6oE.jpeg', 0),
(772, 'Love Story TV Elvira Remix', 'Taylor Swift', '/fearlessv2/Love Story (Elvira Remix).mp3', 1, 1, 58, 'Fearless (Taylor\'s Version)', 1, 27, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(773, 'You All Over Me TV', 'Taylor Swift', '/fearlessv2/You All Over Me (From The Vault).mp3', 1, 1, 58, 'Fearless (Taylor\'s Version)', 1, 21, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(774, 'Mr Perfectly Fine TV', 'Taylor Swift', '/fearlessv2/Mr Perfectly Fine (From The Vault).mp3', 1, 1, 76, 'Fearless (Taylor\'s Version)', 1, 22, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(775, '1989 Perfect Fight Song', 'Taylor Swift', '1989/1989 Perfect Fight Song.mp3', 1, 1, 54, '1989', 0, 1, 'https://i.imgur.com/i1QDoZR.jpg', 0),
(776, 'Fearless TV', 'Taylor Swift', '/fearlessv2/Fearless.m4a', 1, 1, 50, 'Fearless (Taylor\'s Version)', 1, 1, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(777, 'Fifteen TV', 'Taylor Swift', '/fearlessv2/Fifteen.m4a', 1, 1, 39, 'Fearless (Taylor\'s Version)', 1, 2, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(778, 'Hey Stephen TV', 'Taylor Swift', '/fearlessv2/Hey Stephen.m4a', 1, 1, 53, 'Fearless (Taylor\'s Version)', 1, 4, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(779, 'White Horse TV', 'Taylor Swift', '/fearlessv2/White Horse.m4a', 1, 1, 62, 'Fearless (Taylor\'s Version)', 1, 5, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(780, 'You Belong With Me TV', 'Taylor Swift', '/fearlessv2/You Belong With Me.m4a', 1, 1, 44, 'Fearless (Taylor\'s Version)', 1, 6, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(781, 'Breathe TV', 'Taylor Swift', '/fearlessv2/Breathe.m4a', 1, 1, 42, 'Fearless (Taylor\'s Version)', 1, 7, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(782, 'Tell Me Why TV', 'Taylor Swift', '/fearlessv2/Tell Me Why.m4a', 1, 1, 61, 'Fearless (Taylor\'s Version)', 1, 8, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(783, 'You\'re Not Sorry TV', 'Taylor Swift', '/fearlessv2/You\'re Not Sorry.m4a', 1, 1, 46, 'Fearless (Taylor\'s Version)', 1, 9, 'https://i.imgur.com/2lDT0PV.jpg', 0);
INSERT INTO `song_detail` (`id`, `official_name`, `artist_name`, `path`, `autoplay`, `can_queue`, `play_count`, `album`, `is_album`, `track_number`, `album_art_url`, `old_play_count`) VALUES
(784, 'The Way I Loved You TV', 'Taylor Swift', '/fearlessv2/The Way I Loved You.m4a', 1, 1, 58, 'Fearless (Taylor\'s Version)', 1, 10, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(785, 'Forever And Always TV', 'Taylor Swift', '/fearlessv2/Forever And Always.m4a', 1, 1, 47, 'Fearless (Taylor\'s Version)', 1, 11, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(786, 'The Best Day TV', 'Taylor Swift', '/fearlessv2/The Best Day.m4a', 1, 1, 44, 'Fearless (Taylor\'s Version)', 1, 12, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(787, 'Change TV', 'Taylor Swift', '/fearlessv2/Change.m4a', 1, 1, 48, 'Fearless (Taylor\'s Version)', 1, 13, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(788, 'Jump Then Fall TV', 'Taylor Swift', '/fearlessv2/Jump Then Fall.m4a', 1, 1, 46, 'Fearless (Taylor\'s Version)', 1, 14, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(789, 'Untouchable TV', 'Taylor Swift', '/fearlessv2/Untouchable.m4a', 1, 1, 50, 'Fearless (Taylor\'s Version)', 1, 15, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(790, 'Forever And Always Piano TV', 'Taylor Swift', '/fearlessv2/Forever And Always Piano.m4a', 1, 1, 58, 'Fearless (Taylor\'s Version)', 1, 16, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(791, 'Come In With The Rain TV', 'Taylor Swift', '/fearlessv2/Come In With The Rain.m4a', 1, 1, 48, 'Fearless (Taylor\'s Version)', 1, 17, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(792, 'Superstar TV', 'Taylor Swift', '/fearlessv2/Superstar.m4a', 1, 1, 53, 'Fearless (Taylor\'s Version)', 1, 18, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(793, 'The Other Side Of The Door TV', 'Taylor Swift', '/fearlessv2/The Other Side Of The Door.m4a', 1, 1, 44, 'Fearless (Taylor\'s Version)', 1, 19, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(794, 'Today Was A Fairytale TV', 'Taylor Swift', '/fearlessv2/Today Was A Fairytale.m4a', 1, 1, 44, 'Fearless (Taylor\'s Version)', 1, 20, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(795, 'We Were Happy TV', 'Taylor Swift', '/fearlessv2/We Were Happy (From The Vault).m4a', 1, 1, 55, 'Fearless (Taylor\'s Version)', 1, 23, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(796, 'That\'s When TV', 'Taylor Swift', '/fearlessv2/That\'s When (From The Vault).m4a', 1, 1, 50, 'Fearless (Taylor\'s Version)', 1, 24, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(797, 'Don\'t You TV', 'Taylor Swift', '/fearlessv2/Don\'t You (From The Vault).m4a', 1, 1, 42, 'Fearless (Taylor\'s Version)', 1, 25, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(798, 'Bye Bye Baby TV', 'Taylor Swift', '/fearlessv2/Bye Bye Baby (From The Vault).m4a', 1, 1, 60, 'Fearless (Taylor\'s Version)', 1, 26, 'https://i.imgur.com/2lDT0PV.jpg', 0),
(799, 'cardigan Grammys', 'Taylor Swift', 'Grammys/cardigan Grammys.mp3', 1, 1, 54, 'folklore', 0, 1, 'https://i.imgur.com/oZvDEky.jpg', 0),
(800, 'august Grammys', 'Taylor Swift', 'Grammys/august Grammys.mp3', 1, 1, 63, 'folklore', 0, 1, 'https://i.imgur.com/oZvDEky.jpg', 0),
(801, 'willow Grammys', 'Taylor Swift', 'Grammys/willow Grammys.mp3', 1, 1, 45, 'evermore', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(802, 'brutal', 'Olivia Rodrigo', 'SOUR/brutal.mp3', 0, 1, 5, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(803, 'traitor', 'Olivia Rodrigo', 'SOUR/traitor.mp3', 0, 1, 7, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(804, 'drivers license', 'Olivia Rodrigo', 'SOUR/drivers license.mp3', 0, 1, 0, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(805, '1 step forward 3 steps back', 'Olivia Rodrigo', 'SOUR/1 step forward 3 steps back.mp3', 0, 1, 1, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(806, 'deja vu', 'Olivia Rodrigo', 'SOUR/deja vu.mp3', 0, 1, 5, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(807, 'good 4 u', 'Olivia Rodrigo', 'SOUR/good 4 u.mp3', 0, 1, 7, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(808, 'enough for you', 'Olivia Rodrigo', 'SOUR/enough for you.mp3', 0, 1, 1, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(809, 'happier', 'Olivia Rodrigo', 'SOUR/happier.mp3', 0, 1, 8, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(810, 'jealousy jealousy', 'Olivia Rodrigo', 'SOUR/jealousy jealousy.mp3', 0, 1, 4, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(811, 'favorite crime', 'Olivia Rodrigo', 'SOUR/favorite crime.mp3', 0, 1, 2, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(812, 'hope ur ok', 'Olivia Rodrigo', 'SOUR/hope ur ok.mp3', 0, 1, 2, 'SOUR - Olivia Rodrigo', 0, 1, 'https://i.imgur.com/BRhpd71.jpeg', 0),
(813, 'willow 90s trend remix', 'Taylor Swift', 'evermore/willow 90s trend remix.mp3', 1, 1, 40, 'evermore', 0, 1, 'https://i.imgur.com/YcHPqib.jpg', 0),
(814, 'Solar Power', 'Lorde', 'SolarPower/Solar Power.mp3', 0, 1, 9, 'Lorde: Solar Power', 0, 1, 'https://i.imgur.com/Rc7QJff.jpeg', 0),
(815, 'Wildest Dreams (Taylor\'s Version)', 'Taylor Swift', '1989v2/Wildest Dreams (Taylor\'s Version).mp3', 1, 1, 2, '1989 (Taylor\'s Version)', 0, 9, 'https://i.imgur.com/2BGCtyO.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `song_name`
--

CREATE TABLE `song_name` (
  `id` int(11) NOT NULL,
  `song_detail_id` int(11) NOT NULL,
  `song_name` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `song_name`
--

INSERT INTO `song_name` (`id`, `song_detail_id`, `song_name`) VALUES
(3, 3, 'Viva La Vida'),
(4, 4, 'Wildest Dreams Grammys'),
(5, 5, 'Blank Space Grammys'),
(6, 6, 'I Wish You Would'),
(7, 7, '22'),
(8, 8, 'This Love'),
(9, 9, 'New Romantics'),
(10, 10, 'Style'),
(11, 11, 'Safe & Sound'),
(12, 12, 'Sweet Tea And God\'s Graces'),
(13, 13, 'A Perfectly Good Heart'),
(14, 14, 'A Place In This World'),
(15, 15, 'All Too Well Grammys'),
(16, 16, 'All Too Well'),
(17, 17, 'All You Had To Do Was Stay'),
(18, 18, 'Am I Ready For Love'),
(19, 19, 'American Girl'),
(20, 20, 'Angelina'),
(21, 21, 'Back To December Acoustic'),
(22, 22, 'Back To December'),
(23, 23, 'Beautiful Eyes'),
(24, 24, 'Begin Again'),
(25, 25, 'Being With My Baby Acoustic'),
(26, 26, 'Better Off'),
(27, 27, 'Blank Space - Voice Memos'),
(28, 28, 'Blank Space'),
(29, 29, 'Brand New World'),
(30, 30, 'Breathless'),
(31, 31, 'Brought Up That Way'),
(32, 32, 'By The Way'),
(33, 33, 'Change'),
(34, 34, 'Check Out This View'),
(35, 35, 'Clean Live'),
(36, 36, 'Closest To A Cowboy'),
(37, 37, 'Come In With The Rain'),
(38, 38, 'Cross My Heart'),
(39, 39, 'Didn\'t They'),
(40, 40, 'Don\'t Hate Me For Loving You'),
(41, 41, 'Drops Of Jupiter Live'),
(42, 42, 'Everything Has Changed'),
(43, 43, 'Eyes Open'),
(44, 44, 'Fall Back On You'),
(45, 45, 'Fearless'),
(46, 46, 'Firefly'),
(47, 47, 'For You'),
(48, 48, 'Forever & Always Piano'),
(49, 49, 'Half Of My Heart'),
(50, 50, 'Haunted Live'),
(51, 51, 'Here You Come Again'),
(52, 52, 'Highway Don\'t Care'),
(53, 53, 'Holy Ground'),
(54, 54, 'How You Get The Girl'),
(55, 55, 'Hysteria ft. Def Leppard'),
(56, 56, 'I Don\'t Wanna Live Forever'),
(57, 57, 'I Knew You Were Trouble.'),
(58, 57, 'I Knew You Were Trouble'),
(59, 57, 'IKYWT'),
(60, 60, 'I Know What I Want'),
(61, 61, 'I Want You Back Live'),
(62, 62, 'I Want You Back'),
(63, 63, 'I\'d Lie'),
(64, 64, 'In The Pouring Rain'),
(65, 65, 'Invisible'),
(66, 66, 'Last Christmas'),
(67, 67, 'Last Kiss Live'),
(68, 68, 'Live For The Little Things'),
(69, 69, 'Long Live Live'),
(70, 70, 'Long Time Coming'),
(71, 71, 'Love Story 1989'),
(72, 72, 'Love Story Live'),
(73, 73, 'Love They Haven\'t Thought Of Yet'),
(74, 74, 'Lucky You'),
(75, 75, 'Mandolin'),
(76, 76, 'Mary\'s Song Oh My My My'),
(77, 77, 'Me And Britney'),
(78, 78, 'Mean Live'),
(79, 79, 'Mine'),
(80, 80, 'My Cure'),
(81, 81, 'My Turn To Be Me'),
(82, 82, 'Nashville'),
(83, 83, 'Need You Now'),
(84, 84, 'Never Mind'),
(85, 85, 'Oh My My My Demo'),
(86, 86, 'One Thing Studio'),
(87, 87, 'One Thing'),
(88, 88, 'Our Last Night'),
(89, 89, 'Our Song ft. Def Leppard'),
(90, 90, 'Our Song Pop Mix'),
(91, 91, 'Out Of The Woods Live'),
(92, 92, 'Out Of The Woods'),
(93, 93, 'Permanent Marker'),
(94, 94, 'Picture To Burn ft. Def Leppard'),
(95, 95, 'Pour Some Sugar On Me ft. Def Leppard'),
(96, 96, 'Rain Song'),
(97, 97, 'Red'),
(98, 98, 'Sad Beautiful Tragic'),
(99, 99, 'Same Girl'),
(100, 100, 'Shake It Off Acoustic'),
(101, 101, 'Shake It Off'),
(102, 102, 'Should\'ve Said No US'),
(103, 103, 'Sparks Fly Original Lyrics'),
(104, 104, 'Sparks Fly Live'),
(105, 105, 'Starlight'),
(106, 106, 'Stay Beautiful'),
(107, 107, 'Stay Stay Stay'),
(108, 108, 'Stupid Boy'),
(109, 109, 'Style Live'),
(110, 110, 'Teardrops On My Guitar ft. Def Leppard'),
(111, 111, 'Teardrops On My Guitar Pop'),
(112, 112, 'Tell Me Why'),
(113, 113, 'Tell Me'),
(114, 114, 'Ten Dollars And A Six Pack'),
(115, 115, 'The Last Time'),
(116, 116, 'The Outside'),
(117, 117, 'The Story Of Us Live'),
(118, 118, 'The Way I Loved You'),
(119, 119, 'Tied Together With A Smile'),
(120, 120, 'Today Was a Fairytale'),
(121, 121, 'Treacherous'),
(122, 122, 'Umbrella'),
(123, 123, 'We Are Never Ever Getting Back Together Live'),
(124, 123, 'WANEGBT Live'),
(125, 125, 'We Are Never Ever Getting Back Together Seine'),
(126, 125, 'WANEGBT Seine'),
(127, 127, 'We Are Never Ever Getting Back Together'),
(128, 127, 'WANEGBT'),
(129, 127, 'WANGBT'),
(130, 123, 'We Are Never Getting Back Together Live'),
(131, 123, 'WANGBT Live'),
(132, 132, 'What Do You Say'),
(133, 133, 'When Daddy Let Me Drive'),
(134, 134, 'When Love And Hate Collide ft. Def Leppard'),
(135, 135, 'White Blank Page'),
(136, 136, 'Wonderland'),
(137, 137, 'You Belong With Me'),
(138, 138, 'Your Anything'),
(139, 139, 'Your Face Acoustic'),
(140, 140, 'Your Face'),
(141, 141, 'Mean'),
(142, 142, 'Haunted'),
(143, 143, 'Fearless Acoustic'),
(144, 144, 'Come Back... Be Here'),
(145, 145, 'Honey Baby'),
(146, 146, 'I Know Places'),
(147, 147, 'Just South Of Knowing Why Drive All Night'),
(148, 148, 'I Heart Question Mark Demo'),
(149, 149, 'Haunted Acoustic'),
(150, 150, 'Jump Then Fall'),
(151, 151, 'Clean'),
(152, 152, 'Dear John Live'),
(153, 153, 'I Heart'),
(154, 154, 'If This Was A Movie'),
(155, 155, 'American Boy'),
(156, 156, 'Fearless Demo'),
(157, 157, 'Matches'),
(158, 158, 'Love Story 2.0'),
(159, 159, 'Bad Blood Remix'),
(160, 160, 'Bad Blood'),
(161, 161, 'I Wished On A Plane'),
(162, 162, 'Love To Lose'),
(163, 163, 'Innocent'),
(164, 164, 'Dear John'),
(165, 165, 'Enchanted Live'),
(166, 166, 'Breathe'),
(167, 167, 'All Night Diner'),
(168, 168, 'Love ft. Def Leppard'),
(169, 169, 'My Songs Know What You Did'),
(170, 170, 'Christmas Must Be Something More'),
(171, 171, 'Better Than Revenge'),
(172, 172, 'Both Of Us'),
(173, 173, 'Our Last Night Acoustic'),
(174, 174, 'Out Of The Woods Grammys'),
(175, 175, 'Perfect Have I Loved Acoustic Demo'),
(176, 176, 'Picture To Burn'),
(177, 177, 'Point Of View'),
(178, 178, 'R-E-V-E-N-G-E'),
(179, 179, 'Riptide'),
(180, 180, 'Ronan'),
(181, 181, 'Santa Baby'),
(182, 182, 'Shake It Off Live'),
(183, 183, 'Speak Now Live'),
(184, 184, 'Speak Now'),
(185, 185, 'State Of Grace'),
(186, 186, 'Sugar'),
(187, 187, 'Superman'),
(188, 188, 'Superstar'),
(189, 189, 'Teardrops On My Guitar'),
(190, 190, 'That\'s Life'),
(191, 191, 'Thats When'),
(192, 192, 'The Best Day'),
(193, 193, 'The Diary Of Me'),
(194, 194, 'The Moment I Knew'),
(195, 195, 'The Story Of Us'),
(196, 196, 'Thirteen Blocks'),
(197, 197, 'This Is Really Happening'),
(198, 198, 'This Love Live'),
(199, 199, 'Till Brad Pitt Comes Along'),
(200, 200, 'Tim McGraw Acoustic'),
(201, 201, 'Tim Mcgraw'),
(202, 202, 'Untouchable'),
(203, 203, 'Wait For Me'),
(204, 204, 'We Were Happy'),
(205, 205, 'Welcome Distraction'),
(206, 206, 'Welcome To New York'),
(207, 207, 'What To Wear'),
(208, 208, 'Who I\'ve Always Been'),
(209, 209, 'Wildest Dreams Acoustic'),
(210, 212, 'Wildest Dreams Enchanted Live'),
(211, 212, 'Enchanted Wildest Dreams'),
(212, 212, 'Enchanted/Wildest Dreams Live'),
(213, 213, 'Wildest Dreams'),
(214, 214, 'You Do'),
(215, 215, 'You Don\'t Have To Call Me'),
(216, 216, 'You\'re Not Sorry'),
(217, 217, 'Gracie Acoustic'),
(218, 218, 'Can I Go With You'),
(219, 219, 'We Are Coming Undone'),
(220, 220, 'Look At You Like That'),
(221, 221, 'Thinking About You'),
(222, 222, 'Love Story'),
(223, 223, 'Red Demo'),
(224, 224, 'Bette Davis Eyes Live'),
(225, 225, 'Ours'),
(226, 226, 'Back To December Apologize Live'),
(227, 227, 'Hey Stephen'),
(228, 228, 'I Know Places Live'),
(229, 229, 'Last Kiss'),
(230, 230, 'Love Story ft. Def Leppard'),
(231, 231, 'Just a Dream'),
(232, 232, 'I Almost Do'),
(233, 233, 'Baby Don\'t You Break My Heart Slow'),
(234, 234, 'White Christmas'),
(235, 235, 'Spinning Around'),
(236, 236, 'Sweeter Than Fiction'),
(237, 237, 'Christmases When You Were Mine'),
(238, 238, 'Smokey Black Nights'),
(239, 239, 'Thug Story'),
(240, 240, 'Enchanted Wildest Dreams Tokyo'),
(241, 241, 'Welcome To New York Live'),
(242, 242, 'Cold As You'),
(243, 243, 'Two Is Better Than One'),
(244, 244, 'Should\'ve Said No'),
(245, 245, 'Enchanted'),
(246, 246, 'Forever & Always'),
(247, 247, 'Crazier'),
(248, 248, 'Bad Blood Live'),
(249, 249, 'Treacherous Demo'),
(250, 250, 'Never Grow Up'),
(251, 251, 'I\'m Every Woman'),
(252, 252, 'Silent Night'),
(253, 253, 'New Romantics Live'),
(254, 254, 'Mine Pop Mix'),
(255, 255, 'How You Get The Girl Live'),
(256, 256, 'Our Song'),
(257, 257, 'I\'m Only Me When I\'m With You'),
(258, 258, 'The Other Side Of The Door'),
(259, 259, 'Fifteen'),
(260, 260, 'Girl At Home'),
(261, 261, 'State Of Grace Acoustic'),
(262, 262, 'Under My Head'),
(263, 263, 'Two Steps Behind ft. Def Leppard'),
(264, 264, 'I Knew You Were Trouble Live'),
(265, 264, 'IKYWT Live'),
(266, 264, 'IKYWT. Live'),
(267, 267, 'Photograph ft. Def Leppard'),
(268, 268, 'Run ft. Def Leppard'),
(269, 269, 'Sparks Fly'),
(270, 270, 'Better Than Revenge Live'),
(271, 271, 'Dark Blue Tennessee'),
(272, 272, 'I Used To Fly'),
(273, 273, 'The Lucky One'),
(274, 274, 'White Horse'),
(275, 275, 'Never Mind Country'),
(276, 276, 'All You Had To Do Was Stay Live'),
(277, 277, 'I Wish You Would Live'),
(278, 278, 'Ours Live'),
(279, 279, 'Blank Space Live'),
(280, 280, 'Long Live'),
(281, 281, 'Wildest Dreams R3hab'),
(282, 282, 'Writing Songs About You'),
(283, 283, 'You Are In Love Live'),
(284, 284, 'You Are In Love'),
(286, 57, 'IKYWT.'),
(287, 195, 'TSOU'),
(288, 117, 'TSOU Live'),
(289, 206, 'WTNY'),
(290, 241, 'WTNY Live'),
(291, 144, 'Come Back Be Here'),
(292, 292, 'Treacherous Acoustic Live'),
(293, 293, 'You All Over Me'),
(294, 178, 'Revenge'),
(295, 295, 'Out Of The Woods Grammy Awards'),
(296, 296, 'Fearless I\'m Yours Hey Soul Sister Live'),
(297, 296, 'Fearless I\'m Yours Live'),
(298, 298, 'Down Came The Rain'),
(299, 299, 'Fifteen Live'),
(300, 300, 'Love Story SN Live'),
(301, 301, 'Mine Live'),
(302, 302, 'Our Song Live'),
(303, 303, 'Sweet Escape Live'),
(304, 304, 'You Belong With Me Live'),
(305, 305, 'New Romantics SS Live'),
(306, 308, 'IKYWT SS Live'),
(307, 307, 'Blank Space SS Live'),
(308, 308, 'I Knew You Were Trouble SS Live'),
(309, 309, 'I Don\'t Wanna Live Forever SS Live'),
(310, 309, 'IDWLF SS Live'),
(311, 311, 'You Belong With Me SS Live'),
(312, 311, 'YBWM SS Live'),
(313, 313, 'Red SS Live'),
(314, 314, 'All Too Well SS Live'),
(315, 315, 'Shake It Off SS Live'),
(316, 315, 'SIO SS Live'),
(317, 318, 'OOTW SS Live'),
(318, 318, 'Out Of The Woods SS Live'),
(319, 319, 'Bad Blood SS Live'),
(320, 320, 'Look What You Made Me Do'),
(322, 322, 'Ready For It'),
(323, 323, 'How You Get The Girl Grammys'),
(324, 320, 'LWYMMD'),
(325, 325, 'Gorgeous'),
(326, 76, 'Marys Song'),
(327, 327, 'Call It What You Want'),
(328, 327, 'CIWYW'),
(330, 330, 'End Game'),
(331, 331, 'I Did Something Bad'),
(332, 332, 'Don\'t Blame Me'),
(333, 333, 'Delicate'),
(334, 334, 'So It Goes'),
(335, 335, 'Getaway Car'),
(336, 336, 'King Of My Heart'),
(337, 337, 'Dancing With Our Hands Tied'),
(338, 338, 'Dress'),
(339, 339, 'This Is Why We Can\'t Have Nice Things'),
(340, 340, 'New Years Day'),
(341, 341, 'New Years Day Piano'),
(343, 343, 'Better Man SS Live'),
(344, 344, 'This Is What You Came For SS Live'),
(345, 344, 'TIWYCF SS Live'),
(346, 346, 'Run George Strait'),
(348, 348, '22 Seine'),
(349, 349, 'I Knew You Were Trouble Seine'),
(350, 350, 'Love Story Seine'),
(351, 351, 'Red Seine'),
(352, 352, 'You Belong With Me Seine'),
(353, 349, 'IKYWT Seine'),
(354, 354, 'Delicate Remix'),
(355, 355, 'Ready for It BloodPop'),
(356, 356, 'Delicate Acoustic Spotify'),
(357, 357, 'September Acoustic Spotify'),
(358, 358, 'New Years Day Piano SXM'),
(359, 359, 'Call It What You Want Acoustic SXM'),
(360, 360, 'American Girl Piano SXM'),
(361, 361, 'We Are Never Ever Getting Back Together Country Mix'),
(362, 361, 'WANEGBT Country Mix'),
(363, 363, 'Delicate Seeb Remix'),
(364, 363, 'Delicate Seeb'),
(365, 365, 'Let\'s Go'),
(366, 366, 'Ready For It rep Live'),
(367, 366, 'RFI rep Live'),
(368, 368, 'All Too Well rep Live'),
(369, 368, 'ATW rep Live'),
(370, 370, 'Bad Blood Should\'ve Said No rep Live'),
(371, 371, 'Blank Space rep Live'),
(372, 372, 'Call It What You Want rep Live'),
(373, 372, 'CIWYW rep Live'),
(374, 374, 'Dancing With Our Hands Tied rep Live'),
(375, 374, 'DWOHT rep Live'),
(376, 376, 'Delicate rep Live'),
(377, 377, 'Don\'t Blame Me rep Live'),
(378, 378, 'Dress rep Live'),
(379, 379, 'End Game rep Live'),
(380, 380, 'Getaway Car rep Live'),
(381, 381, 'Gorgeous rep Live'),
(382, 382, 'I Did Something Bad rep Live'),
(383, 382, 'IDSB rep Live'),
(384, 384, 'King of My Heart rep Live'),
(385, 384, 'KOMH rep Live'),
(386, 386, 'Long Live New Year\'s Day rep Live'),
(387, 386, 'Long Live NYD rep Live'),
(388, 388, 'Look What You Made Me Do Intro rep Live'),
(389, 388, 'LWYMMD Intro rep Live'),
(390, 390, 'Look What You Made Me Do rep Live'),
(391, 390, 'LWYMMD rep Live'),
(392, 392, 'reputation Intro rep Live'),
(393, 393, 'Shake It Off rep Live'),
(394, 394, 'So It Goes rep Live'),
(395, 395, 'Style Love Story You Belong With Me rep Live'),
(396, 396, 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live'),
(397, 396, 'WANEGBT TIWWCHNT rep Live'),
(398, 398, 'Why She Disappeared rep Live'),
(399, 399, 'Holy Ground F1 Live'),
(400, 400, 'ME!'),
(401, 401, 'You Need To Calm Down'),
(402, 402, 'The Archer'),
(403, 403, 'Lover'),
(404, 404, 'I Forgot That You Existed'),
(405, 405, 'Cruel Summer'),
(406, 406, 'The Man'),
(407, 407, 'I Think He Knows'),
(408, 408, 'Miss Americana & The Heartbreak Prince'),
(409, 409, 'Paper Rings'),
(410, 410, 'Cornelia Street'),
(411, 411, 'Death By A Thousand Cuts'),
(412, 412, 'London Boy'),
(413, 413, 'Soon You\'ll Get Better'),
(414, 414, 'False God'),
(415, 415, 'Afterglow'),
(416, 416, 'It\'s Nice To Have A Friend'),
(417, 417, 'Daylight'),
(418, 418, 'The Archer SXM Live'),
(419, 419, 'You Need To Calm Down SXM Live'),
(420, 420, 'Daylight SXM Live'),
(421, 421, 'Beautiful Ghosts'),
(422, 422, 'Babe'),
(423, 423, 'Christmas Tree Farm'),
(439, 439, 'Only The Young'),
(440, 440, 'False God SNL Live'),
(441, 441, 'Lover SNL Live'),
(442, 442, 'The Man AMA Live'),
(443, 443, 'Lover AMA Live'),
(444, 444, 'Love Story AMA Live'),
(445, 445, 'I Knew You Were Trouble AMA Live'),
(446, 446, 'Blank Space Shake It Off AMA Live'),
(447, 447, 'Can\'t Stop Loving You BBC Live'),
(448, 448, 'London Boy BBC Live'),
(449, 449, 'Lover BBC Live'),
(450, 450, 'The Archer BBC Live'),
(451, 451, 'You Need To Calm Down BBC Live'),
(452, 452, 'Holy Ground BBC Live'),
(453, 453, 'The Man NPR Live'),
(454, 454, 'Lover NPR Live'),
(455, 455, 'Death by a Thousand Cuts NPR Live'),
(456, 456, 'All Too Well NPR Live'),
(457, 457, 'Green Light'),
(458, 458, 'Sober'),
(459, 459, 'Homemade Dynamite'),
(460, 460, 'The Louvre'),
(461, 461, 'Liability'),
(462, 462, 'Hard Feelings-Loveless'),
(463, 463, 'Sober II'),
(464, 464, 'Writer In the Dark'),
(465, 465, 'Supercut'),
(466, 466, 'Liability (Reprise)'),
(467, 467, 'Perfect Places'),
(488, 488, 'Moonlight'),
(489, 489, 'Dangerous Woman'),
(490, 490, 'Be Alright'),
(491, 491, 'Into You'),
(492, 492, 'Side To Side'),
(493, 493, 'Let Me Love You'),
(494, 494, 'Greedy'),
(495, 495, 'Leave Me Lonely'),
(496, 496, 'Everyday'),
(497, 497, 'Sometimes'),
(498, 498, 'I Don\'t Care'),
(499, 499, 'Bad Decisions'),
(500, 500, 'Touch It'),
(501, 501, 'Knew Better Forever Boy'),
(502, 502, 'Thinking Bout You'),
(503, 503, 'American Kids'),
(504, 504, 'To Zion'),
(505, 505, 'In Da Club'),
(506, 506, 'Lips of an Angel'),
(507, 507, 'Airplanes'),
(508, 508, 'When Can I See You Again'),
(509, 509, 'Valerie'),
(510, 510, 'Smooth'),
(511, 511, 'Unwritten'),
(512, 512, 'Torn'),
(513, 513, 'Paradise'),
(514, 514, 'Angels On The Moon'),
(515, 515, 'Get Back'),
(516, 516, 'Take Me Home Country Roads'),
(517, 517, 'Walking On A Dream'),
(518, 518, 'Oh No!'),
(519, 519, 'La La La'),
(520, 520, 'Chandelier'),
(521, 521, 'august'),
(522, 522, 'betty'),
(523, 523, 'cardigan'),
(524, 524, 'epiphany'),
(525, 525, 'exile'),
(526, 526, 'hoax'),
(527, 527, 'illicit affairs'),
(528, 528, 'invisible string'),
(529, 529, 'mad woman'),
(530, 530, 'mirrorball'),
(531, 531, 'my tears ricochet'),
(532, 532, 'peace'),
(533, 533, 'seven'),
(534, 534, 'the 1'),
(535, 535, 'the lakes'),
(536, 536, 'the last great american dynasty'),
(537, 537, 'this is me trying'),
(538, 538, 'Don\'t Stop'),
(539, 539, 'Dreams'),
(540, 540, 'Go Your Own Way'),
(541, 541, 'Gold Dust Woman'),
(542, 542, 'I Don\'t Want to Know'),
(543, 543, 'Never Going Back Again'),
(544, 544, 'Oh Daddy'),
(545, 545, 'Second Hand News'),
(546, 546, 'Songbird'),
(547, 547, 'The Chain'),
(548, 548, 'You Make Loving Fun'),
(549, 549, 'Silver Springs'),
(550, 550, 'Tennis Court'),
(551, 551, '400 Lux'),
(552, 552, 'Royals'),
(553, 553, 'Ribs'),
(554, 554, 'Buzzcut Season'),
(555, 555, 'Team'),
(556, 556, 'Glory and Gore'),
(557, 557, 'Still Sane'),
(558, 558, 'White Teeth Teens'),
(559, 559, 'A World Alone'),
(560, 560, 'No Better'),
(561, 561, 'Bravado'),
(562, 562, 'Million Dollar Bills'),
(563, 563, 'The Love Club'),
(564, 564, 'Biting Down'),
(565, 565, 'Swingin Party'),
(566, 566, 'Chiquitita'),
(567, 567, 'Dancing Queen'),
(568, 568, 'Does Your Mother Know'),
(569, 569, 'Fernando'),
(570, 570, 'Gimme Gimme Gimme A Man After Midnight'),
(571, 571, 'I Have A Dream'),
(572, 572, 'Knowing Me Knowing You'),
(573, 573, 'Lay All Your Love On Me'),
(574, 574, 'Mamma Mia'),
(575, 575, 'Money Money Money'),
(576, 576, 'One Of Us'),
(577, 577, 'S.O.S.'),
(578, 578, 'Super Trouper'),
(579, 579, 'Take A Chance On Me'),
(580, 580, 'Thank You For The Music'),
(581, 581, 'The Name Of The Game'),
(582, 582, 'The Winner Takes It All'),
(583, 583, 'Voulez Vous'),
(584, 584, 'Waterloo'),
(605, 605, 'Begin Again Instrumental'),
(606, 606, 'betty All Too Well Cornelia Street Mashup'),
(607, 607, 'Clean Instrumental'),
(608, 608, 'Death by a Thousand Cuts Instrumental'),
(609, 609, 'Enchanted Instrumental'),
(610, 610, 'Fearless Instrumental'),
(611, 611, 'Getaway Car Instrumental'),
(612, 612, 'Holy Ground Instrumental'),
(613, 613, 'How You Get the Girl Instrumental'),
(614, 614, 'I Dont Wanna Live Forever Instrumental'),
(615, 615, 'King of My Heart Cornelia Street Mashup'),
(616, 616, 'Look What You Made Me Do Instrumental'),
(617, 617, 'Lover Instrumental'),
(618, 618, 'Miss Americana and the Heartbreak Prince So It Goes Mashup'),
(619, 619, 'Only the Young Instrumental'),
(620, 620, 'Sparks Fly Instrumental'),
(621, 621, 'State of Grace Instrumental'),
(622, 622, 'Style Instrumental'),
(623, 623, 'The Last Time Instrumental'),
(624, 624, 'The Story of Us Instrumental'),
(625, 625, 'Today Was A Fairytale Instrumental'),
(626, 626, 'Treacherous Instrumental'),
(627, 627, 'Wildest Dreams Ready For It Mashup'),
(628, 628, 'You Are in Love Call It What You Want Mashup'),
(629, 629, 'You Need To Calm Down Instrumental'),
(630, 630, 'Mariners Apartment Complex'),
(631, 631, 'Landslide'),
(632, 632, 'Fallingwater'),
(633, 633, 'Barnyard Song'),
(648, 648, 'Aint Nothing Bout You'),
(649, 649, 'Drive'),
(664, 664, 'Out of Love'),
(665, 665, 'Monster Mash'),
(666, 666, 'Falling Asleep At The Wheel'),
(667, 667, 'Peacock'),
(668, 668, 'Thriller'),
(669, 669, 'Saturn'),
(670, 670, 'Sandalwood I.mp3'),
(671, 671, '22 Instrumental'),
(672, 672, 'All You Had to Do Was Stay Instrumental'),
(673, 673, 'Call It What You Want Instrumental'),
(674, 674, 'Cruel Summer Instrumental'),
(676, 676, 'GhostBusters Theme'),
(677, 677, 'I Forgot That You Existed Instrumental'),
(678, 678, 'I Knew You Were Trouble Instrumental'),
(679, 679, 'Love Story Instrumental'),
(680, 680, 'Mine Instrumental'),
(681, 681, 'Miss Americana and the Heartbreak Prince Instrumental'),
(682, 682, 'New Years Day Instrumental'),
(683, 683, 'Our Song Instrumental'),
(684, 684, 'Out of the Woods Instrumental'),
(685, 685, 'Starlight Instrumental'),
(686, 686, 'The Man Instrumental'),
(687, 687, 'The Moment I Knew Instrumental'),
(688, 688, 'This Is Halloween'),
(689, 689, 'Wildest Dreams Instrumental'),
(690, 690, 'You Belong With Me Instrumental'),
(691, 691, 'Purgatory'),
(692, 692, 'There Will Be Blood'),
(693, 693, 'Bloody Valentine'),
(694, 694, 'Wrong Turn'),
(695, 695, 'Demons'),
(696, 696, 'Massacre'),
(697, 697, 'Knives'),
(698, 698, 'Death By Sex'),
(699, 699, 'o m e n'),
(700, 700, 'Close Your Eyes'),
(701, 701, 'TRANSylvania'),
(702, 702, 'Turn Off The Light'),
(703, 703, 'Tell Me It\'s A Nightmare'),
(704, 704, 'i don’t wanna die…'),
(705, 705, 'In The Next Life'),
(706, 706, 'Boo! Bitch!'),
(707, 707, 'Everybody Dies'),
(708, 708, 'Party Till I Die'),
(709, 709, 'Small Things'),
(710, 710, 'How You Like That Acoustic'),
(711, 711, 'Lovesick Girls Acoustic'),
(712, 712, 'Ice Cream Acoustic'),
(713, 713, 'Revelator Eyes'),
(714, 714, 'Only One'),
(715, 715, 'Santa Tell Me Piano'),
(716, 716, 'Steps'),
(717, 717, 'Christmas Tree Farm Piano Instrumental'),
(718, 718, 'Here Comes Santa Claus Piano'),
(719, 719, 'I\'ll Be Home For Christmas Piano'),
(720, 720, 'It\'s The Most Wonderful Time of the Year Piano'),
(721, 721, 'Jingle Bells Piano'),
(722, 722, 'Last Christmas Piano.mp3'),
(723, 723, 'Let It Snow Piano'),
(724, 724, 'All I Want For Christmas Is You Piano'),
(725, 725, 'Meteor Shower'),
(726, 726, 'O Christmas Tree Piano'),
(727, 727, 'Rockin Around The Christmas Tree Piano'),
(728, 728, 'Space Girl'),
(729, 729, 'willow'),
(730, 730, 'champagne problems'),
(731, 731, 'gold rush'),
(732, 732, '\'tis the damn season'),
(733, 733, 'tolerate it'),
(734, 734, 'no body, no crime'),
(735, 735, 'happiness'),
(736, 736, 'dorothea'),
(737, 737, 'coney island'),
(738, 738, 'ivy'),
(739, 739, 'cowboy like me'),
(740, 740, 'long story short'),
(741, 741, 'marjorie'),
(742, 742, 'closure'),
(743, 743, 'evermore'),
(745, 745, 'it\'s time to go'),
(746, 746, 'right where you left me'),
(747, 747, 'willow dancing witch'),
(748, 748, 'willow lonely witch'),
(749, 749, 'willow moonlit witch'),
(750, 750, 'willow songwriting demo'),
(751, 751, 'Christmas Tree Farm Jingle Ball Live'),
(763, 763, 'Love Story TV'),
(764, 764, 'Gasoline'),
(765, 765, 'august Instrumental'),
(766, 766, 'betty Instrumental'),
(767, 767, 'seven Instrumental'),
(768, 768, 'Viva La Vida Epic Orchestra'),
(769, 769, 'The Driveway'),
(770, 770, 'Wonderland Piano'),
(771, 771, 'You Are In Love Piano'),
(772, 772, 'Love Story TV Elvira Remix'),
(773, 773, 'You All Over Me TV'),
(774, 774, 'Mr Perfectly Fine TV'),
(775, 775, '1989 Perfect Fight Song'),
(776, 776, 'Fearless TV'),
(777, 777, 'Fifteen TV'),
(778, 778, 'Hey Stephen TV'),
(779, 779, 'White Horse TV'),
(780, 780, 'You Belong With Me TV'),
(781, 781, 'Breathe TV'),
(782, 782, 'Tell Me Why TV'),
(783, 783, 'You\'re Not Sorry TV'),
(784, 784, 'The Way I Loved You TV'),
(785, 785, 'Forever And Always TV'),
(786, 786, 'The Best Day TV'),
(787, 787, 'Change TV'),
(788, 788, 'Jump Then Fall TV'),
(789, 789, 'Untouchable TV'),
(790, 790, 'Forever And Always Piano TV'),
(791, 791, 'Come In With The Rain TV'),
(792, 792, 'Superstar TV'),
(793, 793, 'The Other Side Of The Door TV'),
(794, 794, 'Today Was A Fairytale TV'),
(795, 795, 'We Were Happy TV'),
(796, 796, 'That\'s When TV'),
(797, 797, 'Don\'t You TV'),
(798, 798, 'Bye Bye Baby TV'),
(799, 799, 'cardigan Grammys'),
(800, 800, 'august Grammys'),
(801, 801, 'willow Grammys'),
(802, 802, 'brutal'),
(803, 803, 'traitor'),
(804, 804, 'drivers license'),
(805, 805, '1 step forward 3 steps back'),
(806, 806, 'deja vu'),
(807, 807, 'good 4 u'),
(808, 808, 'enough for you'),
(809, 809, 'happier'),
(810, 810, 'jealousy jealousy'),
(811, 811, 'favorite crime'),
(812, 812, 'hope ur ok'),
(813, 813, 'willow 90s trend remix'),
(814, 814, 'Solar Power'),
(815, 98, 'SBT'),
(816, 144, 'CBBH'),
(817, 16, 'ATW'),
(818, 107, 'Stay X3'),
(819, 339, 'TIWWCHNT'),
(820, 815, 'Wildest Dreams TV');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userID` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UserPing`
--

CREATE TABLE `UserPing` (
  `userID` varchar(40) DEFAULT NULL,
  `pingID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `version`
--

CREATE TABLE `version` (
  `id` int(11) NOT NULL,
  `versionNum` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `patchNotes` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `version`
--

INSERT INTO `version` (`id`, `versionNum`, `patchNotes`) VALUES
(1, 'uRW.2021.09.18 0.4.0', '- Added trusted permission, and spam channel add/remove commands\n- Added confirmation buttons to clearqueue\n- More albums are available for full queueing by mods\n- Added !albumlist / !queueablealbums to show the albums which are enabled for full queueing\n- Updated LHWB.dev website to use new database setup, and added metadata for pretty embeds\n- !recent now has the guild ID passed with the link to provide the correct recent list on the website\n- Please let iAndrewC know of any issues/bugs.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countdown`
--
ALTER TABLE `countdown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `counters`
--
ALTER TABLE `counters`
  ADD UNIQUE KEY `word` (`word`);

--
-- Indexes for table `gifs`
--
ALTER TABLE `gifs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lastfm`
--
ALTER TABLE `lastfm`
  ADD PRIMARY KEY (`discordID`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Ping`
--
ALTER TABLE `Ping`
  ADD PRIMARY KEY (`pingID`);

--
-- Indexes for table `queue_new`
--
ALTER TABLE `queue_new`
  ADD PRIMARY KEY (`id`),
  ADD KEY `queue_song_detail_id_fk` (`song_detail_id`);

--
-- Indexes for table `recent_new`
--
ALTER TABLE `recent_new`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recent_song_detail_id_fk` (`song_detail_id`);

--
-- Indexes for table `requested`
--
ALTER TABLE `requested`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `song_detail`
--
ALTER TABLE `song_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `song_detail_path_uindex` (`path`);

--
-- Indexes for table `song_name`
--
ALTER TABLE `song_name`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `song_name_song_name_uindex` (`song_name`),
  ADD KEY `song_name_song_detail_id_fk` (`song_detail_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `UserPing`
--
ALTER TABLE `UserPing`
  ADD UNIQUE KEY `UserPing_pk` (`userID`,`pingID`),
  ADD KEY `UserPing_Ping_pingID_fk` (`pingID`);

--
-- Indexes for table `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `command`
--
ALTER TABLE `command`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `countdown`
--
ALTER TABLE `countdown`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `gifs`
--
ALTER TABLE `gifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `Ping`
--
ALTER TABLE `Ping`
  MODIFY `pingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `queue_new`
--
ALTER TABLE `queue_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=728;
--
-- AUTO_INCREMENT for table `recent_new`
--
ALTER TABLE `recent_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10507;
--
-- AUTO_INCREMENT for table `requested`
--
ALTER TABLE `requested`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `song_detail`
--
ALTER TABLE `song_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4897;
--
-- AUTO_INCREMENT for table `song_name`
--
ALTER TABLE `song_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=821;
--
-- AUTO_INCREMENT for table `version`
--
ALTER TABLE `version`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `queue_new`
--
ALTER TABLE `queue_new`
  ADD CONSTRAINT `queue_song_detail_id_fk` FOREIGN KEY (`song_detail_id`) REFERENCES `song_detail` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recent_new`
--
ALTER TABLE `recent_new`
  ADD CONSTRAINT `recent_song_detail_id_fk` FOREIGN KEY (`song_detail_id`) REFERENCES `song_detail` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `song_name`
--
ALTER TABLE `song_name`
  ADD CONSTRAINT `song_name_song_detail_id_fk` FOREIGN KEY (`song_detail_id`) REFERENCES `song_detail` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `UserPing`
--
ALTER TABLE `UserPing`
  ADD CONSTRAINT `UserPing_Ping_pingID_fk` FOREIGN KEY (`pingID`) REFERENCES `Ping` (`pingID`) ON DELETE CASCADE,
  ADD CONSTRAINT `UserPing_User_userID_fk` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
