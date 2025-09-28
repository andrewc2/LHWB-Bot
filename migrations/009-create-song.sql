CREATE TABLE `song` (
    `id` int NOT NULL AUTO_INCREMENT,
    `officialName` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
    `artistName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
    `path` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
    `autoPlay` tinyint(1) NOT NULL DEFAULT '1',
    `canQueue` tinyint(1) NOT NULL DEFAULT '1',
    `playCount` int NOT NULL DEFAULT '0',
    `albumName` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
    `isAlbum` tinyint(1) NOT NULL DEFAULT '0',
    `trackNumber` int NOT NULL DEFAULT '1',
    `albumArtworkUrl` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;