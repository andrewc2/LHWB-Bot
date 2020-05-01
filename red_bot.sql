-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 01, 2020 at 07:43 AM
-- Server version: 5.7.27-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.6

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
-- Table structure for table `counters`
--

CREATE TABLE `counters` (
  `word` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lastUsed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `counter` bigint(20) NOT NULL DEFAULT '0',
  `user` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `counters`
--

INSERT INTO `counters` (`word`, `lastUsed`, `counter`, `user`, `userID`) VALUES
('egg', '2019-04-23 01:05:43', 11, 'null', 0),
('oof', '2020-04-17 23:12:19', 363, 'Name', 000);

-- --------------------------------------------------------

--
-- Table structure for table `eggs`
--

CREATE TABLE `eggs` (
  `lastUsed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--

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
  `playcount` int(255) DEFAULT NULL,
  `album` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `albumart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `name`, `path`, `type`, `playcount`, `album`, `albumart`) VALUES
(3, 'Viva La Vida', 'Viva La Vida.mp3', 'released', 1635, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(4, 'Wildest Dreams Grammys', 'Wildest Dreams Grammys.mp3', 'released', 1646, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(5, 'Blank Space Grammys', 'Blank Space Grammys.mp3', 'released', 1618, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(6, 'I Wish You Would', 'I Wish You Would.mp3', 'released', 1654, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(7, '22', '22.mp3', 'released', 1786, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(8, 'This Love', 'This Love.mp3', 'released', 1666, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(9, 'New Romantics', 'New Romantics.mp3', 'released', 1738, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(10, 'Style', 'Style.mp3', 'released', 1744, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(11, 'Safe & Sound', 'Safe & Sound.mp3', 'released', 1663, 'The Hunger Games Soundtrack', 'https://i.imgur.com/KvcKd6Y.jpg'),
(12, 'Sweet Tea And God\'s Graces', 'Sweet Tea And God\'s Graces.mp3', 'unreleased', 8, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(13, 'A Perfectly Good Heart', 'A Perfectly Good Heart.mp3', 'released', 1697, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(14, 'A Place In This World', 'A Place In This World.mp3', 'released', 1667, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(15, 'All Too Well Grammys', 'All Too Well Grammys.mp3', 'released', 1665, 'Grammy Awards', 'http://i.imgur.com/as6dlgi.jpg'),
(16, 'All Too Well', 'All Too Well.mp3', 'released', 1696, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(17, 'All You Had To Do Was Stay', 'All You Had To Do Was Stay.mp3', 'released', 1699, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(18, 'Am I Ready For Love', 'Am I Ready For Love.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(19, 'American Girl', 'American Girl.mp3', 'released', 1699, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(20, 'Angelina', 'Angelina.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(21, 'Back To December Acoustic', 'Back To December Acoustic.mp3', 'released', 1651, 'Speak Now Acoustic', 'https://i.imgur.com/TNKbt8Y.jpg'),
(22, 'Back To December', 'Back To December.mp3', 'released', 1695, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(23, 'Beautiful Eyes', 'Beautiful Eyes.mp3', 'released', 1560, 'Beautiful Eyes EP', 'https://i.imgur.com/7q3N0F6.jpg'),
(24, 'Begin Again', 'Begin Again.mp3', 'released', 1690, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(25, 'Being With My Baby Acoustic', 'Being With My Baby Acoustic.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(26, 'Better Off', 'Better Off.mp3', 'unreleased', 10, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(27, 'Blank Space - Voice Memos', 'Blank Space - Voice Memos.mp3', 'unreleased', 1, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(28, 'Blank Space', 'Blank Space.mp3', 'released', 1692, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(29, 'Brand New World', 'Brand New World.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(30, 'Breathless', 'Breathless.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(31, 'Brought Up That Way', 'Brought Up That Way.mp3', 'unreleased', 8, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(32, 'By The Way', 'By The Way.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(33, 'Change', 'Change.mp3', 'released', 1672, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(34, 'Check Out This View', 'Check Out This View.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(35, 'Clean Live', 'Clean Live.mp3', 'released', 1668, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(36, 'Closest To A Cowboy', 'Closest To A Cowboy.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(37, 'Come In With The Rain', 'Come In With The Rain.mp3', 'released', 1601, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(38, 'Cross My Heart', 'Cross My Heart.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(39, 'Didn\'t They', 'Didn\'t They.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(40, 'Don\'t Hate Me For Loving You', 'Don\'t Hate Me For Loving You.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(41, 'Drops Of Jupiter Live', 'Drops Of Jupiter Live.mp3', 'released', 1651, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(42, 'Everything Has Changed', 'Everything Has Changed.mp3', 'released', 1673, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(43, 'Eyes Open', 'Eyes Open.mp3', 'released', 1694, 'The Hunger Games', 'https://i.imgur.com/FIQdRNK.jpg'),
(44, 'Fall Back On You', 'Fall Back On You.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(45, 'Fearless', 'Fearless.mp3', 'released', 1705, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(46, 'Firefly', 'Firefly.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(47, 'For You', 'For You.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(48, 'Forever & Always Piano', 'Forever & Always Piano.mp3', 'released', 1613, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(49, 'Half Of My Heart', 'Half Of My Heart.mp3', 'released', 1654, 'Battle Studies - Feature', 'https://i.imgur.com/Bs34TEr.jpg'),
(50, 'Haunted Live', 'Haunted Live.mp3', 'released', 1659, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(51, 'Here You Come Again', 'Here You Come Again.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(52, 'Highway Don\'t Care', 'Highway Don\'t Care.mp3', 'released', 1638, 'Two Lanes of Freedom - Feature', 'https://i.imgur.com/6Dxgc9J.jpg'),
(53, 'Holy Ground', 'Holy Ground.mp3', 'released', 1700, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(54, 'How You Get The Girl', 'How You Get The Girl.mp3', 'released', 1721, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(55, 'Hysteria ft. Def Leppard', 'Hysteria ft. Def Leppard.mp3', 'unreleased', 27, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(56, 'I Don\'t Wanna Live Forever', 'I Don\'t Wanna Live Forever.mp3', 'released', 1696, 'Fifty Shades Darker Soundtrack', 'https://i.imgur.com/Etkvhn0.jpg'),
(57, 'I Knew You Were Trouble.', 'I Knew You Were Trouble..mp3', 'released', 2008, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(58, 'I Knew You Were Trouble', 'I Knew You Were Trouble..mp3', 'released', 2008, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(59, 'IKYWT', 'I Knew You Were Trouble..mp3', 'released', 2008, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(60, 'I Know What I Want', 'I Know What I Want.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(61, 'I Want You Back Live', 'I Want You Back Live.mp3', 'released', 1723, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(62, 'I Want You Back', 'I Want You Back.mp3', 'released', 1675, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(63, 'I\'d Lie', 'I\'d Lie.mp3', 'unreleased', 41, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(64, 'In The Pouring Rain', 'In The Pouring Rain.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(65, 'Invisible', 'Invisible.mp3', 'released', 1689, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(66, 'Last Christmas', 'Last Christmas.mp3', 'unreleased', 4, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(67, 'Last Kiss Live', 'Last Kiss Live.mp3', 'released', 1701, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(68, 'Live For The Little Things', 'Live For The Little Things.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(69, 'Long Live Live', 'Long Live Live.mp3', 'released', 1661, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(70, 'Long Time Coming', 'Long Time Coming.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(71, 'Love Story 1989', 'Love Story 1989.mp3', 'released', 1694, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(72, 'Love Story Live', 'Love Story Live.mp3', 'released', 1683, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(73, 'Love They Haven\'t Thought Of Yet', 'Love They Haven\'t Thought Of Yet.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(74, 'Lucky You', 'Lucky You.mp3', 'unreleased', 13, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(75, 'Mandolin', 'Mandolin.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(76, 'Mary\'s Song Oh My My My', 'Mary\'s Song Oh My My My.mp3', 'released', 1811, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(77, 'Me And Britney', 'Me And Britney.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(78, 'Mean Live', 'Mean Live.mp3', 'released', 1663, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(79, 'Mine', 'Mine.mp3', 'released', 1724, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(80, 'My Cure', 'My Cure.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(81, 'My Turn To Be Me', 'My Turn To Be Me.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(82, 'Nashville', 'Nashville.mp3', 'released', 1753, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(83, 'Need You Now', 'Need You Now.mp3', 'unreleased', 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(84, 'Never Mind', 'Never Mind.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(85, 'Oh My My My Demo', 'Oh My My My Demo.mp3', 'released', 1534, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(86, 'One Thing Studio', 'One Thing Studio.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(87, 'One Thing', 'One Thing.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(88, 'Our Last Night', 'Our Last Night.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(89, 'Our Song ft. Def Leppard', 'Our Song ft. Def Leppard.mp3', 'unreleased', 34, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(90, 'Our Song Pop Mix', 'Our Song Pop Mix.mp3', 'released', 1683, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(91, 'Out Of The Woods Live', 'Out Of The Woods Live.mp3', 'released', 1650, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(92, 'Out Of The Woods', 'Out Of The Woods.mp3', 'released', 1735, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(93, 'Permanent Marker', 'Permanent Marker.mp3', 'unreleased', 15, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(94, 'Picture To Burn ft. Def Leppard', 'Picture To Burn ft. Def Leppard.mp3', 'unreleased', 23, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(95, 'Pour Some Sugar On Me ft. Def Leppard', 'Pour Some Sugar On Me ft. Def Leppard.mp3', 'unreleased', 29, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(96, 'Rain Song', 'Rain Song.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(97, 'Red', 'Red.mp3', 'released', 1781, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(98, 'Sad Beautiful Tragic', 'Sad Beautiful Tragic.mp3', 'released', 1733, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(99, 'Same Girl', 'Same Girl.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(100, 'Shake It Off Acoustic', 'Shake It Off Acoustic.mp3', 'released', 1664, '1989 Acoustic', 'https://i.imgur.com/i1QDoZR.jpg'),
(101, 'Shake It Off', 'Shake It Off.mp3', 'released', 1702, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(102, 'Should\'ve Said No US', 'Should\'ve Said No US.mp3', 'released', 1687, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(103, 'Sparks Fly Original Lyrics', 'Sparks Fly Original Lyrics.mp3', 'released', 1747, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(104, 'Sparks Fly Live', 'Sparks Fly Live.mp3', 'released', 1699, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(105, 'Starlight', 'Starlight.mp3', 'released', 1691, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(106, 'Stay Beautiful', 'Stay Beautiful.mp3', 'released', 1669, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(107, 'Stay Stay Stay', 'Stay Stay Stay.mp3', 'released', 1667, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(108, 'Stupid Boy', 'Stupid Boy.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(109, 'Style Live', 'Style Live.mp3', 'released', 1629, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(110, 'Teardrops On My Guitar ft. Def Leppard', 'Teardrops On My Guitar ft. Def Leppard.mp3', 'unreleased', 27, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(111, 'Teardrops On My Guitar Pop', 'Teardrops On My Guitar Pop.mp3', 'released', 1736, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(112, 'Tell Me Why', 'Tell Me Why.mp3', 'released', 1697, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(113, 'Tell Me', 'Tell Me.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(114, 'Ten Dollars And A Six Pack', 'Ten Dollars And A Six Pack.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(115, 'The Last Time', 'The Last Time.mp3', 'released', 1699, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(116, 'The Outside', 'The Outside.mp3', 'released', 1595, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(117, 'The Story Of Us Live', 'The Story Of Us Live.mp3', 'released', 1763, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(118, 'The Way I Loved You', 'The Way I Loved You.mp3', 'released', 1682, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(119, 'Tied Together With A Smile', 'Tied Together With A Smile.mp3', 'released', 1728, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(120, 'Today Was a Fairytale', 'Today Was a Fairytale.mp3', 'released', 1706, 'Valentine\'s Day', 'https://i.imgur.com/8pPGLAG.jpg'),
(121, 'Treacherous', 'Treacherous.mp3', 'released', 1691, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(122, 'Umbrella', 'Umbrella.mp3', 'released', 1676, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(123, 'We Are Never Ever Getting Back Together Live', 'We Are Never Ever Getting Back Together Live.mp3', 'released', 1830, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(124, 'WANEGBT Live', 'We Are Never Ever Getting Back Together Live.mp3', 'released', 1830, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(125, 'We Are Never Ever Getting Back Together Seine', 'We Are Never Ever Getting Back Together Seine.mp3', 'released', 1779, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(126, 'WANEGBT Seine', 'We Are Never Ever Getting Back Together Seine.mp3', 'released', 1779, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(127, 'We Are Never Ever Getting Back Together', 'We Are Never Ever Getting Back Together.mp3', 'released', 1922, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(128, 'WANEGBT', 'We Are Never Ever Getting Back Together.mp3', 'released', 1922, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(129, 'WANGBT', 'We Are Never Ever Getting Back Together.mp3', 'released', 1922, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(130, 'We Are Never Getting Back Together Live', 'We Are Never Getting Back Together Live.mp3', 'released', 1811, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(131, 'WANGBT Live', 'We Are Never Getting Back Together Live.mp3', 'released', 1811, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(132, 'What Do You Say', 'What Do You Say.mp3', 'unreleased', 6, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(133, 'When Daddy Let Me Drive', 'When Daddy Let Me Drive.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(134, 'When Love And Hate Collide ft. Def Leppard', 'When Love And Hate Collide ft. Def Leppard.mp3', 'unreleased', 24, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(135, 'White Blank Page', 'White Blank Page.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(136, 'Wonderland', 'Wonderland.mp3', 'released', 1684, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(137, 'You Belong With Me', 'You Belong With Me.mp3', 'released', 1703, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(138, 'Your Anything', 'Your Anything.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(139, 'Your Face Acoustic', 'Your Face Acoustic.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(140, 'Your Face', 'Your Face.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(141, 'Mean', 'Mean.mp3', 'released', 1743, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(142, 'Haunted', 'Haunted.mp3', 'released', 1711, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(143, 'Fearless Acoustic', 'Fearless Acoustic.mp3', 'released', 1747, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(144, 'Come Back... Be Here', 'Come Back... Be Here.mp3', 'released', 1802, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(145, 'Honey Baby', 'Honey Baby.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(146, 'I Know Places', 'I Know Places.mp3', 'released', 1699, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(147, 'Just South Of Knowing Why Drive All Night', 'Just South Of Knowing Why Drive All Night.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(148, 'I Heart Question Mark Demo', 'I Heart Question Mark Demo.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(149, 'Haunted Acoustic', 'Haunted Acoustic.mp3', 'released', 1648, 'Speak Now Acoustic', 'https://i.imgur.com/TNKbt8Y.jpg'),
(150, 'Jump Then Fall', 'Jump Then Fall.mp3', 'released', 1601, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(151, 'Clean', 'Clean.mp3', 'released', 1710, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(152, 'Dear John Live', 'Dear John Live.mp3', 'released', 1686, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(153, 'I Heart', 'I Heart.mp3', 'unreleased', 22, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(154, 'If This Was A Movie', 'If This Was A Movie.mp3', 'released', 1657, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(155, 'American Boy', 'American Boy.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(156, 'Fearless Demo', 'Fearless Demo.mp3', 'released', 1723, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(157, 'Matches', 'Matches.mp3', 'unreleased', 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(158, 'Love Story 2.0', 'Love Story 2.0.m4a', 'released', 1659, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(159, 'Bad Blood Remix', 'Bad Blood Remix.mp3', 'released', 1610, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(160, 'Bad Blood', 'Bad Blood.mp3', 'released', 1670, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(161, 'I Wished On A Plane', 'I Wished On A Plane.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(162, 'Love To Lose', 'Love To Lose.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(163, 'Innocent', 'Innocent.mp3', 'released', 1733, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(164, 'Dear John', 'Dear John.mp3', 'released', 1722, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(165, 'Enchanted Live', 'Enchanted Live.mp3', 'released', 1690, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(166, 'Breathe', 'Breathe.mp3', 'released', 1722, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(167, 'All Night Diner', 'All Night Diner.mp3', 'unreleased', 17, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(168, 'Love ft. Def Leppard', 'Love ft. Def Leppard.mp3', 'unreleased', 25, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(169, 'My Songs Know What You Did', 'My Songs Know What You Did.mp3', 'released', 1701, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(170, 'Christmas Must Be Something More', 'Christmas Must Be Something More.mp3', 'unreleased', 4, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(171, 'Better Than Revenge', 'Better Than Revenge.mp3', 'released', 1642, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(172, 'Both Of Us', 'Both Of Us.mp3', 'released', 1766, 'Strange Clouds - Feature', 'https://i.imgur.com/z5gPv3w.jpg'),
(173, 'Our Last Night Acoustic', 'Our Last Night Acoustic.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(174, 'Out Of The Woods Grammys', 'Out Of The Woods Grammys.mp3', 'released', 1651, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(175, 'Perfect Have I Loved Acoustic Demo', 'Perfect Have I Loved Acoustic Demo.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(176, 'Picture To Burn', 'Picture To Burn.mp3', 'released', 1616, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(177, 'Point Of View', 'Point Of View.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(178, 'R-E-V-E-N-G-E', 'R-E-V-E-N-G-E.mp3', 'unreleased', 17, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(179, 'Riptide', 'Riptide.mp3', 'released', 1724, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(180, 'Ronan', 'Ronan.mp3', 'unreleased', 32, 'Ronan', 'https://i.imgur.com/BPAffst.jpg'),
(181, 'Santa Baby', 'Santa Baby.mp3', 'unreleased', 4, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(182, 'Shake It Off Live', 'Shake It Off Live.mp3', 'released', 1685, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(183, 'Speak Now Live', 'Speak Now Live.mp3', 'released', 1639, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(184, 'Speak Now', 'Speak Now.mp3', 'released', 1722, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(185, 'State Of Grace', 'State Of Grace.mp3', 'released', 1661, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(186, 'Sugar', 'Sugar.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(187, 'Superman', 'Superman.mp3', 'released', 1698, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(188, 'Superstar', 'Superstar.mp3', 'released', 1637, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(189, 'Teardrops On My Guitar', 'Teardrops On My Guitar.mp3', 'released', 1614, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(190, 'That\'s Life', 'That\'s Life.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(191, 'Thats When', 'Thats When.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(192, 'The Best Day', 'The Best Day.mp3', 'released', 1626, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(193, 'The Diary Of Me', 'The Diary Of Me.mp3', 'unreleased', 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(194, 'The Moment I Knew', 'The Moment I Knew.mp3', 'released', 1583, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(195, 'The Story Of Us', 'The Story Of Us.mp3', 'released', 1884, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(196, 'Thirteen Blocks', 'Thirteen Blocks.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(197, 'This Is Really Happening', 'This Is Really Happening.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(198, 'This Love Live', 'This Love Live.mp3', 'released', 1636, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(199, 'Till Brad Pitt Comes Along', 'Till Brad Pitt Comes Along.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(200, 'Tim McGraw Acoustic', 'Tim McGraw Acoustic.mp3', 'released', 1696, 'Taylor Swift Acoustic', 'https://i.imgur.com/w0bksSN.jpg'),
(201, 'Tim Mcgraw', 'Tim Mcgraw.mp3', 'released', 1718, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(202, 'Untouchable', 'Untouchable.mp3', 'released', 1639, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(203, 'Wait For Me', 'Wait For Me.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(204, 'We Were Happy', 'We Were Happy.mp3', 'unreleased', 4, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(205, 'Welcome Distraction', 'Welcome Distraction.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(206, 'Welcome To New York', 'Welcome To New York.mp3', 'released', 1855, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(207, 'What To Wear', 'What To Wear.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(208, 'Who I\'ve Always Been', 'Who I\'ve Always Been.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(209, 'Wildest Dreams Acoustic', 'Wildest Dreams Acoustic.mp3', 'released', 1628, '1989 Acoustic', 'https://i.imgur.com/i1QDoZR.jpg'),
(210, 'Wildest Dreams Enchanted Live', 'Wildest Dreams Enchanted Live.mp3', 'released', 1992, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(211, 'Enchanted Wildest Dreams', 'Wildest Dreams Enchanted Live.mp3', 'released', 1992, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(212, 'Enchanted/Wildest Dreams Live', 'Wildest Dreams Enchanted Live.mp3', 'released', 1992, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(213, 'Wildest Dreams', 'Wildest Dreams.mp3', 'released', 1721, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(214, 'You Do', 'You Do.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(215, 'You Don\'t Have To Call Me', 'You Don\'t Have To Call Me.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(216, 'You\'re Not Sorry', 'You\'re Not Sorry.mp3', 'released', 1685, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(217, 'Gracie Acoustic', 'Gracie Acoustic.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(218, 'Can I Go With You', 'Can I Go With You.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(219, 'We Are Coming Undone', 'We Are Coming Undone.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(220, 'Look At You Like That', 'Look At You Like That.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(221, 'Thinking About You', 'Thinking About You.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(222, 'Love Story', 'Love Story.mp3', 'released', 1632, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(223, 'Red Demo', 'Red Demo.mp3', 'released', 1744, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(224, 'Bette Davis Eyes Live', 'Bette Davis Eyes Live.mp3', 'released', 1665, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(225, 'Ours', 'Ours.mp3', 'released', 1630, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(226, 'Back To December Apologize Live', 'Back To December Apologize Live.mp3', 'released', 1622, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(227, 'Hey Stephen', 'Hey Stephen.mp3', 'released', 1722, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(228, 'I Know Places Live', 'I Know Places Live.mp3', 'released', 1636, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(229, 'Last Kiss', 'Last Kiss.mp3', 'released', 1739, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(230, 'Love Story ft. Def Leppard', 'Love Story ft. Def Leppard.mp3', 'unreleased', 38, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(231, 'Just a Dream', 'Just a Dream.m4a', 'unreleased', 5, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(232, 'I Almost Do', 'I Almost Do.mp3', 'released', 1666, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(233, 'Baby Don\'t You Break My Heart Slow', 'Baby Don\'t You Break My Heart Slow.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(234, 'White Christmas', 'White Christmas.mp3', 'unreleased', 3, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(235, 'Spinning Around', 'Spinning Around.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(236, 'Sweeter Than Fiction', 'Sweeter Than Fiction.mp3', 'released', 1685, 'One Chance Soundtrack', 'https://i.imgur.com/zh7m1cn.jpg'),
(237, 'Christmases When You Were Mine', 'Christmases When You Were Mine.mp3', 'unreleased', 6, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(238, 'Smokey Black Nights', 'Smokey Black Nights.mp3', 'unreleased', 2, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(239, 'Thug Story', 'Thug Story.mp3', 'released', 1743, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(240, 'Enchanted Wildest Dreams Tokyo', 'Enchanted Wildest Dreams Tokyo.mp3', 'unreleased', 776, '1989 World Tour Tokyo', 'https://i.imgur.com/cVP4obR.jpg'),
(241, 'Welcome To New York Live', 'Welcome To New York Live.mp3', 'released', 1759, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(242, 'Cold As You', 'Cold As You.mp3', 'released', 1708, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(243, 'Two Is Better Than One', 'Two Is Better Than One.mp3', 'released', 1575, 'Boys Like Girls - Feature', 'http://i.imgur.com/x0K7vjd.jpg'),
(244, 'Should\'ve Said No', 'Should\'ve Said No.mp3', 'released', 1644, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(245, 'Enchanted', 'Enchanted.mp3', 'released', 1657, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(246, 'Forever & Always', 'Forever & Always.mp3', 'released', 1653, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(247, 'Crazier', 'Crazier.mp3', 'released', 1672, 'Crazier Soundtrack', 'https://i.imgur.com/FEdhdtz.jpg'),
(248, 'Bad Blood Live', 'Bad Blood Live.mp3', 'released', 1592, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(249, 'Treacherous Demo', 'Treacherous Demo.mp3', 'released', 1621, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(250, 'Never Grow Up', 'Never Grow Up.mp3', 'released', 1701, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(251, 'I\'m Every Woman', 'I\'m Every Woman.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(252, 'Silent Night', 'Silent Night.mp3', 'unreleased', 6, 'Sounds of the Season', 'https://i.imgur.com/Gov7vXz.jpg'),
(253, 'New Romantics Live', 'New Romantics Live.mp3', 'released', 1661, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(254, 'Mine Pop Mix', 'Mine Pop Mix.mp3', 'released', 1649, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(255, 'How You Get The Girl Live', 'How You Get The Girl Live.mp3', 'released', 1680, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(256, 'Our Song', 'Our Song.mp3', 'released', 1642, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(257, 'I\'m Only Me When I\'m With You', 'I\'m Only Me When I\'m With You.mp3', 'released', 1664, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(258, 'The Other Side Of The Door', 'The Other Side Of The Door.mp3', 'released', 1646, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(259, 'Fifteen', 'Fifteen.mp3', 'released', 1717, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(260, 'Girl At Home', 'Girl At Home.mp3', 'released', 1722, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(261, 'State Of Grace Acoustic', 'State Of Grace Acoustic.mp3', 'released', 1629, 'RED Acoustic', 'http://i.imgur.com/as6dlgi.jpg'),
(262, 'Under My Head', 'Under My Head.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(263, 'Two Steps Behind ft. Def Leppard', 'Two Steps Behind ft. Def Leppard.mp3', 'unreleased', 30, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(264, 'I Knew You Were Trouble Live', 'I Knew You Were Trouble Live.mp3', 'released', 1973, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(265, 'IKYWT Live', 'I Knew You Were Trouble Live.mp3', 'released', 1973, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(266, 'IKYWT. Live', 'I Knew You Were Trouble Live.mp3', 'released', 1973, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(267, 'Photograph ft. Def Leppard', 'Photograph ft. Def Leppard.mp3', 'unreleased', 32, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(268, 'Run ft. Def Leppard', 'Run ft. Def Leppard.mp3', 'unreleased', 39, 'Def Leppard', 'https://i.imgur.com/Xmmt4tY.jpg'),
(269, 'Sparks Fly', 'Sparks Fly.mp3', 'released', 1658, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(270, 'Better Than Revenge Live', 'Better Than Revenge Live.mp3', 'released', 1646, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(271, 'Dark Blue Tennessee', 'Dark Blue Tennessee.mp3', 'unreleased', 23, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(272, 'I Used To Fly', 'I Used To Fly.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(273, 'The Lucky One', 'The Lucky One.mp3', 'released', 1626, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(274, 'White Horse', 'White Horse.mp3', 'released', 1743, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(275, 'Never Mind Country', 'Never Mind Country.mp3', 'unreleased', 0, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(276, 'All You Had To Do Was Stay Live', 'All You Had To Do Was Stay Live.mp3', 'released', 1559, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(277, 'I Wish You Would Live', 'I Wish You Would Live.mp3', 'released', 1606, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(278, 'Ours Live', 'Ours Live.mp3', 'released', 1698, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(279, 'Blank Space Live', 'Blank Space Live.mp3', 'released', 1674, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(280, 'Long Live', 'Long Live.mp3', 'released', 1696, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(281, 'Wildest Dreams R3hab', 'Wildest Dreams R3hab.mp3', 'released', 1670, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(282, 'Writing Songs About You', 'Writing Songs About You.mp3', 'unreleased', 3, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(283, 'You Are In Love Live', 'You Are In Love Live.mp3', 'released', 1668, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(284, 'You Are In Love', 'You Are In Love.mp3', 'released', 1703, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(286, 'IKYWT.', 'I Knew You Were Trouble..mp3', 'released', 2008, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(287, 'TSOU', 'The Story Of Us.mp3', 'released', 1884, 'Speak Now', 'https://i.imgur.com/TNKbt8Y.jpg'),
(288, 'TSOU Live', 'The Story Of Us Live.mp3', 'released', 1763, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(289, 'WTNY', 'Welcome To New York.mp3', 'released', 1855, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(290, 'WTNY Live', 'Welcome To New York Live.mp3', 'released', 1759, '1989 World Tour', 'https://i.imgur.com/cVP4obR.jpg'),
(291, 'Come Back Be Here', 'Come Back... Be Here.mp3', 'released', 1802, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(292, 'Treacherous Acoustic Live', 'Treacherous Acoustic Live.m4a', 'released', 1670, 'RED Acoustic', 'http://i.imgur.com/as6dlgi.jpg'),
(293, 'You All Over Me', 'You All Over Me.mp3', 'unreleased', 13, 'Unreleased', 'https://i.imgur.com/EJDtG33.png'),
(294, 'Revenge', 'R-E-V-E-N-G-E.mp3', 'unreleased', 17, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(295, 'Out Of The Woods Grammy Awards', 'Out of the Woods Grammy Awards.mp3', 'released', 1704, 'Grammy Awards', 'https://i.imgur.com/i1QDoZR.jpg'),
(296, 'Fearless I\'m Yours Hey Soul Sister Live', 'Fearless I\'m Yours Hey Soul Sister Live.mp3', 'released', 1683, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(297, 'Fearless I\'m Yours Live', 'Fearless I\'m Yours Hey Soul Sister Live.mp3', 'released', 1683, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(298, 'Down Came The Rain', 'Down Came The Rain.mp3', 'unreleased', 1, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(299, 'Fifteen Live', 'Fifteen Live.mp3', 'released', 1592, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(300, 'Love Story SN Live', 'Love Story SN Live.mp3', 'released', 1649, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(301, 'Mine Live', 'Mine Live.m4a', 'released', 1690, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(302, 'Our Song Live', 'Our Song Live.mp3', 'released', 1653, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(303, 'Sweet Escape Live', 'Sweet Escape Live.mp3', 'released', 1658, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(304, 'You Belong With Me Live', 'You Belong With Me Live.mp3', 'released', 1601, 'Speak Now World Tour', 'https://i.imgur.com/bywo8nm.jpg'),
(305, 'New Romantics SS Live', 'New Romantics SS Live.mp3', 'released', 1607, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(306, 'IKYWT SS Live', 'I Knew You Were Trouble SS Live.mp3', 'released', 1756, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(307, 'Blank Space SS Live', 'Blank Space SS Live.mp3', 'released', 1664, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(308, 'I Knew You Were Trouble SS Live', 'I Knew You Were Trouble SS Live.mp3', 'released', 1756, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(309, 'I Don\'t Wanna Live Forever SS Live', 'I Don\'t Wanna Live Forever SS Live.mp3', 'released', 1733, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(310, 'IDWLF SS Live', 'I Don\'t Wanna Live Forever SS Live.mp3', 'released', 1733, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(311, 'You Belong With Me SS Live', 'You Belong With Me SS Live.mp3', 'Released', 1747, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(312, 'YBWM SS Live', 'You Belong With Me SS Live.mp3', 'Released', 1747, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(313, 'RED SS Live', 'RED SS Live.mp3', 'Released', 1591, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(314, 'All Too Well SS Live', 'All Too Well SS Live.mp3', 'Released', 1632, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(315, 'Shake It Off SS Live', 'Shake It Off SS Live.mp3', 'Released', 1682, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(316, 'SIO SS Live', 'Shake It Off SS Live.mp3', 'Released', 1682, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(317, 'OOTW SS Live', 'Out Of The Woods SS Live.mp3', 'Released', 1634, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(318, 'Out Of The Woods SS Live', 'Out Of The Woods SS Live.mp3', 'Released', 1634, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(319, 'Bad Blood SS Live', 'Bad Blood SS Live.mp3', 'Released', 1528, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(320, 'Look What You Made Me Do', 'Look What You Made Me Do.m4a', 'released', 1500, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(322, 'Ready For It', 'Ready For It.m4a', 'released', 1391, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(323, 'How You Get The Girl Grammys', 'How You Get The Girl Grammys.m4a', 'released', 1347, 'Grammy Museum', 'https://i.imgur.com/i1QDoZR.jpg'),
(324, 'LWYMMD', 'Look What You Made Me Do.m4a', 'released', 1500, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(325, 'Gorgeous', 'Gorgeous.m4a', 'released', 1330, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(326, 'Marys Song', 'Mary\'s Song Oh My My My.mp3', 'released', 1811, 'Taylor Swift', 'https://i.imgur.com/w0bksSN.jpg'),
(327, 'Call It What You Want', 'Call It What You Want.m4a', 'released', 1397, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(328, 'CIWYW', 'Call It What You Want.m4a', 'released', 1397, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(330, 'End Game', 'End Game.mp3', 'released', 1246, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(331, 'I Did Something Bad', 'I Did Something Bad.mp3', 'released', 1238, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(332, 'Dont Blame Me', 'Dont Blame Me.mp3', 'released', 1313, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(333, 'Delicate', 'Delicate.mp3', 'released', 1340, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(334, 'So It Goes', 'So It Goes.mp3', 'released', 1242, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(335, 'Getaway Car', 'Getaway Car.mp3', 'released', 1347, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(336, 'King Of My Heart', 'King Of My Heart.mp3', 'released', 1251, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(337, 'Dancing With Our Hands Tied', 'Dancing With Our Hands Tied.mp3', 'released', 1208, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(338, 'Dress', 'Dress.mp3', 'released', 1235, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(339, 'This Is Why We Cant Have Nice Things', 'This Is Why We Cant Have Nice Things.mp3', 'released', 1224, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(340, 'New Years Day', 'New Years Day.mp3', 'released', 1237, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(341, 'New Years Day Piano', 'New Years Day Piano.mp3', 'released', 1292, 'reputation', 'https://i.imgur.com/o2v3b7E.jpg'),
(343, 'Better Man SS Live', 'Better Man SS Live.mp3', 'released', 1180, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(344, 'This Is What You Came For SS Live', 'This Is What You Came For SS Live.mp3', 'released', 1256, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(345, 'TIWYCF SS Live', 'This Is What You Came For SS Live.mp3', 'released', 1256, 'Super Saturday Night', 'http://i.imgur.com/ZyxiSQe.jpg'),
(346, 'Run George Strait', 'Run George Strait.m4a', 'released', 931, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(348, '22 Seine', '22 Seine.mp3', 'released', 958, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(349, 'I Knew You Were Trouble Seine', 'I Knew You Were Trouble Seine.mp3', 'released', 1018, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(350, 'Love Story Seine', 'Love Story Seine.mp3', 'released', 1006, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(351, 'Red Seine', 'Red Seine.mp3', 'released', 964, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(352, 'You Belong With Me Seine', 'You Belong With Me Seine.mp3', 'released', 971, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(353, 'IKYWT Seine', 'I Knew You Were Trouble Seine.mp3', 'released', 1018, 'Live on the Seine', 'http://i.imgur.com/fv5H8w8.jpg'),
(354, 'Delicate Remix', 'Delicate Remix.m4a', 'released', 933, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(355, 'Ready for It BloodPop', 'Ready for It BloodPop.mp3', 'released', 943, 'reputation', 'https://i.imgur.com/xjWOsyQ.jpg'),
(356, 'Delicate Acoustic Spotify', 'Delicate Acoustic Spotify.mp3', 'released', 925, 'reputation', 'https://i.imgur.com/xjWOsyQ.jpg'),
(357, 'September Acoustic Spotify', 'September Acoustic Spotify.mp3', 'released', 951, 'Covers', 'https://i.imgur.com/Yv6xiKL.jpg'),
(358, 'New Years Day Piano SXM', 'New Years Day Piano SXM.mp3', 'released', 936, 'reputation Celebration', 'https://i.imgur.com/o2v3b7E.jpg'),
(359, 'Call It What You Want Acoustic SXM', 'Call It What You Want Acoustic SXM.mp3', 'released', 995, 'reputation Celebration', 'https://i.imgur.com/o2v3b7E.jpg'),
(360, 'American Girl Piano SXM', 'American Girl Piano SXM.mp3', 'released', 930, 'reputation Celebration', 'https://i.imgur.com/Yv6xiKL.jpg'),
(361, 'We Are Never Ever Getting Back Together Country Mix', 'We Are Never Ever Getting Back Together Country Mix.mp3', 'released', 1002, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(362, 'WANEGBT Country Mix', 'We Are Never Ever Getting Back Together Country Mix.mp3', 'released', 1002, 'RED', 'http://i.imgur.com/as6dlgi.jpg'),
(363, 'Delicate Seeb Remix', 'Delicate Seeb Remix.mp3', 'released', 983, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(364, 'Delicate Seeb', 'Delicate Seeb Remix.mp3', 'released', 983, 'reputation', 'https://i.imgur.com/erPJidF.jpg'),
(365, 'Let\'s Go', 'Let\'s Go.mp3', 'unreleased', 41, 'Unreleased', 'https://i.imgur.com/EJDtG33.jpg'),
(366, 'Ready For It rep Live', 'Ready For It rep Live.m4a', 'released', 629, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(367, 'RFI rep Live', 'Ready For It rep Live.m4a', 'released', 629, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(368, 'All Too Well rep Live', 'All Too Well rep Live.m4a', 'released', 605, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(369, 'ATW rep Live', 'All Too Well rep Live.m4a', 'released', 605, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(370, 'Bad Blood Should\'ve Said No rep Live', 'Bad Blood Should\'ve Said No rep Live.m4a', 'released', 555, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(371, 'Blank Space rep Live', 'Blank Space rep Live.m4a', 'released', 498, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(372, 'Call It What You Want rep Live', 'Call It What You Want rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(373, 'CIWYW rep Live', 'Call It What You Want rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(374, 'Dancing With Our Hands Tied rep Live', 'Dancing With Our Hands Tied rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(375, 'DWOHT rep Live', 'Dancing With Our Hands Tied rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(376, 'Delicate rep Live', 'Delicate rep Live.m4a', 'released', 482, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(377, 'Don\'t Blame Me rep Live', 'Don\'t Blame Me rep Live.m4a', 'released', 490, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(378, 'Dress rep Live', 'Dress rep Live.m4a', 'released', 508, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(379, 'End Game rep Live', 'End Game rep Live.m4a', 'released', 498, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(380, 'Getaway Car rep Live', 'Getaway Car rep Live.m4a', 'released', 530, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(381, 'Gorgeous rep Live', 'Gorgeous rep Live.m4a', 'released', 531, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(382, 'I Did Something Bad rep Live', 'I Did Something Bad rep Live.m4a', 'released', 651, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(383, 'IDSB rep Live', 'I Did Something Bad rep Live.m4a', 'released', 651, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(384, 'King of My Heart rep Live', 'King of My Heart rep Live.m4a', 'released', 596, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(385, 'KOMH rep Live', 'King of My Heart rep Live.m4a', 'released', 596, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(386, 'Long Live New Year\'s Day rep Live', 'Long Live New Year\'s Day rep Live.m4a', 'released', 616, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(387, 'Long Live NYD rep Live', 'Long Live New Year\'s Day rep Live.m4a', 'released', 616, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(388, 'Look What You Made Me Do Intro rep Live', 'Look What You Made Me Do Intro rep Live.m4a', 'released', 579, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(389, 'LWYMMD Intro rep Live', 'Look What You Made Me Do Intro rep Live.m4a', 'released', 579, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(390, 'Look What You Made Me Do rep Live', 'Look What You Made Me Do rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(391, 'LWYMMD rep Live', 'Look What You Made Me Do rep Live.m4a', 'released', 672, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(392, 'reputation Intro rep Live', 'reputation Intro rep Live.m4a', 'released', 505, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(393, 'Shake It Off rep Live', 'Shake It Off rep Live.m4a', 'released', 522, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(394, 'So It Goes rep Live', 'So It Goes rep Live.m4a', 'released', 523, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(395, 'Style Love Story You Belong With Me rep Live', 'Style Love Story You Belong With Me rep Live.m4a', 'released', 494, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(396, 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live', 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live.m4a', 'released', 665, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(397, 'WANEGBT TIWWCHNT rep Live', 'We Are Never Ever Getting Back Together This Is Why We Can\'t Have Nice Things rep Live.m4a', 'released', 665, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(398, 'Why She Disappeared rep Live', 'Why She Disappeared rep Live.m4a', 'released', 538, 'reputation Stadium Tour', 'https://i.imgur.com/D3RHbx6.jpg'),
(399, 'Holy Ground F1 Live', 'Holy Ground F1 Live.mp3', 'released', 493, 'COTA Formula 1 Austin', 'https://i.imgur.com/9rBYl44.jpg'),
(400, 'ME!', 'ME!.m4a', 'released', 521, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(401, 'You Need To Calm Down', 'You Need To Calm Down.m4a', 'released', 424, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(402, 'The Archer', 'The Archer.m4a', 'released', 367, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(403, 'Lover', 'Lover.m4a', 'released', 305, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(404, 'I Forgot That You Existed', 'I Forgot That You Existed.m4a', 'released', 288, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(405, 'Cruel Summer', 'Cruel Summer.m4a', 'released', 321, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(406, 'The Man', 'The Man.m4a', 'released', 267, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(407, 'I Think He Knows', 'I Think He Knows.m4a', 'released', 299, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(408, 'Miss Americana & The Heartbreak Prince', 'Miss Americana & The Heartbreak Prince.m4a', 'released', 270, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(409, 'Paper Rings', 'Paper Rings.m4a', 'released', 300, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(410, 'Cornelia Street', 'Cornelia Street.m4a', 'released', 306, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(411, 'Death By A Thousand Cuts', 'Death By A Thousand Cuts.m4a', 'released', 286, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(412, 'London Boy', 'London Boy.m4a', 'released', 304, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(413, 'Soon You\'ll Get Better', 'Soon You\'ll Get Better.m4a', 'released', 280, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(414, 'False God', 'False God.m4a', 'released', 287, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(415, 'Afterglow', 'Afterglow.m4a', 'released', 321, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(416, 'It\'s Nice To Have A Friend', 'It\'s Nice To Have A Friend.m4a', 'released', 322, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg');
INSERT INTO `music` (`id`, `name`, `path`, `type`, `playcount`, `album`, `albumart`) VALUES
(417, 'Daylight', 'Daylight.m4a', 'released', 276, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(418, 'The Archer SXM Live', 'The Archer Acoustic SXM Live.mp3', 'released', 308, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(419, 'You Need To Calm Down SXM Live', 'You Need To Calm Down Acoustic SXM Live.mp3', 'released', 263, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(420, 'Daylight SXM Live', 'Daylight Piano SXM Live.mp3', 'released', 286, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(421, 'Beautiful Ghosts', 'Beautiful Ghosts.m4a', 'released', 164, 'Cats Soundtrack', 'https://m.media-amazon.com/images/I/611hhvdmJEL._SS500_.jpg'),
(422, 'Babe', 'Babe.mp3', 'released', 189, 'Bigger - Feature', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Sugarland_Babe.png'),
(423, 'Christmas Tree Farm', 'Christmas Tree Farm.mp3', 'released', 183, 'Christmas Tree Farm', 'https://i.imgur.com/Mf8wn2Q.jpg'),
(439, 'Only The Young', 'Only The Young.m4a', 'released', 90, 'Only The Young', 'https://upload.wikimedia.org/wikipedia/en/6/69/Taylor_Swift_-_Only_the_Young.png'),
(440, 'False God SNL Live', 'False God SNL Live.mp3', 'released', 80, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(441, 'Lover SNL Live', 'Lover SNL Live.mp3', 'released', 95, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(442, 'The Man AMA Live', 'The Man AMA Live.mp3', 'released', 107, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(443, 'Lover AMA Live', 'Lover AMA Live.mp3', 'released', 91, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(444, 'Love Story AMA Live', 'Love Story AMA Live.mp3', 'released', 99, 'Fearless', 'https://i.imgur.com/TPL7mge.jpg'),
(445, 'I Knew You Were Trouble AMA Live', 'I Knew You Were Trouble AMA Live.mp3', 'released', 92, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(446, 'Blank Space Shake It Off AMA Live', 'Blank Space Shake It Off AMA Live.mp3', 'released', 101, '1989', 'https://i.imgur.com/i1QDoZR.jpg'),
(447, 'Can\'t Stop Loving You BBC Live', 'Can\'t Stop Loving You BBC Live.mp3', 'released', 85, 'Cover', 'https://i.imgur.com/Yv6xiKL.jpg'),
(448, 'London Boy BBC Live', 'London Boy BBC Live.mp3', 'released', 84, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(449, 'Lover BBC Live', 'Lover BBC Live.mp3', 'released', 110, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(450, 'The Archer BBC Live', 'The Archer BBC Live.mp3', 'released', 87, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(451, 'You Need To Calm Down BBC Live', 'You Need To Calm Down BBC Live.mp3', 'released', 99, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(452, 'Holy Ground BBC Live', 'Holy Ground BBC Live.mp3', 'released', 88, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(453, 'The Man NPR Live', 'The Man NPR Live.mp3', 'released', 93, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(454, 'Lover NPR Live', 'Lover NPR Live.mp3', 'released', 94, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(455, 'Death by a Thousand Cuts NPR Live', 'Death by a Thousand Cuts NPR Live.mp3', 'released', 117, 'Lover', 'https://i.imgur.com/cNnUR0M.jpg'),
(456, 'All Too Well NPR Live', 'All Too Well NPR Live.mp3', 'released', 82, 'Red', 'http://i.imgur.com/as6dlgi.jpg'),
(457, 'Green Light', '/melo/Green Light.mp3', 'unreleased', 6, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(458, 'Sober', '/melo/Sober.mp3', 'unreleased', 4, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(459, 'Homemade Dynamite', '/melo/Homemade Dynamite.mp3', 'unreleased', 3, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(460, 'The Louvre', '/melo/The Louvre.mp3', 'unreleased', 5, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(461, 'Liability', '/melo/Liability.mp3', 'unreleased', 6, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(462, 'Hard Feelings-Loveless', '/melo/Hard Feelings-Loveless.mp3', 'unreleased', 7, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(463, 'Sober II', '/melo/Sober II (Melodrama).mp3', 'unreleased', 4, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(464, 'Writer In the Dark', '/melo/Writer In the Dark.mp3', 'unreleased', 3, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(465, 'Supercut', '/melo/Supercut.mp3', 'unreleased', 3, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(466, 'Liability (Reprise)', '/melo/Liability (Reprise).mp3', 'unreleased', 4, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(467, 'Perfect Places', '/melo/Perfect Places.mp3', 'unreleased', 3, 'Melodrama', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png'),
(469, 'Afterglow Karaoke', 'LoverKaraoke/Afterglow Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(470, 'Cornelia Street Karaoke', 'LoverKaraoke/Cornelia Street Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(471, 'Cruel Summer Karaoke', 'LoverKaraoke/Cruel Summer Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(472, 'Daylight Karaoke', 'LoverKaraoke/Daylight Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(473, 'Death By A Thousand Cuts Karaoke', 'LoverKaraoke/Death By A Thousand Cuts Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(474, 'False God Karaoke', 'LoverKaraoke/False God Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(475, 'I Forgot That You Existed Karaoke', 'LoverKaraoke/I Forgot That You Existed Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(476, 'I Think He Knows Karaoke', 'LoverKaraoke/I Think He Knows Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(477, 'It’s Nice To Have A Friend Karaoke', 'LoverKaraoke/It’s Nice To Have A Friend Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(478, 'London Boy Karaoke', 'LoverKaraoke/London Boy Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(479, 'Lover Remix Karaoke', 'LoverKaraoke/Lover (Remix) Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(480, 'Lover Karaoke', 'LoverKaraoke/Lover Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(481, 'ME! Karaoke', 'LoverKaraoke/ME! Karaoke.mp3', 'unreleased', 2, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(482, 'Miss Americana & The Heartbreak Prince Karaoke', 'LoverKaraoke/Miss Americana & The Heartbreak Prince Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(483, 'Paper Rings Karaoke', 'LoverKaraoke/Paper Rings Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(484, 'Soon You’ll Get Better Karaoke', 'LoverKaraoke/Soon You’ll Get Better Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(485, 'The Archer Karaoke', 'LoverKaraoke/The Archer Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(486, 'The Man Karaoke', 'LoverKaraoke/The Man Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(487, 'You Need To Calm Down Karaoke', 'LoverKaraoke/You Need To Calm Down Karaoke.mp3', 'unreleased', 0, 'Lover Karaoke (filtered)', 'https://i.imgur.com/cNnUR0M.jpg'),
(488, 'Moonlight', '/DangerousWoman/Moonlight.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(489, 'Dangerous Woman', '/DangerousWoman/Dangerous Woman.mp3', 'unreleased', 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(490, 'Be Alright', '/DangerousWoman/Be Alright.mp3', 'unreleased', 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(491, 'Into You', '/DangerousWoman/Into You.mp3', 'unreleased', 3, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(492, 'Side To Side', '/DangerousWoman/Side To Side.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(493, 'Let Me Love You', '/DangerousWoman/Let Me Love You.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(494, 'Greedy', '/DangerousWoman/Greedy.mp3', 'unreleased', 2, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(495, 'Leave Me Lonely', '/DangerousWoman/Leave Me Lonely.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(496, 'Everyday', '/DangerousWoman/Everyday.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(497, 'Sometimes', '/DangerousWoman/Sometimes.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(498, 'I Don\'t Care', '/DangerousWoman/I Don\'t Care.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(499, 'Bad Decisions', '/DangerousWoman/Bad Decisions.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(500, 'Touch It', '/DangerousWoman/Touch It.mp3', 'unreleased', 3, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(501, 'Knew Better Forever Boy', '/DangerousWoman/Knew Better Forever Boy.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(502, 'Thinking Bout You', '/DangerousWoman/Thinking Bout You.mp3', 'unreleased', 1, 'Dangerous Woman', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png'),
(503, 'American Kids', '/LydiaThrowbacks/American Kids.mp3', 'unreleased', 1, 'Throwbacks - Kenny Chesney: The Big Revival', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(504, 'To Zion', '/LydiaThrowbacks/To Zion.mp3', 'unreleased', 1, 'Throwbacks - Ms. Lauryn Hill, Carlos Santana: The Miseducation of Lauryn Hill', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(505, 'In Da Club', '/LydiaThrowbacks/In Da Club.mp3', 'unreleased', 1, 'Throwbacks - 50 Cent: Get Rich Or Die Tryin', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(506, 'Lips of an Angel', '/LydiaThrowbacks/Lips of an Angel.mp3', 'unreleased', 2, 'Throwbacks - Hinder: Extreme Behavior', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(507, 'Airplanes', '/LydiaThrowbacks/Airplanes.mp3', 'unreleased', 3, 'Throwbacks - B.o.B, Hayley Williams: B.o.B Presents: The Adventures of Bobby Ray', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(508, 'When Can I See You Again', '/LydiaThrowbacks/When Can I See You Again.mp3', 'unreleased', 1, 'Throwbacks - Owl City: Wreck-It Ralph Soundtrack', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(509, 'Valerie', '/LydiaThrowbacks/Valerie.mp3', 'unreleased', 1, 'Throwbacks - Amy Winehouse: Lioness: Hidden Treasures', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(510, 'Smooth', '/LydiaThrowbacks/Smooth.mp3', 'unreleased', 1, 'Throwbacks - Santana, Rob Thomas: Supernatural', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(511, 'Unwritten', '/LydiaThrowbacks/Unwritten.mp3', 'unreleased', 4, 'Throwbacks - Natasha Bedingfield: Unwritten', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(512, 'Torn', '/LydiaThrowbacks/Torn.mp3', 'unreleased', 2, 'Throwbacks - Natalie Imbruglia: Left of the Middle', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(513, 'Paradise', '/LydiaThrowbacks/Paradise.mp3', 'unreleased', 1, 'Throwbacks - Coldplay: Mylo Xyloto', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(514, 'Angels On The Moon', '/LydiaThrowbacks/Angels On The Moon.mp3', 'unreleased', 1, 'Throwbacks - Thriving Ivory: Thriving Ivory', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(515, 'Get Back', '/LydiaThrowbacks/Get Back.mp3', 'unreleased', 1, 'Throwbacks - Demi Lovato: Don\'t Forget', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(516, 'Take Me Home Country Roads', '/LydiaThrowbacks/Take Me Home Country Roads.mp3', 'unreleased', 1, 'Throwbacks - John Denver: The John Denver Collection', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(517, 'Walking On A Dream', '/LydiaThrowbacks/Walking On A Dream.mp3', 'unreleased', 1, 'Throwbacks - Empire of the Sun: Walking On A Dream', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(518, 'Oh No!', '/LydiaThrowbacks/Oh No!.mp3', 'unreleased', 1, 'Throwbacks - MARINA: The Family Jewels', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(519, 'La La La', '/LydiaThrowbacks/La La La.mp3', 'unreleased', 1, 'Throwbacks - LMFAO: Party Rock', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png'),
(520, 'Chandelier', '/LydiaThrowbacks/Chandelier.mp3', 'unreleased', 1, 'Throwbacks - Sia: 1000 Forms of Fear', 'https://images.8tracks.com/cover/i/000/419/714/mix-cover-5330.png');

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
  `user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `counters`
--
ALTER TABLE `counters`
  ADD UNIQUE KEY `word` (`word`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=521;
--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1289;
--
-- AUTO_INCREMENT for table `recent`
--
ALTER TABLE `recent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=375135;
--
-- AUTO_INCREMENT for table `requested`
--
ALTER TABLE `requested`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
