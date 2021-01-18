-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 18, 2021 at 10:28 PM
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
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `albumorder` int(255) DEFAULT NULL,
  `album` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `name`, `path`, `albumorder`, `album`) VALUES
(1, 'Ready For It', 'Ready For It.m4a', 1, 'reputation'),
(2, 'End Game', 'End Game.mp3', 2, 'reputation'),
(3, 'I Did Something Bad', 'I Did Something Bad.mp3', 3, 'reputation'),
(4, 'Dont Blame Me', 'Dont Blame Me.mp3', 4, 'reputation'),
(5, 'Delicate', 'Delicate.mp3', 5, 'reputation'),
(6, 'Look What You Made Me Do', 'Look What You Made Me Do.m4a', 6, 'reputation'),
(7, 'So It Goes', 'So It Goes.mp3', 7, 'reputation'),
(8, 'Gorgeous', 'Gorgeous.m4a', 8, 'reputation'),
(9, 'Getaway Car', 'Getaway Car.mp3', 9, 'reputation'),
(10, 'King Of My Heart', 'King Of My Heart.mp3', 10, 'reputation'),
(11, 'Dancing With Our Hands Tied', 'Dancing With Our Hands Tied.mp3', 11, 'reputation'),
(12, 'Dress', 'Dress.mp3', 12, 'reputation'),
(13, 'This Is Why We Cant Have Nice Things', 'This Is Why We Cant Have Nice Things.mp3', 13, 'reputation'),
(14, 'Call It What You Want', 'Call It What You Want.m4a', 14, 'reputation'),
(15, 'New Years Day', 'New Years Day.mp3', 15, 'reputation'),
(16, 'willow', 'evermore/willow.m4a', 1, 'evermore'),
(17, 'champagne problems', 'evermore/champagne problems.m4a', 2, 'evermore'),
(18, 'gold rush', 'evermore/gold rush.m4a', 3, 'evermore'),
(19, '\'tis the damn season', 'evermore/\'tis the damn season.m4a', 4, 'evermore'),
(20, 'tolerate it', 'evermore/tolerate it.m4a', 5, 'evermore'),
(21, 'no body, no crime', 'evermore/no body, no crime.m4a', 6, 'evermore'),
(22, 'happiness', 'evermore/happiness.m4a', 7, 'evermore'),
(23, 'dorothea', 'evermore/dorothea.m4a', 8, 'evermore'),
(24, 'coney island', 'evermore/coney island.m4a', 9, 'evermore'),
(25, 'ivy', 'evermore/ivy.m4a', 10, 'evermore'),
(26, 'cowboy like me', 'evermore/cowboy like me.m4a', 11, 'evermore'),
(27, 'long story short', 'evermore/long story short.m4a', 12, 'evermore'),
(28, 'marjorie', 'evermore/marjorie.m4a', 13, 'evermore'),
(29, 'closure', 'evermore/closure.m4a', 14, 'evermore'),
(30, 'evermore', 'evermore/evermore.m4a', 15, 'evermore');

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
-- Table structure for table `eggs`
--

CREATE TABLE `eggs` (
  `lastUsed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userID` bigint(20) DEFAULT NULL
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
(88, 'https://i.imgur.com/oTWCldj.gif');

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
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `playcount` int(255) NOT NULL,
  `oldplaycount` int(255) DEFAULT NULL,
  `album` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `albumart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `name`, `path`, `type`, `playcount`, `oldplaycount`, `album`, `albumart`) VALUES
(3, 'Viva La Vida', 'Viva La Vida.mp3', 'released', 1, 1708, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(4, 'Wildest Dreams Grammys', 'Wildest Dreams Grammys.mp3', 'released', 2, 1721, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(5, 'Blank Space Grammys', 'Blank Space Grammys.mp3', 'released', 3, 1700, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(6, 'I Wish You Would', 'I Wish You Would.mp3', 'released', 3, 1746, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(7, '22', '22.mp3', 'released', 10, 1942, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(8, 'This Love', 'This Love.mp3', 'released', 4, 1761, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(9, 'New Romantics', 'New Romantics.mp3', 'released', 5, 1824, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(10, 'Style', 'Style.mp3', 'released', 1, 1840, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(11, 'Safe & Sound', 'Safe & Sound.mp3', 'released', 4, 1754, 'The Hunger Games Soundtrack', 'https://i.imgur.com/KvcKd6Y.jpg'),
(12, 'Sweet Tea And God\'s Graces', 'Sweet Tea And God\'s Graces.mp3', 'unreleased', 0, 9, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(13, 'A Perfectly Good Heart', 'A Perfectly Good Heart.mp3', 'released', 2, 1763, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(14, 'A Place In This World', 'A Place In This World.mp3', 'released', 2, 1745, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(15, 'All Too Well Grammys', 'All Too Well Grammys.mp3', 'released', 2, 1759, 'Grammy Awards', 'http://i.imgur.com/as6dlgi.jpg'),
(16, 'All Too Well', 'All Too Well.mp3', 'released', 1, 1802, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(17, 'All You Had To Do Was Stay', 'All You Had To Do Was Stay.mp3', 'released', 1, 1783, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(18, 'Am I Ready For Love', 'Am I Ready For Love.mp3', 'unreleased', 0, 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(19, 'American Girl', 'American Girl.mp3', 'released', 2, 1772, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(20, 'Angelina', 'Angelina.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(21, 'Back To December Acoustic', 'Back To December Acoustic.mp3', 'released', 3, 1722, 'Speak Now Acoustic', 'https://i.imgur.com/TNKbt8Y.jpg'),
(22, 'Back To December', 'Back To December.mp3', 'released', 5, 1792, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(23, 'Beautiful Eyes', 'Beautiful Eyes.mp3', 'released', 0, 1627, 'Beautiful Eyes EP', 'https://i.imgur.com/7q3N0F6.jpg'),
(24, 'Begin Again', 'Begin Again.mp3', 'released', 5, 1800, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(25, 'Being With My Baby Acoustic', 'Being With My Baby Acoustic.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(26, 'Better Off', 'Better Off.mp3', 'unreleased', 0, 18, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(27, 'Blank Space - Voice Memos', 'Blank Space - Voice Memos.mp3', 'unreleased', 0, 2, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(28, 'Blank Space', 'Blank Space.mp3', 'released', 2, 1784, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(29, 'Brand New World', 'Brand New World.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(30, 'Breathless', 'Breathless.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(31, 'Brought Up That Way', 'Brought Up That Way.mp3', 'unreleased', 0, 15, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(32, 'By The Way', 'By The Way.mp3', 'unreleased', 0, 9, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(33, 'Change', 'Change.mp3', 'released', 1, 1747, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(34, 'Check Out This View', 'Check Out This View.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(35, 'Clean Live', 'Clean Live.mp3', 'released', 0, 1742, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(36, 'Closest To A Cowboy', 'Closest To A Cowboy.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(37, 'Come In With The Rain', 'Come In With The Rain.mp3', 'released', 0, 1667, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(38, 'Cross My Heart', 'Cross My Heart.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(39, 'Didn\'t They', 'Didn\'t They.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(40, 'Don\'t Hate Me For Loving You', 'Don\'t Hate Me For Loving You.mp3', 'unreleased', 0, 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(41, 'Drops Of Jupiter Live', 'Drops Of Jupiter Live.mp3', 'released', 0, 1726, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(42, 'Everything Has Changed', 'Everything Has Changed.mp3', 'released', 2, 1740, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(43, 'Eyes Open', 'Eyes Open.mp3', 'released', 1, 1776, 'The Hunger Games', 'https://i.imgur.com/FIQdRNK.jpg'),
(44, 'Fall Back On You', 'Fall Back On You.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(45, 'Fearless', 'Fearless.mp3', 'released', 1, 1800, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(46, 'Firefly', 'Firefly.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(47, 'For You', 'For You.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(48, 'Forever & Always Piano', 'Forever & Always Piano.mp3', 'released', 4, 1704, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(49, 'Half Of My Heart', 'Half Of My Heart.mp3', 'released', 3, 1729, 'Battle Studies - Feature', 'https://i.imgur.com/Bs34TEr.jpg'),
(50, 'Haunted Live', 'Haunted Live.mp3', 'released', 3, 1731, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(51, 'Here You Come Again', 'Here You Come Again.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(52, 'Highway Don\'t Care', 'Highway Don\'t Care.mp3', 'released', 4, 1721, 'Two Lanes of Freedom - Feature', 'https://i.imgur.com/6Dxgc9J.jpg'),
(53, 'Holy Ground', 'Holy Ground.mp3', 'released', 3, 1805, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(54, 'How You Get The Girl', 'How You Get The Girl.mp3', 'released', 0, 1801, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(55, 'Hysteria ft. Def Leppard', 'Hysteria ft. Def Leppard.mp3', 'unreleased', 0, 27, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(56, 'I Don\'t Wanna Live Forever', 'I Don\'t Wanna Live Forever.mp3', 'released', 4, 1795, 'Fifty Shades Darker Soundtrack', 'https://i.imgur.com/Etkvhn0.jpg'),
(57, 'I Knew You Were Trouble.', 'I Knew You Were Trouble..mp3', 'released', 10, 2286, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(58, 'I Knew You Were Trouble', 'I Knew You Were Trouble..mp3', 'released', 10, 2286, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(59, 'IKYWT', 'I Knew You Were Trouble..mp3', 'released', 10, 2286, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(60, 'I Know What I Want', 'I Know What I Want.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(61, 'I Want You Back Live', 'I Want You Back Live.mp3', 'released', 1, 1804, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(62, 'I Want You Back', 'I Want You Back.mp3', 'released', 0, 1747, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(63, 'I\'d Lie', 'I\'d Lie.mp3', 'unreleased', 0, 55, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(64, 'In The Pouring Rain', 'In The Pouring Rain.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(65, 'Invisible', 'Invisible.mp3', 'released', 1, 1767, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(66, 'Last Christmas', 'Last Christmas.mp3', 'unreleased', 0, 7, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(67, 'Last Kiss Live', 'Last Kiss Live.mp3', 'released', 1, 1784, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(68, 'Live For The Little Things', 'Live For The Little Things.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(69, 'Long Live Live', 'Long Live Live.mp3', 'released', 5, 1735, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(70, 'Long Time Coming', 'Long Time Coming.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(71, 'Love Story 1989', 'Love Story 1989.mp3', 'released', 2, 1757, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(72, 'Love Story Live', 'Love Story Live.mp3', 'released', 4, 1742, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(73, 'Love They Haven\'t Thought Of Yet', 'Love They Haven\'t Thought Of Yet.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(74, 'Lucky You', 'Lucky You.mp3', 'unreleased', 0, 16, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(75, 'Mandolin', 'Mandolin.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(76, 'Mary\'s Song Oh My My My', 'Mary\'s Song Oh My My My.mp3', 'released', 7, 1941, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(77, 'Me And Britney', 'Me And Britney.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(78, 'Mean Live', 'Mean Live.mp3', 'released', 1, 1745, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(79, 'Mine', 'Mine.mp3', 'released', 3, 1829, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(80, 'My Cure', 'My Cure.mp3', 'unreleased', 0, 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(81, 'My Turn To Be Me', 'My Turn To Be Me.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(82, 'Nashville', 'Nashville.mp3', 'released', 0, 1853, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(83, 'Need You Now', 'Need You Now.mp3', 'unreleased', 0, 11, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(84, 'Never Mind', 'Never Mind.mp3', 'unreleased', 0, 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(85, 'Oh My My My Demo', 'Oh My My My Demo.mp3', 'released', 1, 1597, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(86, 'One Thing Studio', 'One Thing Studio.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(87, 'One Thing', 'One Thing.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(88, 'Our Last Night', 'Our Last Night.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(89, 'Our Song ft. Def Leppard', 'Our Song ft. Def Leppard.mp3', 'unreleased', 0, 34, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(90, 'Our Song Pop Mix', 'Our Song Pop Mix.mp3', 'released', 0, 1748, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(91, 'Out Of The Woods Live', 'Out Of The Woods Live.mp3', 'released', 3, 1732, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(92, 'Out Of The Woods', 'Out Of The Woods.mp3', 'released', 2, 1818, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(93, 'Permanent Marker', 'Permanent Marker.mp3', 'unreleased', 0, 19, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(94, 'Picture To Burn ft. Def Leppard', 'Picture To Burn ft. Def Leppard.mp3', 'unreleased', 0, 23, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(95, 'Pour Some Sugar On Me ft. Def Leppard', 'Pour Some Sugar On Me ft. Def Leppard.mp3', 'unreleased', 0, 29, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(96, 'Rain Song', 'Rain Song.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(97, 'Red', 'Red.mp3', 'released', 6, 1923, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(98, 'Sad Beautiful Tragic', 'Sad Beautiful Tragic.mp3', 'released', 2, 1827, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(99, 'Same Girl', 'Same Girl.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(100, 'Shake It Off Acoustic', 'Shake It Off Acoustic.mp3', 'released', 4, 1736, '1989 Acoustic', 'https://i.imgur.com/i1QDoZR.jpg'),
(101, 'Shake It Off', 'Shake It Off.mp3', 'released', 6, 1791, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(102, 'Should\'ve Said No US', 'Should\'ve Said No US.mp3', 'released', 2, 1771, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(103, 'Sparks Fly Original Lyrics', 'Sparks Fly Original Lyrics.mp3', 'released', 2, 1817, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(104, 'Sparks Fly Live', 'Sparks Fly Live.mp3', 'released', 2, 1778, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(105, 'Starlight', 'Starlight.mp3', 'released', 6, 1751, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(106, 'Stay Beautiful', 'Stay Beautiful.mp3', 'released', 3, 1754, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(107, 'Stay Stay Stay', 'Stay Stay Stay.mp3', 'released', 4, 1755, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(108, 'Stupid Boy', 'Stupid Boy.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(109, 'Style Live', 'Style Live.mp3', 'released', 2, 1702, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(110, 'Teardrops On My Guitar ft. Def Leppard', 'Teardrops On My Guitar ft. Def Leppard.mp3', 'unreleased', 0, 27, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(111, 'Teardrops On My Guitar Pop', 'Teardrops On My Guitar Pop.mp3', 'released', 4, 1798, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(112, 'Tell Me Why', 'Tell Me Why.mp3', 'released', 5, 1775, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(113, 'Tell Me', 'Tell Me.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(114, 'Ten Dollars And A Six Pack', 'Ten Dollars And A Six Pack.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(115, 'The Last Time', 'The Last Time.mp3', 'released', 2, 1793, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(116, 'The Outside', 'The Outside.mp3', 'released', 2, 1672, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(117, 'The Story Of Us Live', 'The Story Of Us Live.mp3', 'released', 5, 1934, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(118, 'The Way I Loved You', 'The Way I Loved You.mp3', 'released', 4, 1771, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(119, 'Tied Together With A Smile', 'Tied Together With A Smile.mp3', 'released', 1, 1795, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(120, 'Today Was a Fairytale', 'Today Was a Fairytale.mp3', 'released', 1, 1771, 'Valentine\'s Day', 'https://i.imgur.com/8pPGLAG.jpg'),
(121, 'Treacherous', 'Treacherous.mp3', 'released', 3, 1802, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(122, 'Umbrella', 'Umbrella.mp3', 'released', 4, 1734, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(123, 'We Are Never Ever Getting Back Together Live', 'We Are Never Ever Getting Back Together Live.mp3', 'released', 6, 1964, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(124, 'WANEGBT Live', 'We Are Never Ever Getting Back Together Live.mp3', 'released', 6, 1964, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(125, 'We Are Never Ever Getting Back Together Seine', 'We Are Never Ever Getting Back Together Seine.mp3', 'released', 1, 1924, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(126, 'WANEGBT Seine', 'We Are Never Ever Getting Back Together Seine.mp3', 'released', 1, 1924, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(127, 'We Are Never Ever Getting Back Together', 'We Are Never Ever Getting Back Together.mp3', 'released', 9, 2141, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(128, 'WANEGBT', 'We Are Never Ever Getting Back Together.mp3', 'released', 9, 2141, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(129, 'WANGBT', 'We Are Never Ever Getting Back Together.mp3', 'released', 9, 2141, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(130, 'We Are Never Getting Back Together Live', 'We Are Never Getting Back Together Live.mp3', 'released', 6, 1956, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(131, 'WANGBT Live', 'We Are Never Getting Back Together Live.mp3', 'released', 6, 1956, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(132, 'What Do You Say', 'What Do You Say.mp3', 'unreleased', 0, 9, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(133, 'When Daddy Let Me Drive', 'When Daddy Let Me Drive.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(134, 'When Love And Hate Collide ft. Def Leppard', 'When Love And Hate Collide ft. Def Leppard.mp3', 'unreleased', 0, 24, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(135, 'White Blank Page', 'White Blank Page.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(136, 'Wonderland', 'Wonderland.mp3', 'released', 2, 1784, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(137, 'You Belong With Me', 'You Belong With Me.mp3', 'released', 5, 1781, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(138, 'Your Anything', 'Your Anything.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(139, 'Your Face Acoustic', 'Your Face Acoustic.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(140, 'Your Face', 'Your Face.mp3', 'unreleased', 0, 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(141, 'Mean', 'Mean.mp3', 'released', 4, 1843, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(142, 'Haunted', 'Haunted.mp3', 'released', 1, 1811, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(143, 'Fearless Acoustic', 'Fearless Acoustic.mp3', 'released', 3, 1820, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(144, 'Come Back... Be Here', 'Come Back... Be Here.mp3', 'released', 6, 1955, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(145, 'Honey Baby', 'Honey Baby.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(146, 'I Know Places', 'I Know Places.mp3', 'released', 1, 1788, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(147, 'Just South Of Knowing Why Drive All Night', 'Just South Of Knowing Why Drive All Night.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(148, 'I Heart Question Mark Demo', 'I Heart Question Mark Demo.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(149, 'Haunted Acoustic', 'Haunted Acoustic.mp3', 'released', 2, 1730, 'Speak Now Acoustic', 'https://i.imgur.com/TNKbt8Y.jpg'),
(150, 'Jump Then Fall', 'Jump Then Fall.mp3', 'released', 2, 1688, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(151, 'Clean', 'Clean.mp3', 'released', 5, 1824, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(152, 'Dear John Live', 'Dear John Live.mp3', 'released', 1, 1775, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(153, 'I Heart', 'I Heart.mp3', 'unreleased', 0, 26, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(154, 'If This Was A Movie', 'If This Was A Movie.mp3', 'released', 7, 1734, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(155, 'American Boy', 'American Boy.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(156, 'Fearless Demo', 'Fearless Demo.mp3', 'released', 0, 1806, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(157, 'Matches', 'Matches.mp3', 'unreleased', 0, 7, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(158, 'Love Story 2.0', 'Love Story 2.0.m4a', 'released', 1, 1730, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(159, 'Bad Blood Remix', 'Bad Blood Remix.mp3', 'released', 4, 1687, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(160, 'Bad Blood', 'Bad Blood.mp3', 'released', 2, 1764, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(161, 'I Wished On A Plane', 'I Wished On A Plane.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(162, 'Love To Lose', 'Love To Lose.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(163, 'Innocent', 'Innocent.mp3', 'released', 4, 1811, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(164, 'Dear John', 'Dear John.mp3', 'released', 2, 1795, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(165, 'Enchanted Live', 'Enchanted Live.mp3', 'released', 3, 1765, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(166, 'Breathe', 'Breathe.mp3', 'released', 2, 1810, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(167, 'All Night Diner', 'All Night Diner.mp3', 'unreleased', 0, 20, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(168, 'Love ft. Def Leppard', 'Love ft. Def Leppard.mp3', 'unreleased', 0, 25, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(169, 'My Songs Know What You Did', 'My Songs Know What You Did.mp3', 'released', 0, 1778, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(170, 'Christmas Must Be Something More', 'Christmas Must Be Something More.mp3', 'unreleased', 0, 4, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(171, 'Better Than Revenge', 'Better Than Revenge.mp3', 'released', 3, 1738, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(172, 'Both Of Us', 'Both Of Us.mp3', 'released', 1, 1847, 'Strange Clouds - Feature', 'https://i.imgur.com/z5gPv3w.jpg'),
(173, 'Our Last Night Acoustic', 'Our Last Night Acoustic.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(174, 'Out Of The Woods Grammys', 'Out Of The Woods Grammys.mp3', 'released', 4, 1729, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(175, 'Perfect Have I Loved Acoustic Demo', 'Perfect Have I Loved Acoustic Demo.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(176, 'Picture To Burn', 'Picture To Burn.mp3', 'released', 5, 1698, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(177, 'Point Of View', 'Point Of View.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(178, 'R-E-V-E-N-G-E', 'R-E-V-E-N-G-E.mp3', 'unreleased', 0, 23, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(179, 'Riptide', 'Riptide.mp3', 'released', 6, 1796, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(180, 'Ronan', 'Ronan.mp3', 'unreleased', 0, 39, 'Ronan', 'https://i.imgur.com/BPAffst.jpg'),
(181, 'Santa Baby', 'Santa Baby.mp3', 'unreleased', 0, 4, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(182, 'Shake It Off Live', 'Shake It Off Live.mp3', 'released', 3, 1738, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(183, 'Speak Now Live', 'Speak Now Live.mp3', 'released', 0, 1707, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(184, 'Speak Now', 'Speak Now.mp3', 'released', 1, 1810, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(185, 'State Of Grace', 'State Of Grace.mp3', 'released', 6, 1770, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(186, 'Sugar', 'Sugar.mp3', 'unreleased', 0, 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(187, 'Superman', 'Superman.mp3', 'released', 2, 1775, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(188, 'Superstar', 'Superstar.mp3', 'released', 0, 1709, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(189, 'Teardrops On My Guitar', 'Teardrops On My Guitar.mp3', 'released', 3, 1700, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(190, 'That\'s Life', 'That\'s Life.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(191, 'Thats When', 'Thats When.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(192, 'The Best Day', 'The Best Day.mp3', 'released', 3, 1721, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(193, 'The Diary Of Me', 'The Diary Of Me.mp3', 'unreleased', 0, 11, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(194, 'The Moment I Knew', 'The Moment I Knew.mp3', 'released', 3, 1672, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(195, 'The Story Of Us', 'The Story Of Us.mp3', 'released', 4, 2056, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(196, 'Thirteen Blocks', 'Thirteen Blocks.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(197, 'This Is Really Happening', 'This Is Really Happening.mp3', 'unreleased', 0, 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(198, 'This Love Live', 'This Love Live.mp3', 'released', 1, 1714, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(199, 'Till Brad Pitt Comes Along', 'Till Brad Pitt Comes Along.mp3', 'unreleased', 0, 9, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(200, 'Tim McGraw Acoustic', 'Tim McGraw Acoustic.mp3', 'released', 2, 1765, 'Taylor Swift Acoustic', 'https://i.imgur.com/w0bksSN.jpg'),
(201, 'Tim Mcgraw', 'Tim Mcgraw.mp3', 'released', 1, 1790, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(202, 'Untouchable', 'Untouchable.mp3', 'released', 0, 1714, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(203, 'Wait For Me', 'Wait For Me.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(204, 'We Were Happy', 'We Were Happy.mp3', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(205, 'Welcome Distraction', 'Welcome Distraction.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(206, 'Welcome To New York', 'Welcome To New York.mp3', 'released', 3, 2026, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(207, 'What To Wear', 'What To Wear.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(208, 'Who I\'ve Always Been', 'Who I\'ve Always Been.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(209, 'Wildest Dreams Acoustic', 'Wildest Dreams Acoustic.mp3', 'released', 5, 1694, '1989 Acoustic', 'https://i.imgur.com/i1QDoZR.jpg'),
(210, 'Wildest Dreams Enchanted Live', 'Wildest Dreams Enchanted Live.mp3', 'released', 11, 2239, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(211, 'Enchanted Wildest Dreams', 'Wildest Dreams Enchanted Live.mp3', 'released', 11, 2239, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(212, 'Enchanted/Wildest Dreams Live', 'Wildest Dreams Enchanted Live.mp3', 'released', 11, 2239, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(213, 'Wildest Dreams', 'Wildest Dreams.mp3', 'released', 5, 1842, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(214, 'You Do', 'You Do.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(215, 'You Don\'t Have To Call Me', 'You Don\'t Have To Call Me.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(216, 'You\'re Not Sorry', 'You\'re Not Sorry.mp3', 'released', 5, 1788, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(217, 'Gracie Acoustic', 'Gracie Acoustic.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(218, 'Can I Go With You', 'Can I Go With You.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(219, 'We Are Coming Undone', 'We Are Coming Undone.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(220, 'Look At You Like That', 'Look At You Like That.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(221, 'Thinking About You', 'Thinking About You.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(222, 'Love Story', 'Love Story.mp3', 'released', 6, 1727, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(223, 'Red Demo', 'Red Demo.mp3', 'released', 0, 1821, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(224, 'Bette Davis Eyes Live', 'Bette Davis Eyes Live.mp3', 'released', 2, 1738, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(225, 'Ours', 'Ours.mp3', 'released', 7, 1750, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(226, 'Back To December Apologize Live', 'Back To December Apologize Live.mp3', 'released', 5, 1686, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(227, 'Hey Stephen', 'Hey Stephen.mp3', 'released', 0, 1792, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(228, 'I Know Places Live', 'I Know Places Live.mp3', 'released', 2, 1714, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(229, 'Last Kiss', 'Last Kiss.mp3', 'released', 3, 1834, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(230, 'Love Story ft. Def Leppard', 'Love Story ft. Def Leppard.mp3', 'unreleased', 0, 39, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(231, 'Just a Dream', 'Just a Dream.m4a', 'unreleased', 0, 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(232, 'I Almost Do', 'I Almost Do.mp3', 'released', 3, 1744, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(233, 'Baby Don\'t You Break My Heart Slow', 'Baby Don\'t You Break My Heart Slow.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(234, 'White Christmas', 'White Christmas.mp3', 'unreleased', 0, 3, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(235, 'Spinning Around', 'Spinning Around.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(236, 'Sweeter Than Fiction', 'Sweeter Than Fiction.mp3', 'released', 2, 1762, 'One Chance Soundtrack', 'https://i.imgur.com/zh7m1cn.jpg'),
(237, 'Christmases When You Were Mine', 'Christmases When You Were Mine.mp3', 'unreleased', 0, 7, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(238, 'Smokey Black Nights', 'Smokey Black Nights.mp3', 'unreleased', 0, 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(239, 'Thug Story', 'Thug Story.mp3', 'released', 5, 1899, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(240, 'Enchanted Wildest Dreams Tokyo', 'Enchanted Wildest Dreams Tokyo.mp3', 'unreleased', 0, 784, '1989 World Tour Tokyo', 'https://i.imgur.com/cVP4obR.jpg'),
(241, 'Welcome To New York Live', 'Welcome To New York Live.mp3', 'released', 4, 1912, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(242, 'Cold As You', 'Cold As You.mp3', 'released', 1, 1797, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(243, 'Two Is Better Than One', 'Two Is Better Than One.mp3', 'released', 2, 1639, 'Boys Like Girls - Feature', 'http://i.imgur.com/x0K7vjd.jpg'),
(244, 'Should\'ve Said No', 'Should\'ve Said No.mp3', 'released', 2, 1717, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(245, 'Enchanted', 'Enchanted.mp3', 'released', 4, 1787, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(246, 'Forever & Always', 'Forever & Always.mp3', 'released', 3, 1725, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(247, 'Crazier', 'Crazier.mp3', 'released', 1, 1748, 'Crazier Soundtrack', 'https://i.imgur.com/FEdhdtz.jpg'),
(248, 'Bad Blood Live', 'Bad Blood Live.mp3', 'released', 2, 1671, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(249, 'Treacherous Demo', 'Treacherous Demo.mp3', 'released', 0, 1688, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(250, 'Never Grow Up', 'Never Grow Up.mp3', 'released', 1, 1790, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(251, 'I\'m Every Woman', 'I\'m Every Woman.mp3', 'unreleased', 0, 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(252, 'Silent Night', 'Silent Night.mp3', 'unreleased', 0, 6, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(253, 'New Romantics Live', 'New Romantics Live.mp3', 'released', 2, 1728, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(254, 'Mine Pop Mix', 'Mine Pop Mix.mp3', 'released', 0, 1728, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(255, 'How You Get The Girl Live', 'How You Get The Girl Live.mp3', 'released', 6, 1751, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(256, 'Our Song', 'Our Song.mp3', 'released', 2, 1715, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(257, 'I\'m Only Me When I\'m With You', 'I\'m Only Me When I\'m With You.mp3', 'released', 4, 1733, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(258, 'The Other Side Of The Door', 'The Other Side Of The Door.mp3', 'released', 2, 1721, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(259, 'Fifteen', 'Fifteen.mp3', 'released', 5, 1787, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(260, 'Girl At Home', 'Girl At Home.mp3', 'released', 4, 1808, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(261, 'State Of Grace Acoustic', 'State Of Grace Acoustic.mp3', 'released', 1, 1717, 'Red Acoustic', 'http://i.imgur.com/as6dlgi.jpg'),
(262, 'Under My Head', 'Under My Head.mp3', 'unreleased', 0, 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(263, 'Two Steps Behind ft. Def Leppard', 'Two Steps Behind ft. Def Leppard.mp3', 'unreleased', 0, 30, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(264, 'I Knew You Were Trouble Live', 'I Knew You Were Trouble Live.mp3', 'released', 1, 2204, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(265, 'IKYWT Live', 'I Knew You Were Trouble Live.mp3', 'released', 1, 2204, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(266, 'IKYWT. Live', 'I Knew You Were Trouble Live.mp3', 'released', 1, 2204, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(267, 'Photograph ft. Def Leppard', 'Photograph ft. Def Leppard.mp3', 'unreleased', 0, 32, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(268, 'Run ft. Def Leppard', 'Run ft. Def Leppard.mp3', 'unreleased', 0, 39, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(269, 'Sparks Fly', 'Sparks Fly.mp3', 'released', 1, 1764, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(270, 'Better Than Revenge Live', 'Better Than Revenge Live.mp3', 'released', 1, 1730, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(271, 'Dark Blue Tennessee', 'Dark Blue Tennessee.mp3', 'unreleased', 0, 28, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(272, 'I Used To Fly', 'I Used To Fly.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(273, 'The Lucky One', 'The Lucky One.mp3', 'released', 3, 1707, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(274, 'White Horse', 'White Horse.mp3', 'released', 1, 1819, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(275, 'Never Mind Country', 'Never Mind Country.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(276, 'All You Had To Do Was Stay Live', 'All You Had To Do Was Stay Live.mp3', 'released', 3, 1630, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(277, 'I Wish You Would Live', 'I Wish You Would Live.mp3', 'released', 2, 1669, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(278, 'Ours Live', 'Ours Live.mp3', 'released', 1, 1764, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(279, 'Blank Space Live', 'Blank Space Live.mp3', 'released', 4, 1745, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(280, 'Long Live', 'Long Live.mp3', 'released', 7, 1787, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(281, 'Wildest Dreams R3hab', 'Wildest Dreams R3hab.mp3', 'released', 0, 1758, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(282, 'Writing Songs About You', 'Writing Songs About You.mp3', 'unreleased', 0, 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(283, 'You Are In Love Live', 'You Are In Love Live.mp3', 'released', 3, 1742, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(284, 'You Are In Love', 'You Are In Love.mp3', 'released', 3, 1793, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(286, 'IKYWT.', 'I Knew You Were Trouble..mp3', 'released', 10, 2286, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(287, 'TSOU', 'The Story Of Us.mp3', 'released', 4, 2056, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(288, 'TSOU Live', 'The Story Of Us Live.mp3', 'released', 5, 1934, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(289, 'WTNY', 'Welcome To New York.mp3', 'released', 3, 2026, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(290, 'WTNY Live', 'Welcome To New York Live.mp3', 'released', 4, 1912, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(291, 'Come Back Be Here', 'Come Back... Be Here.mp3', 'released', 6, 1955, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(292, 'Treacherous Acoustic Live', 'Treacherous Acoustic Live.m4a', 'released', 1, 1754, 'Red Acoustic', 'http://i.imgur.com/as6dlgi.jpg'),
(293, 'You All Over Me', 'You All Over Me.mp3', 'unreleased', 0, 14, 'Unreleased', 'https://i.imgur.com/EJDtG33.png'),
(294, 'Revenge', 'R-E-V-E-N-G-E.mp3', 'unreleased', 0, 23, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(295, 'Out Of The Woods Grammy Awards', 'Out of the Woods Grammy Awards.mp3', 'released', 3, 1782, 'Grammy Awards', 'https://i.imgur.com/i1QDoZR.jpg'),
(296, 'Fearless I\'m Yours Hey Soul Sister Live', 'Fearless I\'m Yours Hey Soul Sister Live.mp3', 'released', 5, 1843, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(297, 'Fearless I\'m Yours Live', 'Fearless I\'m Yours Hey Soul Sister Live.mp3', 'released', 5, 1843, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(298, 'Down Came The Rain', 'Down Came The Rain.mp3', 'unreleased', 0, 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(299, 'Fifteen Live', 'Fifteen Live.mp3', 'released', 4, 1652, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(300, 'Love Story SN Live', 'Love Story SN Live.mp3', 'released', 1, 1718, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(301, 'Mine Live', 'Mine Live.m4a', 'released', 4, 1765, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(302, 'Our Song Live', 'Our Song Live.mp3', 'released', 0, 1733, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(303, 'Sweet Escape Live', 'Sweet Escape Live.mp3', 'released', 0, 1726, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(304, 'You Belong With Me Live', 'You Belong With Me Live.mp3', 'released', 3, 1660, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(305, 'New Romantics SS Live', 'New Romantics SS Live.mp3', 'released', 3, 1681, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(306, 'IKYWT SS Live', 'I Knew You Were Trouble SS Live.mp3', 'released', 6, 1894, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(307, 'Blank Space SS Live', 'Blank Space SS Live.mp3', 'released', 3, 1723, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(308, 'I Knew You Were Trouble SS Live', 'I Knew You Were Trouble SS Live.mp3', 'released', 6, 1894, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(309, 'I Don\'t Wanna Live Forever SS Live', 'I Don\'t Wanna Live Forever SS Live.mp3', 'released', 7, 1878, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(310, 'IDWLF SS Live', 'I Don\'t Wanna Live Forever SS Live.mp3', 'released', 7, 1878, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(311, 'You Belong With Me SS Live', 'You Belong With Me SS Live.mp3', 'Released', 2, 1886, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(312, 'YBWM SS Live', 'You Belong With Me SS Live.mp3', 'Released', 2, 1886, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(313, 'RED SS Live', 'RED SS Live.mp3', 'Released', 0, 1668, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(314, 'All Too Well SS Live', 'All Too Well SS Live.mp3', 'Released', 2, 1711, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(315, 'Shake It Off SS Live', 'Shake It Off SS Live.mp3', 'Released', 2, 1821, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(316, 'SIO SS Live', 'Shake It Off SS Live.mp3', 'Released', 2, 1821, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(317, 'OOTW SS Live', 'Out Of The Woods SS Live.mp3', 'Released', 5, 1775, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(318, 'Out Of The Woods SS Live', 'Out Of The Woods SS Live.mp3', 'Released', 5, 1775, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(319, 'Bad Blood SS Live', 'Bad Blood SS Live.mp3', 'Released', 2, 1599, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(320, 'Look What You Made Me Do', 'Look What You Made Me Do.m4a', 'released', 6, 1660, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(322, 'Ready For It', 'Ready For It.m4a', 'released', 4, 1482, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(323, 'How You Get The Girl Grammys', 'How You Get The Girl Grammys.m4a', 'released', 1, 1414, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(324, 'LWYMMD', 'Look What You Made Me Do.m4a', 'released', 6, 1660, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(325, 'Gorgeous', 'Gorgeous.m4a', 'released', 3, 1401, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(326, 'Marys Song', 'Mary\'s Song Oh My My My.mp3', 'released', 7, 1941, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(327, 'Call It What You Want', 'Call It What You Want.m4a', 'released', 10, 1604, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(328, 'CIWYW', 'Call It What You Want.m4a', 'released', 10, 1604, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(330, 'End Game', 'End Game.mp3', 'released', 4, 1353, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(331, 'I Did Something Bad', 'I Did Something Bad.mp3', 'released', 5, 1337, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(332, 'Dont Blame Me', 'Dont Blame Me.mp3', 'released', 10, 1405, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(333, 'Delicate', 'Delicate.mp3', 'released', 6, 1451, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(334, 'So It Goes', 'So It Goes.mp3', 'released', 4, 1322, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(335, 'Getaway Car', 'Getaway Car.mp3', 'released', 7, 1454, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(336, 'King Of My Heart', 'King Of My Heart.mp3', 'released', 8, 1336, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(337, 'Dancing With Our Hands Tied', 'Dancing With Our Hands Tied.mp3', 'released', 4, 1304, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(338, 'Dress', 'Dress.mp3', 'released', 2, 1342, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(339, 'This Is Why We Cant Have Nice Things', 'This Is Why We Cant Have Nice Things.mp3', 'released', 2, 1316, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(340, 'New Years Day', 'New Years Day.mp3', 'released', 2, 1331, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(341, 'New Years Day Piano', 'New Years Day Piano.mp3', 'released', 2, 1347, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(343, 'Better Man SS Live', 'Better Man SS Live.mp3', 'released', 1, 1247, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(344, 'This Is What You Came For SS Live', 'This Is What You Came For SS Live.mp3', 'released', 4, 1407, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(345, 'TIWYCF SS Live', 'This Is What You Came For SS Live.mp3', 'released', 4, 1407, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(346, 'Run George Strait', 'Run George Strait.m4a', 'released', 3, 998, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(348, '22 Seine', '22 Seine.mp3', 'released', 3, 1044, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(349, 'I Knew You Were Trouble Seine', 'I Knew You Were Trouble Seine.mp3', 'released', 5, 1157, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(350, 'Love Story Seine', 'Love Story Seine.mp3', 'released', 5, 1070, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(351, 'Red Seine', 'Red Seine.mp3', 'released', 5, 1057, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(352, 'You Belong With Me Seine', 'You Belong With Me Seine.mp3', 'released', 2, 1032, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(353, 'IKYWT Seine', 'I Knew You Were Trouble Seine.mp3', 'released', 5, 1157, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(354, 'Delicate Remix', 'Delicate Remix.m4a', 'released', 1, 997, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(355, 'Ready for It BloodPop', 'Ready for It BloodPop.mp3', 'released', 4, 1018, 'reputation', 'https://i.imgur.com/xjWOsyQ.jpg'),
(356, 'Delicate Acoustic Spotify', 'Delicate Acoustic Spotify.mp3', 'released', 4, 998, 'reputation', 'https://i.imgur.com/xjWOsyQ.jpg'),
(357, 'September Acoustic Spotify', 'September Acoustic Spotify.mp3', 'released', 3, 1034, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(358, 'New Years Day Piano SXM', 'New Years Day Piano SXM.mp3', 'released', 4, 1000, 'reputation Celebration', 'https://i.imgur.com/o2v3b7E.jpg'),
(359, 'Call It What You Want Acoustic SXM', 'Call It What You Want Acoustic SXM.mp3', 'released', 2, 1066, 'reputation Celebration', 'https://i.imgur.com/o2v3b7E.jpg'),
(360, 'American Girl Piano SXM', 'American Girl Piano SXM.mp3', 'released', 1, 1004, 'reputation Celebration', 'https://i.imgur.com/Yv6xiKL.jpg'),
(361, 'We Are Never Ever Getting Back Together Country Mix', 'We Are Never Ever Getting Back Together Country Mix.mp3', 'released', 6, 1162, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(362, 'WANEGBT Country Mix', 'We Are Never Ever Getting Back Together Country Mix.mp3', 'released', 6, 1162, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(363, 'Delicate Seeb Remix', 'Delicate Seeb Remix.mp3', 'released', 3, 1127, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(364, 'Delicate Seeb', 'Delicate Seeb Remix.mp3', 'released', 3, 1127, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(365, 'Let\'s Go', 'Let\'s Go.mp3', 'unreleased', 0, 51, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(366, 'Ready For It rep Live', 'Ready For It rep Live.m4a', 'released', 3, 765, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(367, 'RFI rep Live', 'Ready For It rep Live.m4a', 'released', 3, 765, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(368, 'All Too Well rep Live', 'All Too Well rep Live.m4a', 'released', 6, 757, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(369, 'ATW rep Live', 'All Too Well rep Live.m4a', 'released', 6, 757, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(370, 'Bad Blood Should\'ve Said No rep Live', 'Bad Blood Should\'ve Said No rep Live.m4a', 'released', 1, 641, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(371, 'Blank Space rep Live', 'Blank Space rep Live.m4a', 'released', 2, 572, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(372, 'Call It What You Want rep Live', 'Call It What You Want rep Live.m4a', 'released', 8, 832, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(373, 'CIWYW rep Live', 'Call It What You Want rep Live.m4a', 'released', 8, 832, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(374, 'Dancing With Our Hands Tied rep Live', 'Dancing With Our Hands Tied rep Live.m4a', 'released', 3, 816, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(375, 'DWOHT rep Live', 'Dancing With Our Hands Tied rep Live.m4a', 'released', 3, 816, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(376, 'Delicate rep Live', 'Delicate rep Live.m4a', 'released', 2, 554, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(377, 'Don\'t Blame Me rep Live', 'Don\'t Blame Me rep Live.m4a', 'released', 7, 558, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(378, 'Dress rep Live', 'Dress rep Live.m4a', 'released', 2, 584, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(379, 'End Game rep Live', 'End Game rep Live.m4a', 'released', 0, 576, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(380, 'Getaway Car rep Live', 'Getaway Car rep Live.m4a', 'released', 3, 609, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(381, 'Gorgeous rep Live', 'Gorgeous rep Live.m4a', 'released', 2, 610, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(382, 'I Did Something Bad rep Live', 'I Did Something Bad rep Live.m4a', 'released', 7, 824, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(383, 'IDSB rep Live', 'I Did Something Bad rep Live.m4a', 'released', 7, 824, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(384, 'King of My Heart rep Live', 'King of My Heart rep Live.m4a', 'released', 7, 741, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(385, 'KOMH rep Live', 'King of My Heart rep Live.m4a', 'released', 7, 741, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(386, 'Long Live New Year\'s Day rep Live', 'Long Live New Year\'s Day rep Live.m4a', 'released', 5, 776, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(387, 'Long Live NYD rep Live', 'Long Live New Year\'s Day rep Live.m4a', 'released', 5, 776, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(388, 'Look What You Made Me Do Intro rep Live', 'Look What You Made Me Do Intro rep Live.m4a', 'released', 6, 739, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(389, 'LWYMMD Intro rep Live', 'Look What You Made Me Do Intro rep Live.m4a', 'released', 6, 739, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(390, 'Look What You Made Me Do rep Live', 'Look What You Made Me Do rep Live.m4a', 'released', 2, 830, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(391, 'LWYMMD rep Live', 'Look What You Made Me Do rep Live.m4a', 'released', 2, 830, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(392, 'reputation Intro rep Live', 'reputation Intro rep Live.m4a', 'released', 2, 571, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(393, 'Shake It Off rep Live', 'Shake It Off rep Live.m4a', 'released', 4, 592, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(394, 'So It Goes rep Live', 'So It Goes rep Live.m4a', 'released', 3, 606, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(395, 'Style Love Story You Belong With Me rep Live', 'Style Love Story You Belong With Me rep Live.m4a', 'released', 2, 589, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(396, 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live', 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live.m4a', 'released', 2, 800, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(397, 'WANEGBT TIWWCHNT rep Live', 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live.m4a', 'released', 2, 800, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(398, 'Why She Disappeared rep Live', 'Why She Disappeared rep Live.m4a', 'released', 2, 607, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(399, 'Holy Ground F1 Live', 'Holy Ground F1 Live.mp3', 'released', 1, 568, 'COTA Formula 1 Austin', 'https://i.imgur.com/9rBYl44.jpg'),
(400, 'ME!', 'ME!.m4a', 'released', 7, 621, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(401, 'You Need To Calm Down', 'You Need To Calm Down.m4a', 'released', 3, 518, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(402, 'The Archer', 'The Archer.m4a', 'released', 2, 468, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(403, 'Lover', 'Lover.m4a', 'released', 5, 414, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(404, 'I Forgot That You Existed', 'I Forgot That You Existed.m4a', 'released', 2, 372, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(405, 'Cruel Summer', 'Cruel Summer.m4a', 'released', 3, 426, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg');
INSERT INTO `music` (`id`, `name`, `path`, `type`, `playcount`, `oldplaycount`, `album`, `albumart`) VALUES
(406, 'The Man', 'The Man.m4a', 'released', 1, 357, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(407, 'I Think He Knows', 'I Think He Knows.m4a', 'released', 4, 384, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(408, 'Miss Americana & The Heartbreak Prince', 'Miss Americana & The Heartbreak Prince.m4a', 'released', 3, 368, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(409, 'Paper Rings', 'Paper Rings.m4a', 'released', 2, 389, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(410, 'Cornelia Street', 'Cornelia Street.m4a', 'released', 1, 407, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(411, 'Death By A Thousand Cuts', 'Death By A Thousand Cuts.m4a', 'released', 5, 364, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(412, 'London Boy', 'London Boy.m4a', 'released', 4, 401, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(413, 'Soon You\'ll Get Better', 'Soon You\'ll Get Better.m4a', 'released', 3, 333, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(414, 'False God', 'False God.m4a', 'released', 3, 386, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(415, 'Afterglow', 'Afterglow.m4a', 'released', 5, 449, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(416, 'It\'s Nice To Have A Friend', 'It\'s Nice To Have A Friend.m4a', 'released', 2, 416, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(417, 'Daylight', 'Daylight.m4a', 'released', 4, 371, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(418, 'The Archer SXM Live', 'The Archer Acoustic SXM Live.mp3', 'released', 0, 367, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(419, 'You Need To Calm Down SXM Live', 'You Need To Calm Down Acoustic SXM Live.mp3', 'released', 4, 338, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(420, 'Daylight SXM Live', 'Daylight Piano SXM Live.mp3', 'released', 1, 353, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(421, 'Beautiful Ghosts', 'Beautiful Ghosts.m4a', 'released', 1, 237, 'Cats Soundtrack', 'https://m.media-amazon.com/images/I/611hhvdmJEL._SS500_.jpg'),
(422, 'Babe', 'Babe.mp3', 'released', 2, 261, 'Bigger - Feature', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Sugarland_Babe.png'),
(423, 'Christmas Tree Farm', 'Christmas Tree Farm.mp3', 'released', 4, 272, 'Christmas Tree Farm', 'https://i.imgur.com/Mf8wn2Q.jpg'),
(439, 'Only The Young', 'Only The Young.m4a', 'released', 6, 169, 'Only The Young', 'https://upload.wikimedia.org/wikipedia/en/6/69/Taylor_Swift_-_Only_the_Young.png'),
(440, 'False God SNL Live', 'False God SNL Live.mp3', 'released', 4, 161, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(441, 'Lover SNL Live', 'Lover SNL Live.mp3', 'released', 1, 172, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(442, 'The Man AMA Live', 'The Man AMA Live.mp3', 'released', 2, 181, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(443, 'Lover AMA Live', 'Lover AMA Live.mp3', 'released', 5, 160, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(444, 'Love Story AMA Live', 'Love Story AMA Live.mp3', 'released', 1, 178, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(445, 'I Knew You Were Trouble AMA Live', 'I Knew You Were Trouble AMA Live.mp3', 'released', 0, 162, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(446, 'Blank Space Shake It Off AMA Live', 'Blank Space Shake It Off AMA Live.mp3', 'released', 3, 180, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(447, 'Can\'t Stop Loving You BBC Live', 'Can\'t Stop Loving You BBC Live.mp3', 'released', 1, 172, 'Cover', 'https://i.imgur.com/Yv6xiKL.jpg'),
(448, 'London Boy BBC Live', 'London Boy BBC Live.mp3', 'released', 2, 154, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(449, 'Lover BBC Live', 'Lover BBC Live.mp3', 'released', 3, 185, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(450, 'The Archer BBC Live', 'The Archer BBC Live.mp3', 'released', 1, 162, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(451, 'You Need To Calm Down BBC Live', 'You Need To Calm Down BBC Live.mp3', 'released', 5, 181, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(452, 'Holy Ground BBC Live', 'Holy Ground BBC Live.mp3', 'released', 3, 162, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(453, 'The Man NPR Live', 'The Man NPR Live.mp3', 'released', 5, 157, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(454, 'Lover NPR Live', 'Lover NPR Live.mp3', 'released', 2, 156, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(455, 'Death by a Thousand Cuts NPR Live', 'Death by a Thousand Cuts NPR Live.mp3', 'released', 4, 193, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(456, 'All Too Well NPR Live', 'All Too Well NPR Live.mp3', 'released', 2, 168, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(457, 'Green Light', '/melo/Green Light.mp3', 'unreleased', 0, 10, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(458, 'Sober', '/melo/Sober.mp3', 'unreleased', 0, 7, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(459, 'Homemade Dynamite', '/melo/Homemade Dynamite.mp3', 'unreleased', 0, 4, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(460, 'The Louvre', '/melo/The Louvre.mp3', 'unreleased', 1, 8, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(461, 'Liability', '/melo/Liability.mp3', 'unreleased', 0, 9, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(462, 'Hard Feelings-Loveless', '/melo/Hard Feelings-Loveless.mp3', 'unreleased', 0, 8, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(463, 'Sober II', '/melo/Sober II (Melodrama).mp3', 'unreleased', 0, 5, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(464, 'Writer In the Dark', '/melo/Writer In the Dark.mp3', 'unreleased', 0, 5, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(465, 'Supercut', '/melo/Supercut.mp3', 'unreleased', 0, 4, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(466, 'Liability (Reprise)', '/melo/Liability (Reprise).mp3', 'unreleased', 0, 5, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(467, 'Perfect Places', '/melo/Perfect Places.mp3', 'unreleased', 0, 10, 'Lorde: Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(469, 'Afterglow Karaoke', 'LoverKaraoke/Afterglow Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(470, 'Cornelia Street Karaoke', 'LoverKaraoke/Cornelia Street Karaoke.mp3', 'unreleased', 0, 1, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(471, 'Cruel Summer Karaoke', 'LoverKaraoke/Cruel Summer Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(472, 'Daylight Karaoke', 'LoverKaraoke/Daylight Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(473, 'Death By A Thousand Cuts Karaoke', 'LoverKaraoke/Death By A Thousand Cuts Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(474, 'False God Karaoke', 'LoverKaraoke/False God Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(475, 'I Forgot That You Existed Karaoke', 'LoverKaraoke/I Forgot That You Existed Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(476, 'I Think He Knows Karaoke', 'LoverKaraoke/I Think He Knows Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(477, 'It’s Nice To Have A Friend Karaoke', 'LoverKaraoke/It’s Nice To Have A Friend Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(478, 'London Boy Karaoke', 'LoverKaraoke/London Boy Karaoke.mp3', 'unreleased', 0, 1, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(479, 'Lover Remix Karaoke', 'LoverKaraoke/Lover (Remix) Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(480, 'Lover Karaoke', 'LoverKaraoke/Lover Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(481, 'ME! Karaoke', 'LoverKaraoke/ME! Karaoke.mp3', 'unreleased', 0, 2, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(482, 'Miss Americana & The Heartbreak Prince Karaoke', 'LoverKaraoke/Miss Americana & The Heartbreak Prince Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(483, 'Paper Rings Karaoke', 'LoverKaraoke/Paper Rings Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(484, 'Soon You’ll Get Better Karaoke', 'LoverKaraoke/Soon You’ll Get Better Karaoke.mp3', 'unreleased', 0, 1, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(485, 'The Archer Karaoke', 'LoverKaraoke/The Archer Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(486, 'The Man Karaoke', 'LoverKaraoke/The Man Karaoke.mp3', 'unreleased', 0, 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(487, 'You Need To Calm Down Karaoke', 'LoverKaraoke/You Need To Calm Down Karaoke.mp3', 'unreleased', 0, 1, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(488, 'Moonlight', '/DangerousWoman/Moonlight.mp3', 'unreleased', 0, 5, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(489, 'Dangerous Woman', '/DangerousWoman/Dangerous Woman.mp3', 'unreleased', 0, 9, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(490, 'Be Alright', '/DangerousWoman/Be Alright.mp3', 'unreleased', 0, 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(491, 'Into You', '/DangerousWoman/Into You.mp3', 'unreleased', 0, 9, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(492, 'Side To Side', '/DangerousWoman/Side To Side.mp3', 'unreleased', 0, 9, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(493, 'Let Me Love You', '/DangerousWoman/Let Me Love You.mp3', 'unreleased', 0, 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(494, 'Greedy', '/DangerousWoman/Greedy.mp3', 'unreleased', 0, 14, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(495, 'Leave Me Lonely', '/DangerousWoman/Leave Me Lonely.mp3', 'unreleased', 0, 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(496, 'Everyday', '/DangerousWoman/Everyday.mp3', 'unreleased', 0, 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(497, 'Sometimes', '/DangerousWoman/Sometimes.mp3', 'unreleased', 0, 3, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(498, 'I Don\'t Care', '/DangerousWoman/I Don\'t Care.mp3', 'unreleased', 0, 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(499, 'Bad Decisions', '/DangerousWoman/Bad Decisions.mp3', 'unreleased', 0, 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(500, 'Touch It', '/DangerousWoman/Touch It.mp3', 'unreleased', 0, 3, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(501, 'Knew Better Forever Boy', '/DangerousWoman/Knew Better Forever Boy.mp3', 'unreleased', 0, 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(502, 'Thinking Bout You', '/DangerousWoman/Thinking Bout You.mp3', 'unreleased', 0, 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(503, 'American Kids', '/LydiaThrowbacks/American Kids.mp3', 'unreleased', 0, 1, 'Throwbacks - Kenny Chesney: The Big Revival', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(504, 'To Zion', '/LydiaThrowbacks/To Zion.mp3', 'unreleased', 0, 1, 'Throwbacks - Ms. Lauryn Hill, Carlos Santana: The Miseducation of Lauryn Hill', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(505, 'In Da Club', '/LydiaThrowbacks/In Da Club.mp3', 'unreleased', 0, 1, 'Throwbacks - 50 Cent: Get Rich Or Die Tryin', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(506, 'Lips of an Angel', '/LydiaThrowbacks/Lips of an Angel.mp3', 'unreleased', 0, 2, 'Throwbacks - Hinder: Extreme Behavior', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(507, 'Airplanes', '/LydiaThrowbacks/Airplanes.mp3', 'unreleased', 0, 3, 'Throwbacks - B.o.B, Hayley Williams: B.o.B Presents: The Adventures of Bobby Ray', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(508, 'When Can I See You Again', '/LydiaThrowbacks/When Can I See You Again.mp3', 'unreleased', 0, 1, 'Throwbacks - Owl City: Wreck-It Ralph Soundtrack', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(509, 'Valerie', '/LydiaThrowbacks/Valerie.mp3', 'unreleased', 0, 1, 'Throwbacks - Amy Winehouse: Lioness: Hidden Treasures', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(510, 'Smooth', '/LydiaThrowbacks/Smooth.mp3', 'unreleased', 0, 6, 'Throwbacks - Santana, Rob Thomas: Supernatural', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(511, 'Unwritten', '/LydiaThrowbacks/Unwritten.mp3', 'unreleased', 0, 4, 'Throwbacks - Natasha Bedingfield: Unwritten', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(512, 'Torn', '/LydiaThrowbacks/Torn.mp3', 'unreleased', 0, 10, 'Throwbacks - Natalie Imbruglia: Left of the Middle', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(513, 'Paradise', '/LydiaThrowbacks/Paradise.mp3', 'unreleased', 0, 2, 'Throwbacks - Coldplay: Mylo Xyloto', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(514, 'Angels On The Moon', '/LydiaThrowbacks/Angels On The Moon.mp3', 'unreleased', 0, 1, 'Throwbacks - Thriving Ivory: Thriving Ivory', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(515, 'Get Back', '/LydiaThrowbacks/Get Back.mp3', 'unreleased', 0, 1, 'Throwbacks - Demi Lovato: Don\'t Forget', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(516, 'Take Me Home Country Roads', '/LydiaThrowbacks/Take Me Home Country Roads.mp3', 'unreleased', 0, 5, 'Throwbacks - John Denver: The John Denver Collection', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(517, 'Walking On A Dream', '/LydiaThrowbacks/Walking On A Dream.mp3', 'unreleased', 0, 1, 'Throwbacks - Empire of the Sun: Walking On A Dream', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(518, 'Oh No!', '/LydiaThrowbacks/Oh No!.mp3', 'unreleased', 0, 2, 'Throwbacks - MARINA: The Family Jewels', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(519, 'La La La', '/LydiaThrowbacks/La La La.mp3', 'unreleased', 0, 1, 'Throwbacks - LMFAO: Party Rock', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(520, 'Chandelier', '/LydiaThrowbacks/Chandelier.mp3', 'unreleased', 0, 1, 'Throwbacks - Sia: 1000 Forms of Fear', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(521, 'august', 'folklore/august.mp3', 'released', 7, 137, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(522, 'betty', 'folklore/betty.mp3', 'released', 8, 107, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(523, 'cardigan', 'folklore/cardigan.mp3', 'released', 4, 123, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(524, 'epiphany', 'folklore/epiphany.mp3', 'released', 6, 79, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(525, 'exile', 'folklore/exile.mp3', 'released', 1, 119, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(526, 'hoax', 'folklore/hoax.mp3', 'released', 5, 87, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(527, 'illicit affairs', 'folklore/illicit affairs.mp3', 'released', 7, 102, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(528, 'invisible string', 'folklore/invisible string.mp3', 'released', 3, 103, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(529, 'mad woman', 'folklore/mad woman.mp3', 'released', 1, 90, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(530, 'mirrorball', 'folklore/mirrorball.mp3', 'released', 2, 87, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(531, 'my tears ricochet', 'folklore/my tears ricochet.mp3', 'released', 5, 108, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(532, 'peace', 'folklore/peace.mp3', 'released', 1, 86, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(533, 'seven', 'folklore/seven.mp3', 'released', 3, 80, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(534, 'the 1', 'folklore/the 1.mp3', 'released', 1, 99, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(535, 'the lakes', 'folklore/the lakes.mp3', 'released', 2, 97, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(536, 'the last great american dynasty', 'folklore/the last great american dynasty.mp3', 'released', 3, 105, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(537, 'this is me trying', 'folklore/this is me trying.mp3', 'released', 3, 85, 'folklore', 'https://i.imgur.com/oZvDEky.jpg'),
(538, 'Don\'t Stop', 'Rumours/Don\'t Stop.mp3', 'unreleased', 0, 1, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(539, 'Dreams', 'Rumours/Dreams.mp3', 'unreleased', 0, 3, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(540, 'Go Your Own Way', 'Rumours/Go Your Own Way.mp3', 'unreleased', 0, 1, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(541, 'Gold Dust Woman', 'Rumours/Gold Dust Woman.mp3', 'unreleased', 0, 1, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(542, 'I Don\'t Want to Know', 'Rumours/I Don\'t Want to Know.mp3', 'unreleased', 0, 2, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(543, 'Never Going Back Again', 'Rumours/Never Going Back Again.mp3', 'unreleased', 0, 1, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(544, 'Oh Daddy', 'Rumours/Oh Daddy.mp3', 'unreleased', 0, 2, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(545, 'Second Hand News', 'Rumours/Second Hand News.mp3', 'unreleased', 0, 3, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(546, 'Songbird', 'Rumours/Songbird.mp3', 'unreleased', 0, 1, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(547, 'The Chain', 'Rumours/The Chain.mp3', 'unreleased', 0, 2, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(548, 'You Make Loving Fun', 'Rumours/You Make Loving Fun.mp3', 'unreleased', 0, 2, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(549, 'Silver Springs', 'Rumours/Silver Springs.mp3', 'unreleased', 0, 3, 'Fleetwood Mac - Rumours', 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(550, 'Tennis Court', 'PureHeroine/Tennis Court.mp3', 'unreleased', 0, 6, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(551, '400 Lux', 'PureHeroine/400 Lux.mp3', 'unreleased', 0, 2, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(552, 'Royals', 'PureHeroine/Royals.mp3', 'unreleased', 0, 2, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(553, 'Ribs', 'PureHeroine/Ribs.mp3', 'unreleased', 0, 2, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(554, 'Buzzcut Season', 'PureHeroine/Buzzcut Season.mp3', 'unreleased', 0, 2, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(555, 'Team', 'PureHeroine/Team.mp3', 'unreleased', 1, 7, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(556, 'Glory and Gore', 'PureHeroine/Glory and Gore.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(557, 'Still Sane', 'PureHeroine/Still Sane.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(558, 'White Teeth Teens', 'PureHeroine/White Teeth Teens.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(559, 'A World Alone', 'PureHeroine/A World Alone.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(560, 'No Better', 'PureHeroine/No Better.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(561, 'Bravado', 'PureHeroine/Bravado.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(562, 'Million Dollar Bills', 'PureHeroine/Million Dollar Bills.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(563, 'The Love Club', 'PureHeroine/The Love Club.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(564, 'Biting Down', 'PureHeroine/Biting Down.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(565, 'Swingin Party', 'PureHeroine/Swingin Party.mp3', 'unreleased', 0, 1, 'Lorde: Pure Heroine', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lorde_Pure_Heroine.png'),
(566, 'Chiquitita', 'Abba/Chiquitita.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(567, 'Dancing Queen', 'Abba/Dancing Queen.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(568, 'Does Your Mother Know', 'Abba/Does Your Mother Know.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(569, 'Fernando', 'Abba/Fernando.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(570, 'Gimme Gimme Gimme A Man After Midnight', 'Abba/Gimme Gimme Gimme A Man After Midnight.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(571, 'I Have A Dream', 'Abba/I Have A Dream.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(572, 'Knowing Me Knowing You', 'Abba/Knowing Me Knowing You.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(573, 'Lay All Your Love On Me', 'Abba/Lay All Your Love On Me.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(574, 'Mamma Mia', 'Abba/Mamma Mia.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(575, 'Money Money Money', 'Abba/Money Money Money.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(576, 'One Of Us', 'Abba/One Of Us.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(577, 'S.O.S.', 'Abba/S.O.S..mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(578, 'Super Trouper', 'Abba/Super Trouper.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(579, 'Take A Chance On Me', 'Abba/Take A Chance On Me.mp3', 'unreleased', 0, 2, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(580, 'Thank You For The Music', 'Abba/Thank You For The Music.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(581, 'The Name Of The Game', 'Abba/The Name Of The Game.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(582, 'The Winner Takes It All', 'Abba/The Winner Takes It All.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(583, 'Voulez Vous', 'Abba/Voulez Vous.mp3', 'unreleased', 0, 1, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(584, 'Waterloo', 'Abba/Waterloo.mp3', 'unreleased', 0, 3, 'ABBA Gold: Greatest Hits', 'https://upload.wikimedia.org/wikipedia/en/3/30/ABBA_Gold_cover.png'),
(585, 'That\'s Why God Made The Radio', 'BeachBoys/That\'s Why God Made The Radio.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(586, 'California Girls', 'BeachBoys/California Girls.mp3', 'unreleased', 0, 2, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(587, 'Sloop John B', 'BeachBoys/Sloop John B.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(588, 'Wouldn\'t It Be Nice', 'BeachBoys/Wouldn\'t It Be Nice.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(589, 'Surfer Girl', 'BeachBoys/Surfer Girl.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(590, 'Do It Again', 'BeachBoys/Do It Again.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(591, 'Surfin\' Safari', 'BeachBoys/Surfin\' Safari.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(592, 'Surfin\' USA', 'BeachBoys/Surfin\' USA.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(593, 'Don\'t Worry Baby', 'BeachBoys/Don\'t Worry Baby.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(594, 'Little Deuce Coupe', 'BeachBoys/Little Deuce Coupe.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(595, 'I Get Around', 'BeachBoys/I Get Around.mp3', 'unreleased', 0, 2, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(596, 'Fun, Fun, Fun', 'BeachBoys/Fun, Fun, Fun.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(597, 'Be True To Your School', 'BeachBoys/Be True To Your School.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(598, 'Dance, Dance, Dance', 'BeachBoys/Dance, Dance, Dance.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(599, 'All Summer Long', 'BeachBoys/All Summer Long.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(600, 'Help Me, Rhonda', 'BeachBoys/Help Me, Rhonda.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(601, 'Rock And Roll Music', 'BeachBoys/Rock And Roll Music.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(602, 'God Only Knows', 'BeachBoys/God Only Knows.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(603, 'Good Vibrations', 'BeachBoys/Good Vibrations.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(604, 'Kokomo', 'BeachBoys/Kokomo.mp3', 'unreleased', 0, 1, 'The Beach Boys - Greatest Hits', 'https://i.imgur.com/hfWzP7H.png'),
(605, 'Begin Again Instrumental', 'QuietCalmArt/Begin Again Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(606, 'betty All Too Well Cornelia Street Mashup', 'QuietCalmArt/betty All Too Well Cornelia Street Mashup.mp3', 'unreleased', 0, 17, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(607, 'Clean Instrumental', 'QuietCalmArt/Clean Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(608, 'Death by a Thousand Cuts Instrumental', 'QuietCalmArt/Death by a Thousand Cuts Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(609, 'Enchanted Instrumental', 'QuietCalmArt/Enchanted Instrumental.mp3', 'unreleased', 0, 4, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(610, 'Fearless Instrumental', 'QuietCalmArt/Fearless Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(611, 'Getaway Car Instrumental', 'QuietCalmArt/Getaway Car Instrumental.mp3', 'unreleased', 0, 6, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(612, 'Holy Ground Instrumental', 'QuietCalmArt/Holy Ground Instrumental.mp3', 'unreleased', 1, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(613, 'How You Get the Girl Instrumental', 'QuietCalmArt/How You Get the Girl Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(614, 'I Dont Wanna Live Forever Instrumental', 'QuietCalmArt/I Dont Wanna Live Forever Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(615, 'King of My Heart Cornelia Street Mashup', 'QuietCalmArt/King of My Heart Cornelia Street Mashup.mp3', 'unreleased', 0, 4, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(616, 'Look What You Made Me Do Instrumental', 'QuietCalmArt/Look What You Made Me Do Instrumental.mp3', 'unreleased', 0, 0, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(617, 'Lover Instrumental', 'QuietCalmArt/Lover Instrumental.mp3', 'unreleased', 0, 4, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(618, 'Miss Americana and the Heartbreak Prince So It Goes Mashup', 'QuietCalmArt/Miss Americana and the Heartbreak Prince So It Goes Mashup.mp3', 'unreleased', 0, 2, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(619, 'Only the Young Instrumental', 'QuietCalmArt/Only the Young Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(620, 'Sparks Fly Instrumental', 'QuietCalmArt/Sparks Fly Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(621, 'State of Grace Instrumental', 'QuietCalmArt/State of Grace Instrumental.mp3', 'unreleased', 0, 5, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(622, 'Style Instrumental', 'QuietCalmArt/Style Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(623, 'The Last Time Instrumental', 'QuietCalmArt/The Last Time Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(624, 'The Story of Us Instrumental', 'QuietCalmArt/The Story of Us Instrumental.mp3', 'unreleased', 0, 0, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(625, 'Today Was A Fairytale Instrumental', 'QuietCalmArt/Today Was A Fairytale Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(626, 'Treacherous Instrumental', 'QuietCalmArt/Treacherous Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(627, 'Wildest Dreams Ready For It Mashup', 'QuietCalmArt/Wildest Dreams Ready For It Mashup.mp3', 'unreleased', 0, 5, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(628, 'You Are in Love Call It What You Want Mashup', 'QuietCalmArt/You Are in Love Call It What You Want Mashup.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(629, 'You Need To Calm Down Instrumental', 'QuietCalmArt/You Need To Calm Down Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(630, 'Mariners Apartment Complex', 'QuietCalmArt/Mariners Apartment Complex.mp3', 'unreleased', 0, 4, 'Lana Del Rey - Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(631, 'Landslide', 'QuietCalmArt/Landslide.mp3', 'unreleased', 0, 4, 'Fleetwood Mac - Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(632, 'Fallingwater', 'QuietCalmArt/Fallingwater.mp3', 'unreleased', 0, 1, 'Maggie Rogers - Quiet Calm Art', 'https://i.imgur.com/C95l6oE.jpeg'),
(633, 'Barnyard Song', 'Unreleased/Barnyard Song.mp3', 'unreleased', 0, 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(634, 'Running With The Wild Things', 'InOurBones/Running With The Wild Things.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(635, 'Forget Me Now', 'InOurBones/Forget Me Now.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(636, 'Chasing Ghosts', 'InOurBones/Chasing Ghosts.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(637, 'One More Weekend', 'InOurBones/One More Weekend.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(638, 'In Our Bones', 'InOurBones/In Our Bones.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(639, 'Young & Relentless', 'InOurBones/Young & Relentless.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(640, 'Runaway', 'InOurBones/Runaway.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(641, 'Brighter', 'InOurBones/Brighter.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(642, 'Wasteland', 'InOurBones/Wasteland.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(643, 'Blood Like Gasoline', 'InOurBones/Blood Like Gasoline.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(644, 'Roses', 'InOurBones/Roses.mp3', 'unreleased', 0, 2, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(645, 'Demons', 'InOurBones/Demons.mp3', 'unreleased', 0, 3, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(646, 'Steal The Night', 'InOurBones/Steal The Night.mp3', 'unreleased', 0, 1, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(647, 'Zombie', 'InOurBones/Zombie.mp3', 'unreleased', 0, 2, 'Against The Current: In Our Bones', 'https://upload.wikimedia.org/wikipedia/en/1/1e/ATC_In_Our_Bones.jpg'),
(648, 'Aint Nothing Bout You', 'Covers/Aint Nothing Bout You.mp3', 'released', 1, 50, 'Covers - Brooks & Dunn', 'https://i.imgur.com/Yv6xiKL.jpg'),
(649, 'Drive', 'Covers/Drive.mp3', 'released', 7, 42, 'Covers - Alan Jackson', 'https://i.imgur.com/Yv6xiKL.jpg'),
(650, 'all that i see', 'SummerFallout/all that i see.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(651, 'for my muse', 'SummerFallout/for my muse.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(652, 'i guess we\'re ready', 'SummerFallout/i guess we\'re ready.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(653, 'i kept my promise', 'SummerFallout/i kept my promise.mp3', 'unreleased', 0, 3, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(654, 'i might forgive you one day', 'SummerFallout/i might forgive you one day.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(655, 'i really wanna try with you', 'SummerFallout/i really wanna try with you.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(656, 'left a part of you there', 'SummerFallout/left a part of you there.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(657, 'our secret moments in a crowded room', 'SummerFallout/our secret moments in a crowded room.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(658, 'really true', 'SummerFallout/really true.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(659, 'save me your prayers father walks', 'SummerFallout/save me your prayers father walks.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(660, 'summer fallout', 'SummerFallout/summer fallout.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(661, 'the games of the weekend', 'SummerFallout/the games of the weekend.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(662, 'the time we spent', 'SummerFallout/the time we spent.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(663, 'unconditional love', 'SummerFallout/unconditional love.mp3', 'unreleased', 0, 2, 'Summer Fallout', 'https://i.imgur.com/BUP1iS9.png'),
(664, 'Out of Love', 'QuietCalmArt2/Alessia Cara - Out of Love.mp3', 'unreleased', 0, 1, 'Alessia Cara - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(665, 'Monster Mash', 'QuietCalmArt2/Bobby Pickett - Monster Mash.mp3', 'unreleased', 0, 1, 'Bobby Pickett - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(666, 'Falling Asleep At The Wheel', 'QuietCalmArt2/Holly Humberstone - Falling Asleep At The Wheel.mp3', 'unreleased', 0, 1, 'Holly Humberstone - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(667, 'Peacock', 'QuietCalmArt2/Katy Perry - Peacock.mp3', 'unreleased', 0, 1, 'Katy Perry - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(668, 'Thriller', 'QuietCalmArt2/Michael Jackson - Thriller.mp3', 'unreleased', 0, 1, 'Michael Jackson - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(669, 'Saturn', 'QuietCalmArt2/Sleeping at Last - Saturn.mp3', 'unreleased', 0, 2, 'Sleeping at Last - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(670, 'Sandalwood I.mp3', 'QuietCalmArt2/Jonny Greenwood - Sandalwood I.mp3', 'unreleased', 0, 2, 'Jonny Greenwood - Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(671, '22 Instrumental', 'QuietCalmArt2/22 Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(672, 'All You Had to Do Was Stay Instrumental', 'QuietCalmArt2/All You Had to Do Was Stay Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(673, 'Call It What You Want Instrumental', 'QuietCalmArt2/Call It What You Want Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(674, 'Cruel Summer Instrumental', 'QuietCalmArt2/Cruel Summer Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(675, 'Enchanted Instrumental', 'QuietCalmArt2/Enchanted Instrumental.mp3', 'unreleased', 0, 0, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(676, 'GhostBusters Theme', 'QuietCalmArt2/GhostBusters Theme.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(677, 'I Forgot That You Existed Instrumental', 'QuietCalmArt2/I Forgot That You Existed Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(678, 'I Knew You Were Trouble Instrumental', 'QuietCalmArt2/I Knew You Were Trouble Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(679, 'Love Story Instrumental', 'QuietCalmArt2/Love Story Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(680, 'Mine Instrumental', 'QuietCalmArt2/Mine Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(681, 'Miss Americana and the Heartbreak Prince Instrumental', 'QuietCalmArt2/Miss Americana and the Heartbreak Prince Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(682, 'New Years Day Instrumental', 'QuietCalmArt2/New Years Day Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(683, 'Our Song Instrumental', 'QuietCalmArt2/Our Song Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(684, 'Out of the Woods Instrumental', 'QuietCalmArt2/Out of the Woods Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(685, 'Starlight Instrumental', 'QuietCalmArt2/Starlight Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(686, 'The Man Instrumental', 'QuietCalmArt2/The Man Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(687, 'The Moment I Knew Instrumental', 'QuietCalmArt2/The Moment I Knew Instrumental.mp3', 'unreleased', 0, 2, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(688, 'This Is Halloween', 'QuietCalmArt2/This Is Halloween.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(689, 'Wildest Dreams Instrumental', 'QuietCalmArt2/Wildest Dreams Instrumental.mp3', 'unreleased', 0, 3, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(690, 'You Belong With Me Instrumental', 'QuietCalmArt2/You Belong With Me Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 2', 'https://i.imgur.com/C95l6oE.jpeg'),
(691, 'Purgatory', 'TurnOfftheLight/Purgatory.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(692, 'There Will Be Blood', 'TurnOfftheLight/There Will Be Blood.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(693, 'Bloody Valentine', 'TurnOfftheLight/Bloody Valentine.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(694, 'Wrong Turn', 'TurnOfftheLight/Wrong Turn.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(695, 'Demons', 'TurnOfftheLight/Demons.mp3', 'unreleased', 0, 0, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(696, 'Massacre', 'TurnOfftheLight/Massacre.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(697, 'Knives', 'TurnOfftheLight/Knives.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(698, 'Death By Sex', 'TurnOfftheLight/Death By Sex.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(699, 'o m e n', 'TurnOfftheLight/o m e n.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(700, 'Close Your Eyes', 'TurnOfftheLight/Close Your Eyes.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(701, 'TRANSylvania', 'TurnOfftheLight/TRANSylvania.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(702, 'Turn Off The Light', 'TurnOfftheLight/Turn Off The Light.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(703, 'Tell Me It\'s A Nightmare', 'TurnOfftheLight/Tell Me It\'s A Nightmare.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(704, 'i don’t wanna die…', 'TurnOfftheLight/i don’t wanna die.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(705, 'In The Next Life', 'TurnOfftheLight/In The Next Life.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(706, 'Boo! Bitch!', 'TurnOfftheLight/Boo! Bitch!.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(707, 'Everybody Dies', 'TurnOfftheLight/Everybody Dies.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(708, 'Party Till I Die', 'TurnOfftheLight/Party Till I Die.mp3', 'unreleased', 0, 2, 'Kim Petras: Turn Off the Light', 'https://upload.wikimedia.org/wikipedia/en/0/01/Kim_Petras_-_Turn_Off_the_Light.png'),
(709, 'Small Things', 'QuietCalmArt3/Ben Howard - Small Things.mp3', 'unreleased', 0, 1, 'Ben Howard - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(710, 'How You Like That Acoustic', 'QuietCalmArt3/Blackpink - How You Like That Acoustic.mp3', 'unreleased', 1, 4, 'Blackpink - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(711, 'Lovesick Girls Acoustic', 'QuietCalmArt3/Blackpink - Lovesick Girls Acoustic.mp3', 'unreleased', 0, 7, 'Blackpink - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(712, 'Ice Cream Acoustic', 'QuietCalmArt3/Blackpink Selena Gomez - Ice Cream Acoustic.mp3', 'unreleased', 0, 2, 'Blackpink / Selena Gomez - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(713, 'Revelator Eyes', 'QuietCalmArt3/The Paper Kites - Revelator Eyes.mp3', 'unreleased', 0, 1, 'The Paper Kites - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(714, 'Only One', 'QuietCalmArt3/Yellowcard - Only One.mp3', 'unreleased', 0, 1, 'Yellowcard - Quiet Calm Art 3', 'https://i.imgur.com/C95l6oE.jpeg'),
(715, 'Santa Tell Me Piano', 'QuietCalmArt4/Ariana Grande - Santa Tell Me Piano.mp3', 'unreleased', 0, 1, 'Ariana Grande - Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(716, 'Steps', 'QuietCalmArt4/Handsome Ghost - Steps.mp3', 'unreleased', 0, 2, 'Handsome Ghost - Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(717, 'Christmas Tree Farm Piano Instrumental', 'QuietCalmArt4/Christmas Tree Farm Piano Instrumental.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(718, 'Here Comes Santa Claus Piano', 'QuietCalmArt4/Here Comes Santa Claus Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(719, 'I\'ll Be Home For Christmas Piano', 'QuietCalmArt4/I\'ll Be Home For Christmas Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(720, 'It\'s The Most Wonderful Time of the Year Piano', 'QuietCalmArt4/It\'s The Most Wonderful Time of the Year Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(721, 'Jingle Bells Piano', 'QuietCalmArt4/Jingle Bells Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(722, 'Last Christmas Piano.mp3', 'QuietCalmArt4/Last Christmas Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(723, 'Let It Snow Piano', 'QuietCalmArt4/Let It Snow Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(724, 'All I Want For Christmas Is You Piano', 'QuietCalmArt4/Mariah Carey - All I Want For Christmas Is You Piano.mp3', 'unreleased', 0, 1, 'Mariah Carey - Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(725, 'Meteor Shower', 'QuietCalmArt4/Meteor Shower.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(726, 'O Christmas Tree Piano', 'QuietCalmArt4/O Christmas Tree Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(727, 'Rockin Around The Christmas Tree Piano', 'QuietCalmArt4/Rockin Around The Christmas Tree Piano.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(728, 'Space Girl', 'QuietCalmArt4/Space Girl.mp3', 'unreleased', 0, 1, 'Quiet Calm Art 4', 'https://i.imgur.com/C95l6oE.jpeg'),
(729, 'willow', 'evermore/willow.m4a', 'released', 3, 28, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(730, 'champagne problems', 'evermore/champagne problems.m4a', 'released', 4, 13, 'evermore', 'https://i.imgur.com/YcHPqib.jpg');
INSERT INTO `music` (`id`, `name`, `path`, `type`, `playcount`, `oldplaycount`, `album`, `albumart`) VALUES
(731, 'gold rush', 'evermore/gold rush.m4a', 'released', 4, 13, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(732, '\'tis the damn season', 'evermore/\'tis the damn season.m4a', 'released', 3, 11, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(733, 'tolerate it', 'evermore/tolerate it.m4a', 'released', 4, 10, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(734, 'no body, no crime', 'evermore/no body, no crime.m4a', 'released', 1, 11, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(735, 'happiness', 'evermore/happiness.m4a', 'released', 2, 13, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(736, 'dorothea', 'evermore/dorothea.m4a', 'released', 6, 9, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(737, 'coney island', 'evermore/coney island.m4a', 'released', 3, 8, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(738, 'ivy', 'evermore/ivy.m4a', 'released', 6, 16, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(739, 'cowboy like me', 'evermore/cowboy like me.m4a', 'released', 1, 7, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(740, 'long story short', 'evermore/long story short.m4a', 'released', 2, 15, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(741, 'marjorie', 'evermore/marjorie.m4a', 'released', 2, 4, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(742, 'closure', 'evermore/closure.m4a', 'released', 3, 4, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(743, 'evermore', 'evermore/evermore.m4a', 'released', 0, 10, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(744, 'Christmas Tree Farm 30m', 'CTF 30min.mp3', 'unreleased', 0, 3, 'Christmas Tree Farm', 'https://i.imgur.com/Mf8wn2Q.jpg'),
(745, 'it\'s time to go', 'evermore/it\'s time to go.mp3', 'released', 3, 0, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(746, 'right where you left me', 'evermore/right where you left me.mp3', 'released', 6, 0, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(747, 'willow dancing witch', 'evermore/willow dancing witch version.mp3', 'released', 3, 0, 'evermore (Elvira remix)', 'https://i.imgur.com/YcHPqib.jpg'),
(748, 'willow lonely witch', 'evermore/willow lonely witch version.mp3', 'released', 3, 0, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(749, 'willow moonlit witch', 'evermore/willow moonlit witch version.mp3', 'released', 6, 0, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(750, 'willow songwriting demo', 'evermore/willow songwriting demo.mp3', 'unreleased', 0, 0, 'evermore', 'https://i.imgur.com/YcHPqib.jpg'),
(751, 'Christmas Tree Farm Jingle Ball Live', 'Christmas/Christmas Tree Farm Jingle Ball.mp3', 'released', 1, 0, 'Christmas Tree Farm', 'https://i.imgur.com/Mf8wn2Q.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queuedby` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recent`
--

CREATE TABLE `recent` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `queuedby` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
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
(1, 'uRW.2021.01.17 0.1.3a', '- Rewritten using discord.js audio by username13.\r\n- Now using modular framework.\r\n- Countdown is now database driven, and handles countdown ending now.\r\n- gif command uses DB now.\r\n- Built in help system for commands in this bot.\r\n- Better overall user permissions, and user feedback.\r\n- Bot should handle voice disconnects properly.\r\n- Bot allows edit\'s of commands for 10 seconds.\r\n- Accepts commands with an @mention instead of prefix.\r\n- Playcount has been archived, this bot starts with a 0 playcount for all songs. In a future update you\'ll be able to access this information.\r\n- request command added, for submitting feature requests, song requests, and gif requests.\r\n- Using !q to show the current or lack of queue should work without being in the voice chat.\r\n- All features are now moved over, and the old bot has been sunset.\r\n- Please let iAndrewC know of any issues/bugs.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
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
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recent`
--
ALTER TABLE `recent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requested`
--
ALTER TABLE `requested`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `countdown`
--
ALTER TABLE `countdown`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `gifs`
--
ALTER TABLE `gifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=752;
--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4808;
--
-- AUTO_INCREMENT for table `recent`
--
ALTER TABLE `recent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=429732;
--
-- AUTO_INCREMENT for table `requested`
--
ALTER TABLE `requested`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `version`
--
ALTER TABLE `version`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
